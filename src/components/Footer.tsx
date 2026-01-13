import VersionBadge from './VersionBadge';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 sm:px-6 lg:px-8">
        <p className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span>
            © 2026 Sun Devil Guide. Made by{' '}
            <span className="font-medium text-asu-maroon">Sun Devils</span>, for{' '}
            <span className="font-medium text-asu-gold">Sun Devils</span>.
          </span>
          <span className="text-zinc-300 dark:text-zinc-600">•</span>
          <VersionBadge />
        </p>
      </div>
    </footer>
  );
}
