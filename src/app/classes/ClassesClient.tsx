'use client';

import { useState, useEffect, useTransition } from 'react';
import { Search, BookOpen, User, GraduationCap } from 'lucide-react';
import { getClasses } from '@/lib/actions';
import ComingSoon from '@/components/ComingSoon';

interface Class {
  _id: string;
  code: string;
  name: string;
  professor?: string;
  credits?: number;
  difficulty?: 'Easy A' | 'Moderate' | 'Hard';
  genEd?: string[];
}

interface ClassesClientProps {
  initialClasses: Class[];
}

const difficultyFilters = [
  { value: '', label: 'All Difficulties' },
  { value: 'Easy A', label: 'Easy A' },
  { value: 'Moderate', label: 'Moderate' },
  { value: 'Hard', label: 'Hard' },
] as const;

export default function ClassesClient({ initialClasses }: ClassesClientProps) {
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<'' | 'Easy A' | 'Moderate' | 'Hard'>('');
  const [isPending, startTransition] = useTransition();

  // Track if any filters are active
  const hasActiveFilters = search || difficulty;

  useEffect(() => {
    startTransition(async () => {
      const filtered = await getClasses({
        search: search || undefined,
        difficulty: difficulty || undefined,
      });
      setClasses(filtered);
    });
  }, [search, difficulty]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Class Directory</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Find the perfect classes for your schedule and GPA
        </p>
      </div>

      {/* Search & Filters - Always visible */}
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by course code, name, or professor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-asu-maroon focus:outline-none focus:ring-2 focus:ring-asu-maroon/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2">
          {difficultyFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setDifficulty(filter.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                difficulty === filter.value
                  ? filter.value === 'Easy A'
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                    : filter.value === 'Moderate'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
                    : filter.value === 'Hard'
                    ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                    : 'bg-asu-maroon text-white'
                  : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isPending && (
        <div className="mb-4 text-center text-sm text-zinc-500">Updating results...</div>
      )}

      {/* Results Grid or Coming Soon */}
      {classes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <ClassCard key={cls._id} cls={cls} />
          ))}
        </div>
      ) : initialClasses.length === 0 && !hasActiveFilters ? (
        // Show Coming Soon only when there's no data at all
        <ComingSoon message="STAY TUNED: CLASS REVIEWS DROPPING SOON" />
      ) : (
        // Show empty state when filters return no results
        <EmptyState />
      )}
    </div>
  );
}

function ClassCard({ cls }: { cls: Class }) {
  const getDifficultyStyles = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy A':
        return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400';
      case 'Hard':
        return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400';
    }
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{cls.code}</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{cls.name}</p>
        </div>

        {/* Difficulty Badge */}
        {cls.difficulty && (
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyStyles(
              cls.difficulty
            )}`}
          >
            {cls.difficulty}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2">
        {cls.professor && (
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <User className="h-4 w-4" />
            <span>{cls.professor}</span>
          </div>
        )}

        {cls.credits && (
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <GraduationCap className="h-4 w-4" />
            <span>{cls.credits} Credits</span>
          </div>
        )}
      </div>

      {/* Gen Ed Tags */}
      {cls.genEd && cls.genEd.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {cls.genEd.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 py-16 dark:border-zinc-800">
      <BookOpen className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
      <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">No classes found</h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Try adjusting your filters or search terms
      </p>
    </div>
  );
}
