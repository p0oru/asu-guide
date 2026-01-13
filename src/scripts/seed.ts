import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import Class from '../models/Class';
import Place from '../models/Place';

const MONGODB_URI = process.env.MONGODB_URI!;

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Class.deleteMany({});
    await Place.deleteMany({});

    // Insert dummy Classes (one for each difficulty)
    console.log('Inserting Classes...');
    const classes = await Class.insertMany([
      {
        code: 'CSE 110',
        name: 'Principles of Programming',
        professor: 'Dr. Smith',
        credits: 3,
        difficulty: 'Easy A',
        genEd: [],
      },
      {
        code: 'MAT 265',
        name: 'Calculus for Engineers I',
        professor: 'Dr. Johnson',
        credits: 3,
        difficulty: 'Moderate',
        genEd: ['MA'],
      },
      {
        code: 'CSE 340',
        name: 'Principles of Programming Languages',
        professor: 'Dr. Chen',
        credits: 3,
        difficulty: 'Hard',
        genEd: [],
      },
    ]);
    console.log(`Inserted ${classes.length} classes`);

    // Insert dummy Places (one M&G accepted, one Late Night)
    console.log('Inserting Places...');
    const places = await Place.insertMany([
      {
        name: 'Chick-fil-A MU',
        category: 'Food',
        location: 'Memorial Union, Tempe Campus',
        flags: {
          acceptsMnG: true,
          isLateNight: false,
          isBudget: false,
        },
        deals: '10% off on Tuesdays for students',
      },
      {
        name: 'Hayden Library',
        category: 'Study',
        location: '300 E Orange Mall, Tempe',
        flags: {
          acceptsMnG: false,
          isLateNight: true,
          isBudget: true,
        },
      },
      {
        name: 'Cartel Coffee Lab',
        category: 'Cafe',
        location: '225 W University Dr, Tempe',
        flags: {
          acceptsMnG: false,
          isLateNight: false,
          isBudget: true,
        },
        deals: 'Happy hour 2-4pm - $1 off all drinks',
      },
    ]);
    console.log(`Inserted ${places.length} places`);

    console.log('\n✅ Seeding Complete!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

seed();
