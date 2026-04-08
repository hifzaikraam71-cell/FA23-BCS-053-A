import Link from 'next/link';

const cities = [
  { name: 'Karachi', slug: 'karachi', description: 'High-demand listings across the largest metro.' },
  { name: 'Lahore', slug: 'lahore', description: 'Regional ads and trusted local sellers.' },
  { name: 'Islamabad', slug: 'islamabad', description: 'Premium listings from capital city vendors.' },
  { name: 'Multan', slug: 'multan', description: 'Fast-moving offers and services in the south.' },
];

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Browse by city</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">City-based marketplace</h1>
            <p className="mt-3 text-slate-600">Filter sponsored listings by local markets and nearby service areas.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="group rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-blue-500">{city.name}</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">{city.name}</h2>
                <p className="mt-4 text-slate-600">{city.description}</p>
                <span className="mt-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  Explore {city.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
