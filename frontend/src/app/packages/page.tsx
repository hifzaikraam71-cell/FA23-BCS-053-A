export default function Packages() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200 mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Packages</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Choose the right package for your listing</h1>
          <p className="mt-3 text-slate-600">Select the package that controls duration, visibility, and featured placement for your sponsored ad.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Basic</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">7-day listing</h2>
            <p className="mt-4 text-slate-600">A simple starter package with standard exposure for new listings.</p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• 7 days active duration</li>
              <li>• Standard placement</li>
              <li>• Basic support</li>
            </ul>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-3xl font-semibold text-blue-700">$10</span>
              <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 ring-1 ring-blue-200 hover:bg-blue-50">Select</button>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-blue-200 bg-blue-50 p-8 shadow-lg">
            <p className="text-sm uppercase tracking-[0.24em] text-blue-700">Standard</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">15-day priority</h2>
            <p className="mt-4 text-slate-600">A balanced option with category priority and manual refresh support.</p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• 15 days active duration</li>
              <li>• Category priority</li>
              <li>• Email support</li>
            </ul>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-3xl font-semibold text-blue-700">$25</span>
              <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Select</button>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Premium</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">30-day featured</h2>
            <p className="mt-4 text-slate-600">A premium package designed for maximum homepage exposure and auto-refresh behavior.</p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• 30 days active duration</li>
              <li>• Homepage featured placement</li>
              <li>• Auto refresh every 3 days</li>
            </ul>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-3xl font-semibold text-blue-700">$50</span>
              <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 ring-1 ring-blue-200 hover:bg-blue-50">Select</button>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900">Package benefits</h2>
          <p className="mt-4 text-slate-600">Higher-tier packages increase ranking, featured placement, and visibility on the marketplace.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Basic</p>
              <p className="mt-3 text-slate-600">Good for standard listings that need regular exposure.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Standard</p>
              <p className="mt-3 text-slate-600">Best for balanced visibility and category priority.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Premium</p>
              <p className="mt-3 text-slate-600">Ideal for top listings with homepage and featured placement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
