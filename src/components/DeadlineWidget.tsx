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
      <div className="max-w-sm mx-auto p-4 bg-white/80 backdrop-blur border border-zinc-200 rounded-xl shadow-sm text-center mb-6 dark:bg-zinc-900/80 dark:border-zinc-800">
        <div className="animate-pulse">
          <div className="h-4 w-24 mx-auto rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-2 h-4 w-40 mx-auto rounded bg-zinc-200 dark:bg-zinc-700" />
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
      className="block max-w-sm mx-auto p-4 bg-white/80 backdrop-blur border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all text-center mb-6 dark:bg-zinc-900/80 dark:border-zinc-800 group"
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <Calendar className="h-4 w-4 text-asu-maroon" />
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Upcoming Deadlines
        </span>
      </div>

      {/* Next Deadline */}
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        Next: <span className="text-asu-maroon">{nextDeadline.name}</span>
        <span className="text-zinc-500 dark:text-zinc-400"> — {formattedDate}</span>
      </p>

      {/* Subtext */}
      <p className="mt-1 text-xs text-zinc-400 group-hover:text-asu-gold transition-colors">
        Click for full 2026 calendar
      </p>
    </Link>
  );
}
