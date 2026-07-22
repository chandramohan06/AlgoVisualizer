/**
 * Leaderboard Seed Cleanup Script
 * Ensures no fake/mock students exist in MongoDB.
 */

import mongoose from 'mongoose';
import { User } from '../models/User.model';
import { Leaderboard } from '../models/Leaderboard.model';
import { env } from '../config/env';

const SEED_EMAILS = [
  'aarav.sharma@iitb.ac.in',
  'priya.patel@bits-pilani.ac.in',
  'rohan.gupta@nitt.edu',
  'ananya.v@vit.ac.in',
  'kabir.mehta@dtu.ac.in',
  'sanya.m@iiit.ac.in',
  'devansh.r@rvce.edu.in',
  'ishita.roy@iitd.ac.in',
  'vihaan.j@manipal.edu',
  'diya.sen@srmist.edu.in',
  'chandramohankumarsingh06@gmail.com',
  'aditya.k@coep.ac.in',
  'riya.nair@cet.ac.in',
  'karan.iyer@vjti.ac.in',
  'meera.d@pict.edu',
];

const SEED_NAMES = [
  'Aarav Sharma',
  'Priya Patel',
  'Rohan Gupta',
  'Ananya Verma',
  'Kabir Mehta',
  'Sanya Malhotra',
  'Devansh Reddy',
  'Ishita Roy',
  'Vihaan Joshi',
  'Diya Sen',
  'Aditya Kulkarni',
  'Riya Nair',
  'Karan Iyer',
  'Meera Deshmukh',
  'Chandra Mohan Kumar Singh',
];

(async () => {
  try {
    console.log('\n🔌 Connecting to MongoDB …');
    await mongoose.connect(env.MONGODB_URI, { dbName: 'algovisualizer' });
    console.log('✅ Connected.\n');

    const fakeUsers = await User.find({
      $or: [{ email: { $in: SEED_EMAILS } }, { name: { $in: SEED_NAMES } }],
    }).select('_id');

    if (fakeUsers.length > 0) {
      const fakeUserIds = fakeUsers.map((u) => u._id);
      await User.deleteMany({ _id: { $in: fakeUserIds } });
      await Leaderboard.deleteMany({ userId: { $in: fakeUserIds } });
      console.log(`✅ Removed ${fakeUsers.length} mock users from MongoDB database.`);
    } else {
      console.log('✅ No mock users found in database.');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error cleaning mock users:', err);
    process.exit(1);
  }
})();
