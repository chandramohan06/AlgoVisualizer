/**
 * Idempotent Database Seeder for Complete Array Module.
 * Run from server/ directory:
 *   npx ts-node --transpile-only --env-file=.env src/scripts/seedArrayModule.ts
 */
import mongoose from 'mongoose';
import { Category } from '../models/Category.model';
import { Algorithm } from '../models/Algorithm.model';
import { QuizQuestion } from '../models/QuizQuestion.model';
import { PracticeProblem } from '../models/PracticeProblem.model';
import { User } from '../models/User.model';
import { ARRAY_ALGORITHMS_DATA } from '../data/array.data';
import { env } from '../config/env';

(async () => {
  console.log('\n🔌  Connecting to MongoDB Atlas …');
  await mongoose.connect(env.MONGODB_URI, { dbName: 'algovisualizer' });
  console.log('✅  Connected to MongoDB.\n');

  // 1. Get or create admin user for createdBy reference
  let adminUser = await User.findOne({ role: 'admin' });
  if (!adminUser) {
    adminUser = await User.findOne({});
  }

  const adminId = adminUser?._id || new mongoose.Types.ObjectId();

  // 2. Ensure Category #1 "Array" exists
  console.log('📦  Setting up Category #1: "Array" …');
  let arrayCategory = await Category.findOne({ slug: 'array' });
  if (!arrayCategory) {
    arrayCategory = await Category.create({
      name: 'Array',
      slug: 'array',
      icon: 'Layers',
      order: 1,
    });
  } else {
    arrayCategory.name = 'Array';
    arrayCategory.icon = 'Layers';
    arrayCategory.order = 1;
    await arrayCategory.save();
  }

  // Shift order of other categories to >= 2
  await Category.updateMany({ _id: { $ne: arrayCategory._id } }, { $inc: { order: 1 } });
  console.log(`✅  Category "Array" configured at Order 1 (ID: ${arrayCategory._id}).\n`);

  // 3. Upsert Array Algorithms
  console.log(`🚀  Seeding ${ARRAY_ALGORITHMS_DATA.length} Array Algorithms …\n`);

  let algoCount = 0;
  let quizCount = 0;
  let practiceCount = 0;

  for (const algoData of ARRAY_ALGORITHMS_DATA) {
    const algoDoc = await Algorithm.findOneAndUpdate(
      { slug: algoData.slug },
      {
        slug: algoData.slug,
        title: algoData.title,
        category: arrayCategory._id,
        difficulty: algoData.difficulty,
        theory: algoData.theory,
        javaCode: algoData.javaCode,
        cppCode: algoData.cppCode,
        pseudoCode: algoData.pseudoCode,
        timeComplexity: algoData.timeComplexity,
        spaceComplexity: algoData.spaceComplexity,
        applications: algoData.applications,
        animationConfig: {
          type: 'array',
          defaultInput: (Array.isArray(algoData.sampleInput) && algoData.sampleInput.every((x) => typeof x === 'number'))
            ? algoData.sampleInput
            : [10, 20, 30, 40, 50],
          minSize: 2,
          maxSize: 20,
        },
        isPublished: true,
        createdBy: adminId,
      },
      { upsert: true, new: true },
    );
    algoCount++;

    // Seed Quiz Questions
    for (const q of algoData.quizzes) {
      await QuizQuestion.findOneAndUpdate(
        { algorithmId: algoDoc._id, question: q.question },
        {
          algorithmId: algoDoc._id,
          question: q.question,
          type: q.type,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: q.difficulty,
          points: q.points,
        },
        { upsert: true, new: true },
      );
      quizCount++;
    }

    // Seed Practice Problems
    for (const p of algoData.practiceProblems) {
      await PracticeProblem.findOneAndUpdate(
        { algorithmId: algoDoc._id, title: p.title },
        {
          algorithmId: algoDoc._id,
          title: p.title,
          description: p.description,
          difficulty: p.difficulty,
          starterCode: p.starterCode,
          testCases: p.testCases,
          solution: p.solution,
          externalLink: p.externalLink,
        },
        { upsert: true, new: true },
      );
      practiceCount++;
    }
  }

  console.log(`\n🎉  Seeding Complete! Summary:`);
  console.log(`   - Algorithms Upserted: ${algoCount}`);
  console.log(`   - Quiz Questions Upserted: ${quizCount}`);
  console.log(`   - Practice Problems Upserted: ${practiceCount}`);

  await mongoose.disconnect();
  console.log('\n🔌  Disconnected from MongoDB.\n');
  process.exit(0);
})().catch((err) => {
  console.error('❌  Seeder script failed:', err);
  process.exit(1);
});
