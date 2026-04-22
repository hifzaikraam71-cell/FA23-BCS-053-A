import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                A
              </div>
              <span className="font-bold text-white">AdFlow Pro</span>
            </div>
            <p className="text-sm leading-6 text-slate-400">
              Premium marketplace platform for sponsored listings with intelligent moderation, flexible packages, and powerful analytics.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/explore" className="text-slate-400 hover:text-white transition-colors">Explore Listings</Link>
              <Link href="/packages" className="text-slate-400 hover:text-white transition-colors">Packages</Link>
              <Link href="/categories" className="text-slate-400 hover:text-white transition-colors">Categories</Link>
              <Link href="/cities" className="text-slate-400 hover:text-white transition-colors">Cities</Link>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/faq" className="text-slate-400 hover:text-white transition-colors">FAQ</Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Us</Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-4">Subscribe to get news about new features and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg bg-slate-700/50 border border-slate-600 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:shadow-md transition-shadow">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700 bg-slate-950/50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; 2026 AdFlow Pro. All rights reserved. | Made with ❤️ by AdFlow Team
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <span>𝕏</span>
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <span>f</span>
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <span>in</span>
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <span>gh</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
