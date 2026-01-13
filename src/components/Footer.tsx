import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © 2026 Sun Devil Guide. Made by{' '}
          <span className="font-medium text-asu-maroon">Sun Devils</span>, for{' '}
          <span className="font-medium text-asu-gold">Sun Devils</span>.
        </p>
        <Link
          href="/admin"
          className="text-sm text-zinc-400 transition-colors hover:text-asu-maroon dark:text-zinc-500 dark:hover:text-asu-gold"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}
