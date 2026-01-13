import Link from 'next/link';
import Image from 'next/image';
import { Utensils, BookOpen, MessageSquare, Sparkles } from 'lucide-react';
import DeadlineWidget from '@/components/DeadlineWidget';

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-asu-maroon/10 px-4 py-2 text-sm font-medium text-asu-maroon">
          <Sparkles className="h-4 w-4 text-asu-gold" />
          Made by Sun Devils, for Sun Devils
        </div>
        
        {/* Logo and Title */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/asu_trident.svg"
            alt="ASU Trident"
            width={80}
            height={96}
            className="h-20 w-auto"
          />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl">
          Sun Devil{' '}
          <span className="bg-gradient-to-r from-asu-maroon to-asu-gold bg-clip-text text-transparent">
            Guide
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Everything you need to navigate life at Arizona State University. From the best food spots
          to easy A classes, we&apos;ve got you covered.
        </p>
      </div>

      {/* Deadline Widget (Mini Widget) */}
      <div className="mt-8">
        <DeadlineWidget />
      </div>

      {/* Main Navigation - 2 Column Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {/* Food & Deals Button */}
        <Link
          href="/food"
          className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
              <Utensils className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                🍔 Food & Deals
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Campus eats, M&G spots & late night
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm font-medium text-asu-maroon group-hover:text-asu-gold transition-colors dark:text-asu-gold">
            Explore →
          </div>
        </Link>

        {/* Class Guide Button */}
        <Link
          href="/classes"
          className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                📚 Class Guide
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Easy A&apos;s, Gen Eds & professor tips
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm font-medium text-asu-maroon group-hover:text-asu-gold transition-colors dark:text-asu-gold">
            Explore →
          </div>
        </Link>
      </div>

      {/* Secondary Navigation - Community Banner */}
      <div className="mt-4 max-w-3xl mx-auto">
        <Link
          href="/community"
          className="group flex items-center justify-center gap-3 w-full rounded-2xl border border-zinc-200 bg-white py-4 px-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              🗣️ Community Suggestions
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Share tips with fellow Sun Devils
            </p>
          </div>
          <span className="ml-auto text-sm font-medium text-asu-maroon group-hover:text-asu-gold transition-colors dark:text-asu-gold">
            Submit →
          </span>
        </Link>
      </div>

      {/* Coming Soon Banner */}
      <div className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-br from-asu-maroon to-maroon-800 p-8 text-white sm:p-12 max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/asu_trident.svg"
            alt=""
            width={64}
            height={77}
            className="h-16 w-auto mb-6"
          />
          <h2 className="text-3xl font-bold tracking-wider text-asu-gold sm:text-4xl">
            COMING SOON
          </h2>
          <p className="mt-3 max-w-md text-maroon-200">
            More food spots, class reviews, and Sun Devil tips are on the way. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}
