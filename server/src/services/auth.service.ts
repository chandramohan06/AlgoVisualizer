import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../models/User.model';
import { Leaderboard } from '../models/Leaderboard.model';
import { AppError } from '../utils/AppError';
import * as TokenService from './token.service';
import * as EmailService from './email.service';
import { ILoginDto, IRegisterDto } from '@algovisualizer/shared';

export const register = async (dto: IRegisterDto) => {
  const existing = await User.findOne({ email: dto.email });
  if (existing) throw new AppError('Email already registered', 409);

  const passwordHash = await bcrypt.hash(dto.password, 12);
  const emailVerifyToken = crypto.randomBytes(32).toString('hex');

  const user = await User.create({
    name: dto.name,
    email: dto.email,
    passwordHash,
    emailVerifyToken,
  });

  // Create leaderboard entry
  await Leaderboard.create({ userId: user._id });

  await EmailService.sendVerificationEmail(user.email, user.name, emailVerifyToken);

  return { userId: user._id, email: user.email, emailVerifyToken };
};

export const login = async (dto: ILoginDto) => {
  const user = await User.findOne({ email: dto.email }).select('+passwordHash +refreshToken');
  
  if (!user) throw new AppError('Invalid email or password', 401);
  if (user.isBanned) throw new AppError('Your account has been banned', 403);
  if (!user.isEmailVerified) throw new AppError('Please verify your email first', 403);

  const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
  
  if (!isMatch) throw new AppError('Invalid email or password', 401);

  const accessToken = TokenService.generateAccessToken({
    _id: String(user._id),
    role: user.role,
    email: user.email,
  });
  const refreshToken = TokenService.generateRefreshToken(String(user._id));

  user.refreshToken = await bcrypt.hash(refreshToken, 8);
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isEmailVerified: user.isEmailVerified,
    },
  };
};

export const logout = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { refreshToken: undefined });
};

export const refreshAccessToken = async (token: string) => {
  const payload = TokenService.verifyRefreshToken(token) as { _id: string };
  const user = await User.findById(payload._id).select('+refreshToken');
  if (!user || !user.refreshToken) throw new AppError('Invalid refresh token', 401);

  const isValid = await bcrypt.compare(token, user.refreshToken);
  if (!isValid) throw new AppError('Invalid refresh token', 401);

  const accessToken = TokenService.generateAccessToken({
    _id: String(user._id),
    role: user.role,
    email: user.email,
  });

  return { accessToken };
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) return; // silent — don't reveal existence

  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save();

  await EmailService.sendPasswordResetEmail(user.email, user.name, token);
};

export const resetPassword = async (token: string, newPassword: string) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiry: { $gt: new Date() },
  });
  if (!user) throw new AppError('Invalid or expired reset token', 400);

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  user.refreshToken = undefined;
  await user.save();
};

export const verifyEmail = async (token: string) => {
  const user = await User.findOne({ emailVerifyToken: token });
  if (!user) throw new AppError('Invalid verification token', 400);

  user.isEmailVerified = true;
  user.emailVerifyToken = undefined;
  await user.save();
};

export const getMe = async (userId: string) => {
  const user = await User.findById(userId).select(
    '-passwordHash -refreshToken -resetPasswordToken -resetPasswordExpiry -emailVerifyToken',
  );
  if (!user) throw new AppError('User not found', 404);
  return user;
};
