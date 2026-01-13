import Link from 'next/link';

export default function VersionBadge() {
  return (
    <Link
      href="/admin"
      className="text-[10px] font-mono text-zinc-300 transition-colors hover:text-zinc-500 cursor-pointer dark:text-zinc-600 dark:hover:text-zinc-400"
    >
      v{process.env.NEXT_PUBLIC_APP_VERSION}
    </Link>
  );
}
