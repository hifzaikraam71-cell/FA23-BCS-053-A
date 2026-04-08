export default function FAQ() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Frequently Asked Questions</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Platform guidance and workflows</h1>
          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">How do I submit an ad?</h2>
              <p className="mt-3 text-slate-600">Create a client account, open your dashboard, start a new listing draft, select a package, and submit payment details for review.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">What happens after I submit payment proof?</h2>
              <p className="mt-3 text-slate-600">Admins verify the payment record, approve the package, and schedule the ad for publication once all validation checks pass.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">How are ads moderated?</h2>
              <p className="mt-3 text-slate-600">Moderators review each listing for policy compliance and quality before the admin verifies payment and publishes the ad.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-slate-900">Can I update my listing after approval?</h2>
              <p className="mt-3 text-slate-600">Draft edits are allowed, but significant changes to approved ads may require re-review from moderators and admins.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
