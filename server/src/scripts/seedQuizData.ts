/**
 * Standalone Quiz Database Seeder
 * Run: ts-node --transpile-only -r dotenv/config src/scripts/seedQuizData.ts
 *
 * This script:
 * 1. Connects to MongoDB
 * 2. Drops all legacy quizquestions without topic field
 * 3. Inserts all topic-tagged questions from quizDatabase.ts
 */
import mongoose from 'mongoose';
import { env } from '../config/env';
import { QuizQuestion } from '../models/QuizQuestion.model';
import { QUIZ_SEED_DATA } from '../data/quizDatabase';

async function seedQuizData() {
  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(env.MONGODB_URI);
  console.log('✅ Connected');

  // Count existing topic-tagged docs
  const existingCount = await QuizQuestion.countDocuments({ topic: { $exists: true, $ne: null } });
  console.log(`📊 Existing topic-tagged questions: ${existingCount}`);

  // Always re-seed in force mode
  console.log('🗑️  Removing all legacy topic-less documents...');
  const r1 = await QuizQuestion.deleteMany({ topic: { $exists: false } });
  const r2 = await QuizQuestion.deleteMany({ topic: null });
  console.log(`   Removed ${r1.deletedCount + r2.deletedCount} legacy docs`);

  // Optionally clear existing seeded data for fresh seed
  if (existingCount > 0) {
    const proceed = process.argv.includes('--force');
    if (!proceed) {
      console.log(`ℹ️  ${existingCount} topic-tagged docs already exist. Run with --force to re-seed.`);
      await mongoose.disconnect();
      return;
    }
    await QuizQuestion.deleteMany({ topic: { $exists: true, $ne: null } });
    console.log('🗑️  Removed existing seeded docs (--force mode)');
  }

  // Seed
  console.log(`📝 Seeding ${QUIZ_SEED_DATA.length} questions...`);
  await QuizQuestion.insertMany(QUIZ_SEED_DATA);

  // Verify counts by topic
  const byTopic = await QuizQuestion.aggregate([
    { $group: { _id: { topic: '$topic', type: '$type' }, count: { $sum: 1 } } },
    { $sort: { '_id.topic': 1, '_id.type': 1 } },
  ]);

  console.log('\n📊 Questions by topic & type:');
  console.log('─'.repeat(55));
  const topicSummary: Record<string, { mcq: number; coding: number }> = {};
  byTopic.forEach((row: any) => {
    const { topic, type } = row._id;
    if (!topicSummary[topic]) topicSummary[topic] = { mcq: 0, coding: 0 };
    topicSummary[topic][type as 'mcq' | 'coding'] = row.count;
  });
  Object.entries(topicSummary).forEach(([topic, counts]) => {
    const status = counts.mcq >= 15 && counts.coding >= 2 ? '✅' : '⚠️ ';
    console.log(`${status} ${topic.padEnd(25)} MCQs: ${String(counts.mcq).padStart(3)}  Coding: ${String(counts.coding).padStart(2)}`);
  });

  const total = await QuizQuestion.countDocuments();
  console.log('─'.repeat(55));
  console.log(`✅ Total documents: ${total}`);

  await mongoose.disconnect();
  console.log('🔌 Disconnected. Done.');
}

seedQuizData().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
