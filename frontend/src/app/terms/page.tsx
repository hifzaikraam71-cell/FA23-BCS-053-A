export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Terms of service</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Terms & conditions</h1>
          <div className="mt-8 space-y-6 text-slate-600">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">Usage rules</h2>
              <p>AdFlow Pro is a moderated ads marketplace. All submissions must comply with platform policies and applicable laws.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">Payment verification</h2>
              <p>Payment proof must be submitted with accurate transaction details. Admin verification is required before publication.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">Content moderation</h2>
              <p>Moderators review ads for quality and policy fit. Rejected or flagged content may be removed from the platform.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">Privacy and data</h2>
              <p>User data is handled following the platform privacy policy. User accounts, ads, and payment records are maintained for audit purposes.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
