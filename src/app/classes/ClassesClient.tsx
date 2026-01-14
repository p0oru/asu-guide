'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  User, 
  CheckCircle2, 
  Laptop, 
  PartyPopper,
  ExternalLink,
  CalendarSearch,
  Star,
  HelpCircle
} from 'lucide-react';
import ComingSoon from '@/components/ComingSoon';

interface Class {
  _id: string;
  courseCode: string;
  courseName: string;
  professor: string;
  description: string;
  genEd: string;
  difficulty: 'Light Workload' | 'Standard Pace' | 'Content Heavy';
  attendance?: 'Mandatory' | 'Optional' | 'Unknown';
  exams?: 'In-Person' | 'Online' | 'None' | 'Unknown';
  rmpLink?: string;
}

interface ClassesClientProps {
  initialClasses: Class[];
}

const difficultyFilters = [
  { value: '', label: 'All Difficulties' },
  { value: 'Light Workload', label: 'Light' },
  { value: 'Standard Pace', label: 'Standard' },
  { value: 'Content Heavy', label: 'Heavy' },
] as const;

// Gen Ed full names for display
const GEN_ED_LABELS: Record<string, string> = {
  HUAD: 'Humanities, Arts and Design',
  SOBE: 'Social and Behavioral Sciences',
  SCIT: 'Scientific Thinking',
  QTRS: 'Quantitative Reasoning',
  MATH: 'Mathematics',
  AMIT: 'American Institutions',
  CIVI: 'Civic Engagement',
  GCSI: 'Global Communities',
  SUST: 'Sustainability',
};

// Helper: Build ASU Class Search URL from course code
function getClassSearchUrl(courseCode: string): string {
  const parts = courseCode.trim().split(/\s+/);
  const subject = parts[0] || '';
  const number = parts[1] || '';
  return `https://catalog.apps.asu.edu/catalog/classes?keywords=${subject}+${number}`;
}

// Helper: Get professor link (RMP if found, otherwise ASU Search)
function getProfessorLink(
  professorName: string,
  description: string,
  rmpLink?: string
): { url: string; isRmp: boolean } {
  // First check the dedicated rmpLink field
  if (rmpLink) {
    return { url: rmpLink, isRmp: true };
  }

  // Then check description for RMP link
  const rmpRegex = /https?:\/\/(?:www\.)?ratemyprofessors\.com[^\s)"]*/i;
  const match = description.match(rmpRegex);
  if (match) {
    return { url: match[0], isRmp: true };
  }

  // Fallback to ASU Search
  const encodedName = encodeURIComponent(professorName);
  return {
    url: `https://search.asu.edu/?search-tabs=all&q=${encodedName}`,
    isRmp: false,
  };
}

export default function ClassesClient({ initialClasses }: ClassesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState<'' | 'Light Workload' | 'Standard Pace' | 'Content Heavy'>('');

  // Track if any filters are active
  const hasActiveFilters = searchQuery || difficulty;

  // Client-side filtering with useMemo for performance
  const filteredClasses = useMemo(() => {
    return initialClasses.filter((cls) => {
      // Check difficulty filter
      if (difficulty && cls.difficulty !== difficulty) {
        return false;
      }

      // Check search query (case-insensitive)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesCourseCode = cls.courseCode.toLowerCase().includes(query);
        const matchesCourseName = cls.courseName.toLowerCase().includes(query);
        const matchesProfessor = cls.professor.toLowerCase().includes(query);

        if (!matchesCourseCode && !matchesCourseName && !matchesProfessor) {
          return false;
        }
      }

      return true;
    });
  }, [initialClasses, searchQuery, difficulty]);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                  ? filter.value === 'Light Workload'
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                    : filter.value === 'Standard Pace'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
                    : filter.value === 'Content Heavy'
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

      {/* Results Grid or Coming Soon */}
      {filteredClasses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((cls) => (
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
  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case 'Light Workload':
        return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400';
      case 'Standard Pace':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400';
      case 'Content Heavy':
        return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'Light Workload':
        return 'Light';
      case 'Standard Pace':
        return 'Standard';
      case 'Content Heavy':
        return 'Heavy';
      default:
        return difficulty;
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="border-b border-zinc-100 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
        <h3 className="text-lg text-zinc-900 dark:text-zinc-100">
          <span className="font-bold">{cls.courseCode}</span>
          <span className="font-normal">: {cls.courseName}</span>
        </h3>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Badges Row */}
        <div className="mb-4 flex flex-wrap gap-2">
          {/* Difficulty Badge */}
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getDifficultyStyles(
              cls.difficulty
            )}`}
          >
            {getDifficultyLabel(cls.difficulty)}
          </span>

          {/* Gen Ed Badge */}
          {cls.genEd && (
            <span 
              className="rounded-full bg-zinc-200 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
              title={GEN_ED_LABELS[cls.genEd] || cls.genEd}
            >
              {cls.genEd}
            </span>
          )}
        </div>

        {/* Professor */}
        <div className="mb-3 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <User className="h-4 w-4 shrink-0" />
          <span>{cls.professor}</span>
        </div>

        {/* Logistics Row */}
        <div className="mb-4 flex flex-wrap gap-3">
          {cls.attendance === 'Optional' && (
            <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Attendance Optional</span>
            </div>
          )}
          {cls.exams === 'Online' && (
            <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
              <Laptop className="h-3.5 w-3.5" />
              <span>Online Exams</span>
            </div>
          )}
          {cls.exams === 'None' && (
            <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400">
              <PartyPopper className="h-3.5 w-3.5" />
              <span>No Exams</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {cls.description}
        </p>

        {/* Footer - Smart Redirection Buttons */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          {/* Check Availability Button */}
          <a
            href={getClassSearchUrl(cls.courseCode)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:border-zinc-600"
          >
            <CalendarSearch className="h-3.5 w-3.5" />
            Check Availability
          </a>

          {/* Professor Intel Button */}
          {(() => {
            const profLink = getProfessorLink(cls.professor, cls.description, cls.rmpLink);
            return (
              <a
                href={profLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  profLink.isRmp
                    ? 'border-asu-gold/30 bg-asu-gold/10 text-asu-gold hover:bg-asu-gold/20 hover:border-asu-gold/50'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:border-zinc-600'
                }`}
              >
                {profLink.isRmp ? (
                  <>
                    <Star className="h-3.5 w-3.5" />
                    RateMyProf
                  </>
                ) : (
                  <>
                    <HelpCircle className="h-3.5 w-3.5" />
                    Who is this?
                  </>
                )}
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            );
          })()}
        </div>
      </div>
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
