export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Privacy policy</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Your data, protected</h1>
          <div className="mt-8 space-y-6 text-slate-600">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">Data collection</h2>
              <p>AdFlow Pro collects only the data needed to operate the marketplace, authenticate users, and manage ad submissions.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">Media handling</h2>
              <p>External media URLs are stored as references only. No local image uploads are required or retained in the frontend.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">Security</h2>
              <p>Authentication tokens are stored locally and transmitted over secure connections. Sensitive user details are protected by backend validations.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">Third-party integrations</h2>
              <p>External links and media are normalized for preview, and broken sources are handled gracefully by the UI.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
