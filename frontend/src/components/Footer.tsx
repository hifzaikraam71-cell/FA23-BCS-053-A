import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 text-slate-400 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-blue-600/5 blur-[100px] pointer-events-none rounded-full"></div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 shadow-inner border border-white/10">
                A
              </div>
              <div>
                <span className="font-bold text-white tracking-tight">AdFlow Pro</span>
                <p className="text-[10px] text-blue-400 uppercase tracking-widest">Global Market</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              The premier ecosystem for commercial operations, premium listings, and global index aggregation. Designed for speed, styled for impact.
            </p>
          </div>

          {/* Platform Links */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Discovery</h3>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <Link href="/explore" className="hover:text-blue-400 transition-colors inline-block w-max">Active Listings</Link>
              <Link href="/packages" className="hover:text-blue-400 transition-colors inline-block w-max">Seller Tiers</Link>
              <Link href="/categories" className="hover:text-blue-400 transition-colors inline-block w-max">Market Sectors</Link>
              <Link href="/cities" className="hover:text-blue-400 transition-colors inline-block w-max">Global Regions</Link>
            </div>
          </div>

          {/* Support Links */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Resources</h3>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <Link href="/faq" className="hover:text-blue-400 transition-colors inline-block w-max">Knowledge Base</Link>
              <Link href="/contact" className="hover:text-blue-400 transition-colors inline-block w-max">Direct Support</Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors inline-block w-max">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors inline-block w-max">Data Privacy</Link>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Transmission</h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">Join the registry to receive curated drops and platform architecture updates directly.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Secure Email..."
                className="flex-1 rounded-xl bg-slate-900 border border-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
              />
              <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/5 bg-slate-950 px-4 py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">
            &copy; 2026 AdFlow Pro Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-600 hover:text-white transition-colors">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
            </a>
            <a href="#" className="text-slate-600 hover:text-white transition-colors">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
