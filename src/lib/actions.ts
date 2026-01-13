'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from './db';
import Class from '@/models/Class';
import Place from '@/models/Place';
import Suggestion from '@/models/Suggestion';

// Types for filters
interface ClassFilters {
  search?: string;
  difficulty?: 'Easy A' | 'Moderate' | 'Hard' | '';
}

interface PlaceFilters {
  search?: string;
  acceptsMnG?: boolean;
  isLateNight?: boolean;
  isBudget?: boolean;
}

// ============================================
// READ OPERATIONS
// ============================================

// Get classes with optional filters
export async function getClasses(filters: ClassFilters = {}) {
  try {
    await dbConnect();

    // Build query
    const query: Record<string, unknown> = {};

    if (filters.search) {
      const searchRegex = { $regex: filters.search, $options: 'i' };
      query.$or = [
        { code: searchRegex },
        { name: searchRegex },
        { professor: searchRegex },
      ];
    }

    if (filters.difficulty) {
      query.difficulty = filters.difficulty;
    }

    const classes = await Class.find(query).sort({ code: 1 }).lean();

    // Convert MongoDB documents to plain objects
    return JSON.parse(JSON.stringify(classes));
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
}

// Get places with optional filters
export async function getPlaces(filters: PlaceFilters = {}) {
  try {
    await dbConnect();

    // Build query
    const query: Record<string, unknown> = {};

    if (filters.search) {
      const searchRegex = { $regex: filters.search, $options: 'i' };
      query.$or = [{ name: searchRegex }, { category: searchRegex }];
    }

    if (filters.acceptsMnG) {
      query['flags.acceptsMnG'] = true;
    }

    if (filters.isLateNight) {
      query['flags.isLateNight'] = true;
    }

    if (filters.isBudget) {
      query['flags.isBudget'] = true;
    }

    const places = await Place.find(query).sort({ name: 1 }).lean();

    // Convert MongoDB documents to plain objects
    return JSON.parse(JSON.stringify(places));
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
}

// Get all suggestions (for admin)
export async function getSuggestions() {
  try {
    await dbConnect();
    const suggestions = await Suggestion.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(suggestions));
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
}

// ============================================
// CREATE OPERATIONS
// ============================================

// Submit a new suggestion (public)
export async function submitSuggestion(formData: FormData) {
  try {
    await dbConnect();

    const content = formData.get('content') as string;
    const type = formData.get('type') as 'Class' | 'Food' | 'Other';
    const username = (formData.get('username') as string) || 'Anonymous';

    if (!content || content.trim().length === 0) {
      return { success: false, error: 'Suggestion content is required' };
    }

    const suggestion = await Suggestion.create({
      content: content.trim(),
      type,
      username: username.trim() || 'Anonymous',
      status: 'Pending',
    });

    return { success: true, id: suggestion._id.toString() };
  } catch (error) {
    console.error('Error submitting suggestion:', error);
    return { success: false, error: 'Failed to submit suggestion' };
  }
}

// Add a new class (admin)
export async function addClass(formData: FormData) {
  try {
    await dbConnect();

    const code = formData.get('code') as string;
    const name = formData.get('name') as string;
    const professor = formData.get('professor') as string;
    const credits = formData.get('credits') as string;
    const difficulty = formData.get('difficulty') as string;
    const genEdStr = formData.get('genEd') as string;

    if (!code || !name) {
      return { success: false, error: 'Code and name are required' };
    }

    const genEd = genEdStr
      ? genEdStr.split(',').map((g) => g.trim()).filter(Boolean)
      : [];

    await Class.create({
      code: code.trim().toUpperCase(),
      name: name.trim(),
      professor: professor?.trim() || undefined,
      credits: credits ? parseInt(credits) : undefined,
      difficulty: difficulty || undefined,
      genEd,
    });

    revalidatePath('/classes');
    revalidatePath('/admin');

    return { success: true };
  } catch (error) {
    console.error('Error adding class:', error);
    return { success: false, error: 'Failed to add class' };
  }
}

// Add a new place (admin)
export async function addPlace(formData: FormData) {
  try {
    await dbConnect();

    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const location = formData.get('location') as string;
    const acceptsMnG = formData.get('acceptsMnG') === 'on';
    const isLateNight = formData.get('isLateNight') === 'on';
    const isBudget = formData.get('isBudget') === 'on';
    const deals = formData.get('deals') as string;

    if (!name) {
      return { success: false, error: 'Name is required' };
    }

    await Place.create({
      name: name.trim(),
      category: category || undefined,
      location: location?.trim() || undefined,
      flags: {
        acceptsMnG,
        isLateNight,
        isBudget,
      },
      deals: deals?.trim() || undefined,
    });

    revalidatePath('/food');
    revalidatePath('/admin');

    return { success: true };
  } catch (error) {
    console.error('Error adding place:', error);
    return { success: false, error: 'Failed to add place' };
  }
}

// ============================================
// DELETE OPERATIONS
// ============================================

// Delete a class (admin)
export async function deleteClass(id: string) {
  try {
    await dbConnect();
    await Class.findByIdAndDelete(id);
    revalidatePath('/classes');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error deleting class:', error);
    return { success: false, error: 'Failed to delete class' };
  }
}

// Delete a place (admin)
export async function deletePlace(id: string) {
  try {
    await dbConnect();
    await Place.findByIdAndDelete(id);
    revalidatePath('/food');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error deleting place:', error);
    return { success: false, error: 'Failed to delete place' };
  }
}

// Delete a suggestion (admin)
export async function deleteSuggestion(id: string) {
  try {
    await dbConnect();
    await Suggestion.findByIdAndDelete(id);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error deleting suggestion:', error);
    return { success: false, error: 'Failed to delete suggestion' };
  }
}

// ============================================
// AUTH OPERATIONS
// ============================================

// Verify admin access code
export async function verifyAdmin(code: string) {
  const adminSecret = process.env.ADMIN_SECRET;
  
  if (!adminSecret) {
    console.error('ADMIN_SECRET not configured');
    return { success: false };
  }

  if (code === adminSecret) {
    return { success: true };
  }

  return { success: false };
}
