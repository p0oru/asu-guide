'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

const DEADLINES = [
  // --- SPRING 2026 ---
  { name: "Classes Begin 🚀", date: "2026-01-12T08:00:00", type: "info" },
  { name: "Last Day to Add Classes", date: "2026-01-18T23:59:00", type: "warning" },
  { name: "Drop Deadline (100% Refund) 💸", date: "2026-01-25T23:59:00", type: "urgent" },
  { name: "Tuition Payment Deadline", date: "2026-01-25T17:00:00", type: "critical" },
  { name: "Spring Break! 🌴", date: "2026-03-08T00:00:00", type: "fun" },
  { name: "Course Withdrawal Deadline (W Grade) ⚠️", date: "2026-04-05T23:59:00", type: "critical" },
  { name: "Classes End", date: "2026-05-01T23:59:00", type: "warning" },
  { name: "Finals Week Begins 📝", date: "2026-05-04T00:00:00", type: "urgent" },
  { name: "Spring Graduation 🎓", date: "2026-05-11T10:00:00", type: "fun" },

  // --- SUMMER 2026 ---
  { name: "Summer Session C Begins ☀️", date: "2026-05-18T08:00:00", type: "info" },
  { name: "Summer Drop Deadline", date: "2026-05-22T23:59:00", type: "urgent" },
  { name: "Summer Withdrawal Deadline", date: "2026-06-07T23:59:00", type: "critical" },
  { name: "Summer Classes End", date: "2026-07-10T23:59:00", type: "warning" },

  // --- FALL 2026 ---
  { name: "Fall Classes Begin 🍂", date: "2026-08-20T08:00:00", type: "info" },
  { name: "Fall Drop Deadline (Refund)", date: "2026-09-02T23:59:00", type: "urgent" },
  { name: "Fall Break 🎃", date: "2026-10-10T00:00:00", type: "fun" },
  { name: "Fall Withdrawal Deadline", date: "2026-11-04T23:59:00", type: "critical" },
  { name: "Thanksgiving Break 🦃", date: "2026-11-26T00:00:00", type: "fun" },
  { name: "Fall Finals Week", date: "2026-12-07T00:00:00", type: "urgent" },
];

function getNextDeadline() {
  const now = new Date();
  const upcoming = DEADLINES
    .map((d) => ({ ...d, dateObj: new Date(d.date) }))
    .filter((d) => d.dateObj > now)
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  return upcoming[0] || null;
}

export default function DeadlineWidget() {
  const [nextDeadline, setNextDeadline] = useState<ReturnType<typeof getNextDeadline> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNextDeadline(getNextDeadline());
  }, []);

  if (!mounted) {
    return (
      <div className="absolute top-4 right-4 z-40 w-48 p-2 bg-white/95 backdrop-blur-sm border border-zinc-200/50 rounded-lg shadow-sm dark:bg-zinc-900/95 dark:border-zinc-800/50 sm:right-6 lg:right-8 max-sm:relative max-sm:top-0 max-sm:right-0 max-sm:mx-auto max-sm:mb-4 max-sm:w-full max-sm:max-w-xs">
        <div className="animate-pulse">
          <div className="h-2.5 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-1 h-2.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    );
  }

  if (!nextDeadline) {
    return null;
  }

  const formattedDate = nextDeadline.dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href="/calendar"
      className="absolute top-4 right-4 z-40 w-48 p-2 bg-white/95 backdrop-blur-sm border border-zinc-200/50 rounded-lg shadow-sm hover:shadow-md hover:border-zinc-300 transition-all dark:bg-zinc-900/95 dark:border-zinc-800/50 dark:hover:border-zinc-700 group sm:right-6 lg:right-8 max-sm:relative max-sm:top-0 max-sm:right-0 max-sm:mx-auto max-sm:mb-4 max-sm:w-full max-sm:max-w-xs"
    >
      {/* Header */}
      <div className="flex items-center gap-1 mb-0.5">
        <Calendar className="h-2.5 w-2.5 text-asu-maroon" />
        <span className="text-[9px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          Upcoming Deadlines
        </span>
      </div>

      {/* Next Deadline */}
      <p className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200 leading-tight">
        <span className="text-asu-maroon">{nextDeadline.name}</span>
        <span className="text-zinc-400 dark:text-zinc-500"> — {formattedDate}</span>
      </p>

      {/* Subtext */}
      <p className="mt-0.5 text-[9px] text-zinc-400 group-hover:text-asu-gold transition-colors">
        Click for full calendar
      </p>
    </Link>
  );
}
