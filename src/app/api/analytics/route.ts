import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Stats from '@/models/Stats';
import Class from '@/models/Class';
import Place from '@/models/Place';

// POST: Track a new unique visit
export async function POST() {
  try {
    await dbConnect();

    // Find the singleton Stats document, or create one if it doesn't exist
    // Then increment visits by 1
    await Stats.findOneAndUpdate(
      {},
      { 
        $inc: { visits: 1 },
        $set: { lastUpdated: new Date() }
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to track visit:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track visit' },
      { status: 500 }
    );
  }
}

// GET: Fetch stats for admin dashboard
export async function GET() {
  try {
    await dbConnect();

    // Run all queries in parallel for performance
    const [classCount, placeCount, stats] = await Promise.all([
      Class.countDocuments(),
      Place.countDocuments(),
      Stats.findOne(),
    ]);

    return NextResponse.json({
      classes: classCount,
      places: placeCount,
      visits: stats?.visits ?? 0,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
