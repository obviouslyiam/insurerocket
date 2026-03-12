import Link from 'next/link';
import type { Metadata } from 'next';
import FAQSchema from './components/FAQSchema';

export const metadata: Metadata = {
  title: 'InsureRocket - Compare Medicare & Insurance Plans Free',
  description: 'Compare Medicare Advantage, Medicare Supplement, and Part D plans side by side. Find the best Medicare coverage for your needs. No obligation, completely free.',
};

const homeFaqs = [
  { question: 'What is Medicare Advantage?', answer: 'Medicare Advantage (Part C) plans are offered by private insurance companies approved by Medicare. They bundle Part A, Part B, and usually Part D benefits into one plan, often with extra benefits like dental, vision, and hearing coverage.' },
  { question: 'When can I enroll in Medicare?', answer: 'Your Initial Enrollment Period begins 3 months before the month you turn 65 and lasts 7 months. You can also make changes during the Annual Enrollment Period (October 15 - December 7) each year.' },
  { question: 'What is a Medigap (Medicare Supplement) plan?', answer: 'Medigap plans are sold by private insurance companies to help cover costs that Original Medicare does not pay, such as copayments, coinsurance, and deductibles. They work alongside Original Medicare Parts A and B.' },
  { question: 'How much does Medicare cost?', answer: 'The standard Part B premium is $185/month in 2026. Medicare Advantage plans often have $0 additional premiums. Medigap premiums vary from $80-$350/month depending on plan type, location, and age.' },
];

const popularStates = [
  { name: 'Florida', slug: 'florida' },
  { name: 'California', slug: 'california' },
  { name: 'Texas', slug: 'texas' },
  { name: 'New York', slug: 'new-york' },
  { name: 'Pennsylvania', slug: 'pennsylvania' },
  { name: 'Ohio', slug: 'ohio' },
  { name: 'Illinois', slug: 'illinois' },
  { name: 'Michigan', slug: 'michigan' },
  { name: 'Arizona', slug: 'arizona' },
  { name: 'Georgia', slug: 'georgia' },
  { name: 'North Carolina', slug: 'north-carolina' },
  { name: 'New Jersey', slug: 'new-jersey' },
];

export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={homeFaqs} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Find the Right Medicare Plan for You</h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">Compare Medicare Advantage, Medicare Supplement, and Part D prescription drug plans. No obligation. Completely free.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/medicare-advantage/" className="inline-flex items-center justify-center px-8 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors">
                Compare Medicare Advantage
              </Link>
              <Link href="/medicare-supplement/" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20">
                Compare Supplement Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-light border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Compare Plans Free
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              No Obligation
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Unbiased Information
            </div>
          </div>
        </div>
      </section>

      {/* Carrier logos */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-sm text-muted mb-6 uppercase tracking-wider font-medium">Top Medicare Insurance Carriers</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <img src="/carriers/aetna.png" alt="Aetna" className="h-10 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="/carriers/bluecross.png" alt="Blue Cross Blue Shield" className="h-10 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="/carriers/cigna.png" alt="Cigna" className="h-10 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="/carriers/united.png" alt="UnitedHealthcare" className="h-10 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="/carriers/first.png" alt="First Health" className="h-10 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="/carriers/tricare.png" alt="TRICARE" className="h-10 opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Coverage types */}
      <section className="bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Explore Your Medicare Options</h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto">Understanding the different types of Medicare coverage helps you make an informed decision about your healthcare.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Medicare Advantage</h3>
              <p className="text-muted text-sm mb-4">All-in-one plans from private insurers that combine Part A, Part B, and usually Part D. Often include dental, vision, and hearing benefits.</p>
              <Link href="/medicare-advantage/" className="text-accent font-semibold text-sm hover:text-accent-dark transition-colors">Explore by State &rarr;</Link>
            </div>
            <div className="bg-white rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-trust/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-trust" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Medicare Supplement</h3>
              <p className="text-muted text-sm mb-4">Medigap policies that help pay for costs Original Medicare does not cover, like copayments, coinsurance, and deductibles.</p>
              <Link href="/medicare-supplement/" className="text-trust font-semibold text-sm hover:text-trust-light transition-colors">Explore by State &rarr;</Link>
            </div>
            <div className="bg-white rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Part D Drug Plans</h3>
              <p className="text-muted text-sm mb-4">Stand-alone prescription drug plans that work with Original Medicare to cover your medication costs with capped out-of-pocket spending.</p>
              <Link href="/prescription-drug-plans/" className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors">Learn More &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Find by state */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Medicare Plans by State</h2>
          <p className="text-center text-muted mb-10 max-w-2xl mx-auto">Find Medicare Advantage and Supplement plan information specific to your state.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularStates.map((state) => (
              <Link
                key={state.slug}
                href={`/medicare-advantage/${state.slug}/`}
                className="bg-light border border-border rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors"
              >
                {state.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/medicare-advantage/" className="text-accent font-semibold text-sm hover:text-accent-dark transition-colors">View All 50 States &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Guides preview */}
      <section className="bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Medicare Education Center</h2>
          <p className="text-center text-muted mb-10 max-w-2xl mx-auto">Free guides to help you understand Medicare and make confident coverage decisions.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'What Is Medicare Advantage?', slug: 'what-is-medicare-advantage', desc: 'Everything you need to know about Part C plans.' },
              { title: 'Medicare Advantage vs. Original Medicare', slug: 'medicare-advantage-vs-original-medicare', desc: 'A side-by-side comparison of your two main options.' },
              { title: 'When to Enroll in Medicare', slug: 'when-to-enroll-in-medicare', desc: 'Enrollment periods, deadlines, and how to avoid penalties.' },
              { title: 'How to Choose a Medicare Plan', slug: 'how-to-choose-a-medicare-plan', desc: 'A step-by-step guide to finding the right plan.' },
              { title: 'Medicare Costs Explained', slug: 'medicare-costs-and-premiums-explained', desc: 'Understand premiums, deductibles, and out-of-pocket costs.' },
              { title: 'Plan F vs. Plan G', slug: 'medicare-plan-f-vs-plan-g', desc: 'Which Medigap plan offers the best value?' },
            ].map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}/`} className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-shadow group">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{guide.title}</h3>
                <p className="text-sm text-muted">{guide.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/insurance-guides/" className="text-accent font-semibold text-sm hover:text-accent-dark transition-colors">View All Guides &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Company reviews */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Insurance Company Reviews</h2>
          <p className="text-center text-muted mb-10 max-w-2xl mx-auto">In-depth reviews of the top Medicare insurance carriers to help you compare your options.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: 'UnitedHealthcare', slug: 'unitedhealthcare' },
              { name: 'Humana', slug: 'humana' },
              { name: 'Aetna', slug: 'aetna' },
              { name: 'Cigna', slug: 'cigna' },
              { name: 'BCBS', slug: 'blue-cross-blue-shield' },
              { name: 'Kaiser Permanente', slug: 'kaiser-permanente' },
              { name: 'WellCare', slug: 'wellcare' },
              { name: 'Mutual of Omaha', slug: 'mutual-of-omaha' },
              { name: 'Devoted Health', slug: 'devoted-health' },
              { name: 'SCAN Health', slug: 'scan-health' },
            ].map((co) => (
              <Link key={co.slug} href={`/insurance-companies/${co.slug}/`} className="border border-border rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
                {co.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {homeFaqs.map((faq, i) => (
              <div key={i} className="bg-white border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-muted text-center leading-relaxed">
            Plan availability, benefits, and premiums vary by location. Contact Medicare.gov or 1-800-MEDICARE for complete information. We do not offer every plan available in your area.
          </p>
        </div>
      </section>
    </>
  );
}
