'use client';

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

type DeadlineType = 'info' | 'warning' | 'urgent' | 'critical' | 'fun';

function getSemester(date: Date): 'spring' | 'summer' | 'fall' {
  const month = date.getMonth();
  if (month >= 0 && month <= 4) return 'spring';
  if (month >= 4 && month <= 7) return 'summer';
  return 'fall';
}

function getNextDeadline() {
  const now = new Date();
  const upcoming = DEADLINES
    .map((d) => ({ ...d, dateObj: new Date(d.date) }))
    .filter((d) => d.dateObj > now)
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
  return upcoming[0] || null;
}

function getGroupedDeadlines() {
  const now = new Date();
  const nextDeadline = getNextDeadline();

  const deadlinesWithMeta = DEADLINES.map((d) => {
    const dateObj = new Date(d.date);
    return {
      ...d,
      dateObj,
      isPast: dateObj < now,
      isNext: nextDeadline ? d.date === nextDeadline.date : false,
      semester: getSemester(dateObj),
    };
  });

  return {
    spring: deadlinesWithMeta.filter((d) => d.semester === 'spring'),
    summer: deadlinesWithMeta.filter((d) => d.semester === 'summer'),
    fall: deadlinesWithMeta.filter((d) => d.semester === 'fall'),
  };
}

const typeColors: Record<DeadlineType, string> = {
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
  urgent: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  critical: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  fun: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
};

export default function CalendarPage() {
  const grouped = getGroupedDeadlines();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-asu-maroon">
          <Calendar className="h-8 w-8 text-asu-gold" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          ASU Academic Calendar 2026
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Important dates and deadlines for the academic year
        </p>
      </div>

      {/* Spring Section */}
      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          🌸 Spring 2026
        </h2>
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
          {grouped.spring.map((deadline, index) => (
            <div
              key={deadline.date}
              className={`flex items-center gap-4 px-4 py-3 ${
                index !== grouped.spring.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''
              } ${
                deadline.isNext
                  ? 'bg-yellow-50 dark:bg-yellow-900/20'
                  : deadline.isPast
                  ? 'opacity-50'
                  : ''
              }`}
            >
              <span className={`shrink-0 w-16 text-sm font-medium text-zinc-500 dark:text-zinc-400 ${deadline.isPast ? 'line-through' : ''}`}>
                {deadline.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className={`flex-1 text-sm text-zinc-900 dark:text-zinc-100 ${deadline.isPast ? 'line-through' : ''}`}>
                {deadline.name}
              </span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[deadline.type as DeadlineType]}`}>
                {deadline.type}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Summer Section */}
      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          ☀️ Summer 2026
        </h2>
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
          {grouped.summer.map((deadline, index) => (
            <div
              key={deadline.date}
              className={`flex items-center gap-4 px-4 py-3 ${
                index !== grouped.summer.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''
              } ${
                deadline.isNext
                  ? 'bg-yellow-50 dark:bg-yellow-900/20'
                  : deadline.isPast
                  ? 'opacity-50'
                  : ''
              }`}
            >
              <span className={`shrink-0 w-16 text-sm font-medium text-zinc-500 dark:text-zinc-400 ${deadline.isPast ? 'line-through' : ''}`}>
                {deadline.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className={`flex-1 text-sm text-zinc-900 dark:text-zinc-100 ${deadline.isPast ? 'line-through' : ''}`}>
                {deadline.name}
              </span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[deadline.type as DeadlineType]}`}>
                {deadline.type}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Fall Section */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          🍂 Fall 2026
        </h2>
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
          {grouped.fall.map((deadline, index) => (
            <div
              key={deadline.date}
              className={`flex items-center gap-4 px-4 py-3 ${
                index !== grouped.fall.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''
              } ${
                deadline.isNext
                  ? 'bg-yellow-50 dark:bg-yellow-900/20'
                  : deadline.isPast
                  ? 'opacity-50'
                  : ''
              }`}
            >
              <span className={`shrink-0 w-16 text-sm font-medium text-zinc-500 dark:text-zinc-400 ${deadline.isPast ? 'line-through' : ''}`}>
                {deadline.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className={`flex-1 text-sm text-zinc-900 dark:text-zinc-100 ${deadline.isPast ? 'line-through' : ''}`}>
                {deadline.name}
              </span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[deadline.type as DeadlineType]}`}>
                {deadline.type}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
