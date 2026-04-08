import Link from 'next/link';

const categories = [
  { name: 'Electronics', slug: 'electronics', description: 'High-value gadgets, devices, and accessories.' },
  { name: 'Fashion', slug: 'fashion', description: 'Apparel, accessories, and beauty products.' },
  { name: 'Home', slug: 'home', description: 'Furniture, décor, and household essentials.' },
  { name: 'Vehicles', slug: 'vehicles', description: 'Cars, bikes, and automotive services.' },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Browse by category</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">Category listings</h1>
            <p className="mt-3 text-slate-600">Explore active ads organized by category for fast discovery and smarter browsing.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-blue-500">{category.name}</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">{category.name}</h2>
                <p className="mt-4 text-slate-600">{category.description}</p>
                <span className="mt-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  View {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
