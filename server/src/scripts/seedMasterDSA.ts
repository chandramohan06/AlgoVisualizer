/**
 * Master Idempotent Database Seeder for ALL 11 DSA Categories.
 * Run from server/ directory:
 *   npx ts-node -r dotenv/config src/scripts/seedMasterDSA.ts
 */
import mongoose from 'mongoose';
import { Category } from '../models/Category.model';
import { Algorithm } from '../models/Algorithm.model';
import { QuizQuestion } from '../models/QuizQuestion.model';
import { PracticeProblem } from '../models/PracticeProblem.model';
import { User } from '../models/User.model';
import { MASTER_DSA_CATEGORIES } from '../data/dsaMasterData';
import { env } from '../config/env';

(async () => {
  console.log('\n🔌  Connecting to MongoDB Atlas …');
  await mongoose.connect(env.MONGODB_URI, { dbName: 'algovisualizer' });
  console.log('✅  Connected to MongoDB.\n');

  let adminUser = await User.findOne({ role: 'admin' });
  if (!adminUser) {
    adminUser = await User.findOne({});
  }

  const adminId = adminUser?._id || new mongoose.Types.ObjectId();

  let totalCategories = 0;
  let totalAlgorithms = 0;
  let totalQuizzes = 0;
  let totalPractice = 0;

  console.log(`🚀  Seeding ${MASTER_DSA_CATEGORIES.length} Master DSA Categories …\n`);

  for (const catDef of MASTER_DSA_CATEGORIES) {
    let catDoc = await Category.findOne({ slug: catDef.slug });
    if (!catDoc) {
      catDoc = await Category.create({
        name: catDef.name,
        slug: catDef.slug,
        icon: catDef.icon,
        order: catDef.order,
      });
    } else {
      catDoc.name = catDef.name;
      catDoc.icon = catDef.icon;
      catDoc.order = catDef.order;
      await catDoc.save();
    }
    totalCategories++;
    console.log(`📦  Category #${catDef.order}: "${catDef.name}" configured.`);

    // Seed algorithms for this category
    for (const algoData of catDef.data) {
      const defaultInputArr =
        Array.isArray(algoData.sampleInput) && algoData.sampleInput.every((x) => typeof x === 'number')
          ? algoData.sampleInput
          : [10, 20, 30, 40, 50];

      const algoDoc = await Algorithm.findOneAndUpdate(
        { slug: algoData.slug },
        {
          slug: algoData.slug,
          title: algoData.title,
          category: catDoc._id,
          difficulty: algoData.difficulty,
          theory: algoData.theory,
          javaCode: algoData.javaCode,
          cppCode: algoData.cppCode,
          pseudoCode: algoData.pseudoCode,
          timeComplexity: algoData.timeComplexity,
          spaceComplexity: algoData.spaceComplexity,
          applications: algoData.applications,
          animationConfig: {
            type: catDef.slug === 'linked-list' ? 'linkedlist' : catDef.slug === 'tree' ? 'tree' : catDef.slug === 'graph' ? 'graph' : 'array',
            defaultInput: defaultInputArr,
            minSize: 2,
            maxSize: 20,
          },
          isPublished: true,
          createdBy: adminId,
        },
        { upsert: true, new: true },
      );
      totalAlgorithms++;

      // Seed Quiz Questions
      if (algoData.quizzes && algoData.quizzes.length > 0) {
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
          totalQuizzes++;
        }
      }

      // Seed Practice Problems
      if (algoData.practiceProblems && algoData.practiceProblems.length > 0) {
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
              solution: p.solution || p.explanation,
              externalLink: p.externalLink || 'https://leetcode.com',
            },
            { upsert: true, new: true },
          );
          totalPractice++;
        }
      }
    }
  }

  console.log(`\n🎉  MASTER DSA SEEDING COMPLETE!`);
  console.log(`   - Total Categories Configured: ${totalCategories}`);
  console.log(`   - Total Algorithms Upserted: ${totalAlgorithms}`);
  console.log(`   - Total Quiz Questions Upserted: ${totalQuizzes}`);
  console.log(`   - Total Practice Problems Upserted: ${totalPractice}`);

  await mongoose.disconnect();
  console.log('\n🔌  Disconnected from MongoDB.\n');
  process.exit(0);
})().catch((err) => {
  console.error('❌  Master Seeder script failed:', err);
  process.exit(1);
});
