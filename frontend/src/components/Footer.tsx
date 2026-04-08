import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">AdFlow Pro</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">A production-style sponsored listing marketplace with moderation, payment workflows, and analytics.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/explore" className="hover:text-white">Explore</Link>
          <Link href="/packages" className="hover:text-white">Packages</Link>
          <Link href="/categories" className="hover:text-white">Categories</Link>
          <Link href="/cities" className="hover:text-white">Cities</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
        </div>
      </div>
      <div className="border-t border-slate-800 bg-slate-900 px-4 py-5 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        &copy; 2026 AdFlow Pro. All rights reserved.
      </div>
    </footer>
  );
}
