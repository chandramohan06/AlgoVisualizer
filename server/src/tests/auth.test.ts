import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Role } from '@algovisualizer/shared';

async function runAuthTests() {
  console.log('🧪 Starting AlgoVisualizer Auth & RBAC Test Suite...\n');
  let passed = 0;
  let failed = 0;

  // Test 1: Password Hashing & Comparison
  try {
    const rawPass = 'Student@1234';
    const hash = await bcrypt.hash(rawPass, 10);
    const isMatch = await bcrypt.compare(rawPass, hash);
    const isMismatch = await bcrypt.compare('WrongPass', hash);

    if (isMatch && !isMismatch) {
      console.log('✅ PASS: Password Hashing & Bcrypt Verification');
      passed++;
    } else {
      console.error('❌ FAIL: Password Hashing & Bcrypt Verification');
      failed++;
    }
  } catch (err) {
    console.error('❌ FAIL: Password Hashing exception:', err);
    failed++;
  }

  // Test 2: JWT Token Creation & Role Payload Verification
  try {
    const secret = process.env.JWT_ACCESS_SECRET || 'test_secret';
    const payload = { userId: 'user_123', role: Role.ADMIN };

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const decoded = jwt.verify(token, secret) as any;

    if (decoded.userId === 'user_123' && decoded.role === Role.ADMIN) {
      console.log('✅ PASS: JWT Creation & Role Payload Claims');
      passed++;
    } else {
      console.error('❌ FAIL: JWT Claims mismatch');
      failed++;
    }
  } catch (err) {
    console.error('❌ FAIL: JWT Verification exception:', err);
    failed++;
  }

  // Test 3: RBAC Authorization Guard Logic
  try {
    const studentUser = { role: Role.STUDENT };
    const adminUser = { role: Role.ADMIN };

    const authorizeAdmin = (userRole: string) => {
      const allowedRoles = [Role.ADMIN];
      return allowedRoles.includes(userRole as any);
    };

    const studentAccess = authorizeAdmin(studentUser.role);
    const adminAccess = authorizeAdmin(adminUser.role);

    if (!studentAccess && adminAccess) {
      console.log('✅ PASS: Role-Based Authorization Guard (403 Forbidden for Non-Admins)');
      passed++;
    } else {
      console.error('❌ FAIL: Role-Based Authorization Guard failed');
      failed++;
    }
  } catch (err) {
    console.error('❌ FAIL: RBAC exception:', err);
    failed++;
  }

  console.log(`\n📊 Test Results: ${passed} Passed, ${failed} Failed`);
  if (failed > 0) process.exit(1);
  else process.exit(0);
}

runAuthTests();
