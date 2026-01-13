import Image from 'next/image';

interface ComingSoonProps {
  message?: string;
}

export default function ComingSoon({ message = 'STAY TUNED: SUN DEVIL DEALS DROPPING SOON' }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-asu-maroon bg-gradient-to-br from-gold-100 to-gold-200 p-12 text-center shadow-lg">
      <Image
        src="/asu_trident.svg"
        alt="ASU Trident"
        width={80}
        height={96}
        className="mb-6 drop-shadow-lg"
      />
      <h3 className="text-xl font-bold uppercase tracking-wider text-asu-maroon sm:text-2xl">
        {message}
      </h3>
      <p className="mt-2 text-sm text-maroon-700">
        Check back soon for updates!
      </p>
    </div>
  );
}
