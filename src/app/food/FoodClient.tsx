'use client';

import { useState, useEffect, useTransition } from 'react';
import { Search, MapPin, Clock, DollarSign, Sparkles, Utensils } from 'lucide-react';
import { getPlaces } from '@/lib/actions';
import ComingSoon from '@/components/ComingSoon';

type PlaceCategory = 
  | 'On-Campus Deals'
  | 'Around ASU (3-mile radius)'
  | 'Cheap & Heavenly'
  | 'Late Night Cravings'
  | 'Date Night / Parents in Town';

interface Place {
  _id: string;
  name: string;
  category?: PlaceCategory;
  location?: string;
  flags?: {
    acceptsMnG?: boolean;
    isLateNight?: boolean;
    isBudget?: boolean;
  };
  insiderIntel?: string;
  image?: string;
}

interface FoodClientProps {
  initialPlaces: Place[];
}

export default function FoodClient({ initialPlaces }: FoodClientProps) {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [search, setSearch] = useState('');
  const [acceptsMnG, setAcceptsMnG] = useState(false);
  const [isLateNight, setIsLateNight] = useState(false);
  const [isBudget, setIsBudget] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Track if any filters are active
  const hasActiveFilters = search || acceptsMnG || isLateNight || isBudget;

  useEffect(() => {
    startTransition(async () => {
      const filtered = await getPlaces({
        search: search || undefined,
        acceptsMnG: acceptsMnG || undefined,
        isLateNight: isLateNight || undefined,
        isBudget: isBudget || undefined,
      });
      setPlaces(filtered);
    });
  }, [search, acceptsMnG, isLateNight, isBudget]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Food Directory</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Discover the best eats on and around campus
        </p>
      </div>

      {/* Search & Filters - Always visible */}
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:flex-wrap">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-asu-maroon focus:outline-none focus:ring-2 focus:ring-asu-maroon/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
        </div>

        {/* Filter Toggles */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAcceptsMnG(!acceptsMnG)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              acceptsMnG
                ? 'bg-gradient-to-r from-asu-maroon to-asu-gold text-white shadow-md'
                : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            M&G Accepted
          </button>

          <button
            onClick={() => setIsLateNight(!isLateNight)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isLateNight
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            <Clock className="h-4 w-4" />
            Late Night
          </button>

          <button
            onClick={() => setIsBudget(!isBudget)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isBudget
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            <DollarSign className="h-4 w-4" />
            Budget Friendly
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isPending && (
        <div className="mb-4 text-center text-sm text-zinc-500">Updating results...</div>
      )}

      {/* Results Grid or Coming Soon */}
      {places.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <PlaceCard key={place._id} place={place} />
          ))}
        </div>
      ) : initialPlaces.length === 0 && !hasActiveFilters ? (
        // Show Coming Soon only when there's no data at all
        <ComingSoon message="STAY TUNED: SUN DEVIL EATS DROPPING SOON" />
      ) : (
        // Show empty state when filters return no results
        <EmptyState />
      )}
    </div>
  );
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {/* Image or Fallback */}
      <div className="relative h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
        {place.image ? (
          <img
            src={place.image}
            alt={place.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Utensils className="h-16 w-16 text-zinc-300 dark:text-zinc-600" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {place.flags?.acceptsMnG && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-asu-maroon to-asu-gold px-2.5 py-1 text-xs font-medium text-white shadow-md">
              <Sparkles className="h-3 w-3" />
              M&G
            </span>
          )}
          {place.flags?.isLateNight && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-2.5 py-1 text-xs font-medium text-white shadow-md">
              <Clock className="h-3 w-3" />
              Late Night
            </span>
          )}
        </div>

        {/* Category Tag */}
        {place.category && (
          <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-300">
            {place.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{place.name}</h3>

        {place.location && (
          <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
            <MapPin className="h-3.5 w-3.5" />
            {place.location}
          </p>
        )}

        {/* Insider Intel */}
        {place.insiderIntel && (
          <div className="mt-3 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 p-3 dark:from-amber-950/30 dark:to-yellow-950/30">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
              💡 {place.insiderIntel}
            </p>
          </div>
        )}

        {/* Budget Badge */}
        {place.flags?.isBudget && (
          <div className="mt-3 inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
            <DollarSign className="h-4 w-4" />
            Budget Friendly
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 py-16 dark:border-zinc-800">
      <Utensils className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
      <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">No places found</h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Try adjusting your filters or search terms
      </p>
    </div>
  );
}
