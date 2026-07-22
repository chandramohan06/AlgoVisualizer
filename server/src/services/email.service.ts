import { transporter } from '../config/nodemailer';
import { env } from '../config/env';

export const sendVerificationEmail = async (
  email: string,
  name: string,
  token: string,
): Promise<void> => {
  const verifyUrl = `${env.CLIENT_URL}/verify-email/${token}`;

  try {
    await transporter.sendMail({
      from: `"AlgoVisualizer" <${env.EMAIL_FROM}>`,
      to: email,
      subject: 'Verify your email — AlgoVisualizer',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Welcome to AlgoVisualizer, ${name}! 🚀</h2>
          <p>Please verify your email address to get started:</p>
          <a href="${verifyUrl}" style="
            display: inline-block;
            background: #6366f1;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin: 16px 0;
          ">Verify Email</a>
          <p style="color: #666; font-size: 14px;">This link expires in 24 hours.</p>
        </div>
      `,
    });
    console.log(`✉️ Verification email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send verification email to ${email}:`, error);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  token: string,
): Promise<void> => {
  const resetUrl = `${env.CLIENT_URL}/reset-password/${token}`;

  try {
    await transporter.sendMail({
      from: `"AlgoVisualizer" <${env.EMAIL_FROM}>`,
      to: email,
      subject: 'Reset your password — AlgoVisualizer',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Password Reset Request</h2>
          <p>Hi ${name}, click the button below to reset your password:</p>
          <a href="${resetUrl}" style="
            display: inline-block;
            background: #ef4444;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin: 16px 0;
          ">Reset Password</a>
          <p style="color: #666; font-size: 14px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
        </div>
      `,
    });
    console.log(`✉️ Password reset email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send password reset email to ${email}:`, error);
  }
};
