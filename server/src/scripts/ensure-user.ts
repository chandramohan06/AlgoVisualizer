import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.model';
import { env } from '../config/env';
import { Role } from '@algovisualizer/shared';

(async () => {
  console.log('\n🔌 Connecting to MongoDB Atlas …');
  await mongoose.connect(env.MONGODB_URI, { dbName: 'algovisualizer' });
  console.log('✅ Connected.\n');

  // 1. Ensure Student Account
  const studentEmail = 'student@algovisualizer.com';
  const studentPassword = 'Student@123';
  const studentHash = await bcrypt.hash(studentPassword, 10);

  let student = await User.findOne({ email: studentEmail });
  if (!student) {
    student = await User.create({
      name: 'Demo Student User',
      email: studentEmail,
      passwordHash: studentHash,
      role: Role.STUDENT,
      isEmailVerified: true,
      isBanned: false,
      college: 'IIT Bombay',
      batch: '2026',
      targetCompany: 'Google',
      xp: 4500,
      streak: 15,
    });
    console.log('✅ Demo Student created:', studentEmail);
  } else {
    student.passwordHash = studentHash;
    student.isEmailVerified = true;
    student.isBanned = false;
    student.role = Role.STUDENT;
    await student.save();
    console.log('✅ Demo Student updated:', studentEmail);
  }

  // 2. Ensure Admin Account
  const adminEmail = 'admin@algovisualizer.com';
  const adminPassword = 'Admin@123';
  const adminHash = await bcrypt.hash(adminPassword, 10);

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: 'System Administrator',
      email: adminEmail,
      passwordHash: adminHash,
      role: Role.ADMIN,
      isEmailVerified: true,
      isBanned: false,
      college: 'System Operations',
    });
    console.log('✅ Demo Admin created:', adminEmail);
  } else {
    admin.passwordHash = adminHash;
    admin.isEmailVerified = true;
    admin.isBanned = false;
    admin.role = Role.ADMIN;
    await admin.save();
    console.log('✅ Demo Admin updated:', adminEmail);
  }

  await mongoose.disconnect();
  console.log('\n🔌 Disconnected. Done.\n');
  process.exit(0);
})().catch((err) => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});
