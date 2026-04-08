export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Get in touch</h1>
          <p className="mt-3 text-slate-600">Need support or want to discuss a sponsored listing? Reach out to our operations team.</p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Support</p>
              <p className="mt-4 text-slate-700">support@adflowpro.com</p>
              <p className="mt-2 text-slate-500">Response within 24 hours on business days.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Sales</p>
              <p className="mt-4 text-slate-700">sales@adflowpro.com</p>
              <p className="mt-2 text-slate-500">Request package details or enterprise solutions.</p>
            </div>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Send a message</h2>
            <form className="mt-6 grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Your name" className="rounded-3xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <input type="email" placeholder="Email address" className="rounded-3xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <input type="text" placeholder="Subject" className="sm:col-span-2 rounded-3xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <textarea rows={5} placeholder="Message" className="sm:col-span-2 rounded-3xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <button type="submit" className="sm:col-span-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">Send message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
