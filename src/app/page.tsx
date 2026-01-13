import Link from 'next/link';
import Image from 'next/image';
import { Utensils, BookOpen, MessageSquare, Sparkles } from 'lucide-react';

const features = [
  {
    href: '/food',
    icon: Utensils,
    title: 'Food Directory',
    description: 'Find the best eats on and off campus. Filter by M&G, late night hours, and budget.',
    color: 'from-orange-500 to-red-500',
  },
  {
    href: '/classes',
    icon: BookOpen,
    title: 'Class Guide',
    description: 'Discover easy A classes, check difficulty ratings, and find Gen Ed options.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    href: '/community',
    icon: MessageSquare,
    title: 'Community',
    description: 'Share your own tips and suggestions with fellow Sun Devils.',
    color: 'from-green-500 to-emerald-500',
  },
];

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
          ASU{' '}
          <span className="bg-gradient-to-r from-asu-maroon to-asu-gold bg-clip-text text-transparent">
            Survival Guide
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Everything you need to navigate life at Arizona State University. From the best food spots
          to easy A classes, we&apos;ve got you covered.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {feature.title}
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{feature.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-asu-maroon dark:text-asu-gold">
                Explore →
              </div>
            </Link>
          );
        })}
      </div>

      {/* Coming Soon Banner */}
      <div className="mt-20 overflow-hidden rounded-2xl bg-gradient-to-br from-asu-maroon to-maroon-800 p-8 text-white sm:p-12">
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
