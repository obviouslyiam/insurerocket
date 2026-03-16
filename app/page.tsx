import Link from 'next/link';
import type { Metadata } from 'next';
import FAQSchema from './components/FAQSchema';

export const metadata: Metadata = {
  title: 'InsureRocket - Compare Medicare & Insurance Plans Free',
  description: 'Compare Medicare Advantage, Medicare Supplement, and Part D plans side by side. 200+ expert guides, 256 city Medicare guides, and in-depth carrier reviews. No obligation, completely free.',
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

const pillarGuides = [
  {
    slug: 'what-is-medicare-advantage',
    title: 'What Is Medicare Advantage?',
    description: 'Medicare Advantage plans are an alternative way to get your Medicare coverage through private insurance companies approved by Medicare.',
    category: 'Medicare Advantage',
    categoryColor: 'bg-blue-100 text-blue-800',
  },
  {
    slug: 'medigap-complete-guide',
    title: 'Medicare Supplement (Medigap) Complete Guide 2026',
    description: 'Medigap is standardized — a Plan G from any insurer offers identical benefits. Shop on price, rate history, and financial strength.',
    category: 'Medicare Supplement',
    categoryColor: 'bg-purple-100 text-purple-800',
  },
  {
    slug: 'part-d-complete-guide',
    title: 'Medicare Part D Complete Guide 2026',
    description: 'The 2026 Part D out-of-pocket cap is $2,100 — once your true out-of-pocket spending hits that number, covered drugs drop to $0.',
    category: 'Part D',
    categoryColor: 'bg-green-100 text-green-800',
  },
  {
    slug: 'medicare-costs-complete-guide',
    title: 'How Much Does Medicare Cost? Complete 2026 Breakdown',
    description: 'The standard Part B premium for 2026 is $185/month. Understand every cost component before you choose a plan.',
    category: 'Medicare Costs',
    categoryColor: 'bg-amber-100 text-amber-800',
  },
  {
    slug: 'health-insurance-complete-guide',
    title: 'Health Insurance Guide 2026: Types, Costs & How to Choose',
    description: 'The enhanced ACA subsidies expired at end of 2025 — if your income changed, your premium changed. Here is what to know.',
    category: 'Health Insurance',
    categoryColor: 'bg-teal-100 text-teal-800',
  },
  {
    slug: 'life-insurance-complete-guide',
    title: 'Life Insurance Complete Guide 2026',
    description: 'Most people with employer coverage are underinsured by $800,000-$1.2 million or more. Run the DIME calculation to find your real number.',
    category: 'Life Insurance',
    categoryColor: 'bg-rose-100 text-rose-800',
  },
  {
    slug: 'auto-insurance-complete-guide',
    title: 'Auto Insurance Complete Guide 2026',
    description: 'State minimum coverage is almost never enough. 100/300/100 is the starting recommendation for anyone with assets to protect.',
    category: 'Auto Insurance',
    categoryColor: 'bg-orange-100 text-orange-800',
  },
  {
    slug: 'medicare-advantage-vs-original-medicare',
    title: 'Medicare Advantage vs. Original Medicare: Which Is Better?',
    description: 'Choosing between Medicare Advantage and Original Medicare is one of the most important decisions you will make at 65.',
    category: 'Medicare',
    categoryColor: 'bg-indigo-100 text-indigo-800',
  },
];

const insuranceCategories = [
  { label: 'Medicare Advantage', href: '/medicare-advantage/', icon: '🏥', desc: 'Part C plans from private insurers', count: '25+ guides' },
  { label: 'Medicare Supplement', href: '/medicare-supplement/', icon: '🛡️', desc: 'Medigap Plans A, B, D, G, K, L, M, N', count: '12+ guides' },
  { label: 'Part D Drug Plans', href: '/prescription-drug-plans/', icon: '💊', desc: 'Prescription drug coverage explained', count: '10+ guides' },
  { label: 'Health Insurance', href: '/insurance-guides/?category=health', icon: '❤️', desc: 'ACA, employer, and individual plans', count: '13 guides' },
  { label: 'Life Insurance', href: '/insurance-guides/?category=life', icon: '👨‍👩‍👧', desc: 'Term, whole, and universal life', count: '9 guides' },
  { label: 'Auto Insurance', href: '/insurance-guides/?category=auto', icon: '🚗', desc: 'Liability, collision, comprehensive', count: '11 guides' },
  { label: 'Home Insurance', href: '/insurance-guides/?category=home', icon: '🏠', desc: 'Homeowners and renters coverage', count: '8 guides' },
  { label: 'Dental & Vision', href: '/insurance-guides/?category=dental', icon: '👁️', desc: 'Standalone dental and vision plans', count: '8 guides' },
];

const carrierReviews = [
  {
    name: 'UnitedHealthcare',
    slug: 'unitedhealthcare-medicare-review-2026',
    companySlug: 'unitedhealthcare',
    domain: 'uhc.com',
    rating: '4.0',
    tag: 'Largest Medicare carrier',
    tagColor: 'bg-blue-50 text-blue-700',
  },
  {
    name: 'Humana',
    slug: 'humana-medicare-review-2026',
    companySlug: 'humana',
    domain: 'humana.com',
    rating: '4.1',
    tag: '2nd largest by enrollment',
    tagColor: 'bg-green-50 text-green-700',
  },
  {
    name: 'Aetna',
    slug: 'aetna-medicare-review-2026',
    companySlug: 'aetna',
    domain: 'aetna.com',
    rating: '3.9',
    tag: 'CVS Health integration',
    tagColor: 'bg-purple-50 text-purple-700',
  },
  {
    name: 'Kaiser Permanente',
    slug: 'kaiser-permanente-medicare-review-2026',
    companySlug: 'kaiser-permanente',
    domain: 'kp.org',
    rating: '4.8',
    tag: 'Highest member satisfaction',
    tagColor: 'bg-amber-50 text-amber-700',
  },
  {
    name: 'BCBS',
    slug: 'bcbs-medicare-plans-2026-state-guide',
    companySlug: 'blue-cross-blue-shield',
    domain: 'bcbs.com',
    rating: '4.0',
    tag: 'Nationwide state-based plans',
    tagColor: 'bg-indigo-50 text-indigo-700',
  },
  {
    name: 'Cigna',
    slug: 'cigna',
    companySlug: 'cigna',
    domain: 'cigna.com',
    rating: '3.8',
    tag: 'Strong PPO network',
    tagColor: 'bg-rose-50 text-rose-700',
  },
];

const topCities = [
  { city: 'New York', stateAbbr: 'NY', slug: 'new-york-ny' },
  { city: 'Los Angeles', stateAbbr: 'CA', slug: 'los-angeles-ca' },
  { city: 'Chicago', stateAbbr: 'IL', slug: 'chicago-il' },
  { city: 'Houston', stateAbbr: 'TX', slug: 'houston-tx' },
  { city: 'Phoenix', stateAbbr: 'AZ', slug: 'phoenix-az' },
  { city: 'Philadelphia', stateAbbr: 'PA', slug: 'philadelphia-pa' },
  { city: 'San Antonio', stateAbbr: 'TX', slug: 'san-antonio-tx' },
  { city: 'San Diego', stateAbbr: 'CA', slug: 'san-diego-ca' },
  { city: 'Dallas', stateAbbr: 'TX', slug: 'dallas-tx' },
  { city: 'Austin', stateAbbr: 'TX', slug: 'austin-tx' },
  { city: 'Boston', stateAbbr: 'MA', slug: 'boston-ma' },
  { city: 'Jacksonville', stateAbbr: 'FL', slug: 'jacksonville-fl' },
];

const latestGuides = [
  { slug: 'is-vision-insurance-worth-it', title: 'Is Vision Insurance Worth It in 2026?', category: 'Dental & Vision' },
  { slug: 'farmers-insurance-review-2026', title: 'Farmers Insurance Review 2026', category: 'Carrier Reviews' },
  { slug: 'oscar-health-insurance-review-2026', title: 'Oscar Health Insurance Review 2026', category: 'Carrier Reviews' },
  { slug: 'medicare-advantage-telehealth-benefits', title: 'Medicare Advantage Telehealth Benefits 2026', category: 'Medicare Advantage' },
  { slug: 'medicare-advantage-vision-benefits', title: 'Medicare Advantage Vision Benefits Explained', category: 'Medicare Advantage' },
  { slug: 'medicare-mental-health-coverage-2026', title: 'Medicare Mental Health Coverage 2026', category: 'Medicare' },
  { slug: 'best-auto-insurance-military-families', title: 'Best Auto Insurance for Military Families', category: 'Auto Insurance' },
  { slug: 'disability-insurance-complete-guide', title: 'Disability Insurance Complete Guide 2026', category: 'Life Insurance' },
];

const latestGuideCategoryColors: Record<string, string> = {
  'Dental & Vision': 'bg-teal-100 text-teal-800',
  'Carrier Reviews': 'bg-blue-100 text-blue-800',
  'Medicare Advantage': 'bg-indigo-100 text-indigo-800',
  'Medicare': 'bg-purple-100 text-purple-800',
  'Auto Insurance': 'bg-orange-100 text-orange-800',
  'Life Insurance': 'bg-rose-100 text-rose-800',
};

const comparisons = [
  { slug: 'medicare-advantage-vs-original-medicare-2026', title: 'Medicare Advantage vs. Original Medicare 2026', labelA: 'Medicare Advantage', labelB: 'Original Medicare' },
  { slug: 'medicare-plan-f-vs-plan-g', title: 'Plan F vs. Plan G: Which Medigap Plan Wins?', labelA: 'Plan F', labelB: 'Plan G' },
  { slug: 'medicare-advantage-hmo-vs-ppo', title: 'Medicare Advantage HMO vs. PPO', labelA: 'HMO', labelB: 'PPO' },
  { slug: 'medigap-plan-g-vs-plan-n', title: 'Medigap Plan G vs. Plan N: Full Comparison', labelA: 'Plan G', labelB: 'Plan N' },
  { slug: 'term-vs-whole-life-insurance', title: 'Term Life vs. Whole Life Insurance', labelA: 'Term Life', labelB: 'Whole Life' },
];

export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={homeFaqs} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#14b8a6] inline-block"></span>
              Updated for 2026 Open Enrollment
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find the Right Medicare Plan for You
            </h1>
            <p className="text-lg md:text-xl text-white/75 mb-8 leading-relaxed">
              Compare Medicare Advantage, Supplement, and Part D plans. Expert guides, in-depth carrier reviews, and local coverage data — no obligation, completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/medicare-advantage/"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold rounded-lg transition-colors text-base"
              >
                Compare Medicare Advantage
              </Link>
              <Link
                href="/medicare-supplement/"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20 text-base"
              >
                Explore Medigap Plans
              </Link>
            </div>

            {/* Trust signals row */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white text-lg leading-none">200+</div>
                  <div className="text-white/60 text-xs mt-0.5">Expert Guides</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white text-lg leading-none">256</div>
                  <div className="text-white/60 text-xs mt-0.5">City Medicare Guides</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white text-lg leading-none">20</div>
                  <div className="text-white/60 text-xs mt-0.5">Carrier Reviews</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white text-lg leading-none">100%</div>
                  <div className="text-white/60 text-xs mt-0.5">Free & Unbiased</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Carrier logos bar ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-xs text-muted mb-5 uppercase tracking-widest font-semibold">Top Medicare Insurance Carriers</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            <img src="/carriers/aetna.png" alt="Aetna" className="h-9 opacity-50 hover:opacity-90 transition-opacity grayscale hover:grayscale-0" />
            <img src="/carriers/bluecross.png" alt="Blue Cross Blue Shield" className="h-9 opacity-50 hover:opacity-90 transition-opacity grayscale hover:grayscale-0" />
            <img src="/carriers/cigna.png" alt="Cigna" className="h-9 opacity-50 hover:opacity-90 transition-opacity grayscale hover:grayscale-0" />
            <img src="/carriers/united.png" alt="UnitedHealthcare" className="h-9 opacity-50 hover:opacity-90 transition-opacity grayscale hover:grayscale-0" />
            <img src="/carriers/first.png" alt="First Health" className="h-9 opacity-50 hover:opacity-90 transition-opacity grayscale hover:grayscale-0" />
            <img src="/carriers/tricare.png" alt="TRICARE" className="h-9 opacity-50 hover:opacity-90 transition-opacity grayscale hover:grayscale-0" />
          </div>
        </div>
      </section>

      {/* ── Featured Guides ───────────────────────────────────────────── */}
      <section className="bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Insurance Guides</h2>
              <p className="text-muted max-w-xl">In-depth, expert-written guides to help you make the right coverage decisions.</p>
            </div>
            <Link href="/insurance-guides/" className="hidden md:inline-flex items-center gap-1 text-accent font-semibold text-sm hover:text-accent-dark transition-colors shrink-0 ml-4">
              All 200 Guides <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillarGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                className="bg-white border border-border rounded-xl p-5 hover:shadow-lg hover:border-[#14b8a6]/40 transition-all group flex flex-col"
              >
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 w-fit ${guide.categoryColor}`}>
                  {guide.category}
                </span>
                <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-[#14b8a6] transition-colors leading-snug flex-1">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{guide.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-7 md:hidden">
            <Link href="/insurance-guides/" className="text-accent font-semibold text-sm hover:text-accent-dark transition-colors">
              View All 200 Guides &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Browse by Insurance Type ──────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-3">Browse by Insurance Type</h2>
          <p className="text-center text-muted mb-10 max-w-xl mx-auto">Every major insurance category, covered in depth.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {insuranceCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group bg-light border border-border rounded-xl p-5 hover:bg-gradient-to-br hover:from-[#1a1a2e] hover:to-[#16213e] hover:border-[#1a1a2e] transition-all"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="font-bold text-foreground text-sm mb-1 group-hover:text-white transition-colors">{cat.label}</div>
                <div className="text-xs text-muted group-hover:text-white/60 transition-colors mb-2">{cat.desc}</div>
                <div className="text-xs font-semibold text-[#14b8a6]">{cat.count}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Carrier Reviews ───────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Medicare Carrier Reviews</h2>
              <p className="text-white/60 max-w-xl">Unbiased, data-driven reviews of the top Medicare insurance companies.</p>
            </div>
            <Link href="/insurance-companies/" className="hidden md:inline-flex items-center gap-1 text-[#14b8a6] font-semibold text-sm hover:text-[#0d9488] transition-colors shrink-0 ml-4">
              All 20 Companies <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {carrierReviews.map((carrier) => (
              <div key={carrier.slug} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${carrier.domain}&sz=32`}
                    alt={carrier.name}
                    className="w-8 h-8 rounded"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-bold text-white text-sm">{carrier.name}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1,2,3,4,5].map((star) => (
                        <svg
                          key={star}
                          className={`w-3 h-3 ${parseFloat(carrier.rating) >= star ? 'text-amber-400' : parseFloat(carrier.rating) >= star - 0.5 ? 'text-amber-400/60' : 'text-white/20'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-white/50 text-xs ml-1">{carrier.rating} stars</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4 ${carrier.tagColor}`}>
                  {carrier.tag}
                </span>
                <div className="flex gap-2">
                  <Link
                    href={`/reviews/${carrier.slug}/`}
                    className="flex-1 text-center text-xs font-semibold bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-lg py-2 transition-colors"
                  >
                    Read Review
                  </Link>
                  <Link
                    href={`/insurance-companies/${carrier.companySlug}/`}
                    className="flex-1 text-center text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg py-2 transition-colors"
                  >
                    Company Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-7 md:hidden">
            <Link href="/insurance-companies/" className="text-[#14b8a6] font-semibold text-sm hover:text-[#0d9488] transition-colors">
              View All 20 Companies &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── City Guide Finder ─────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">Find Medicare Plans in Your City</h2>
            <p className="text-muted">Local Medicare Advantage plan counts, top carriers, and average premiums — city by city.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/medicare-plans/${city.slug}/`}
                className="inline-flex items-center gap-2 bg-light border border-border rounded-full px-5 py-2.5 text-sm font-medium text-foreground hover:bg-gradient-to-r hover:from-[#1a1a2e] hover:to-[#16213e] hover:text-white hover:border-[#1a1a2e] transition-all group"
              >
                <svg className="w-3.5 h-3.5 text-[#14b8a6]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {city.city}, {city.stateAbbr}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/medicare-plans/" className="text-accent font-semibold text-sm hover:text-accent-dark transition-colors">
              View All 256 City Guides &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Find by state ─────────────────────────────────────────────── */}
      <section className="bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-3">Medicare Plans by State</h2>
          <p className="text-center text-muted mb-10 max-w-2xl mx-auto">Find Medicare Advantage and Supplement plan information specific to your state.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularStates.map((state) => (
              <Link
                key={state.slug}
                href={`/medicare-advantage/${state.slug}/`}
                className="bg-white border border-border rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] transition-colors"
              >
                {state.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/medicare-advantage/" className="text-accent font-semibold text-sm hover:text-accent-dark transition-colors">
              View All 50 States &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest Guides ─────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Latest Guides</h2>
              <p className="text-muted">New coverage analysis and how-to guides, updated for 2026.</p>
            </div>
            <Link href="/insurance-guides/" className="hidden md:inline-flex items-center gap-1 text-accent font-semibold text-sm hover:text-accent-dark transition-colors shrink-0 ml-4">
              Browse All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                className="group border border-border rounded-xl p-5 hover:shadow-md hover:border-[#14b8a6]/30 transition-all"
              >
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 w-fit ${latestGuideCategoryColors[guide.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  {guide.category}
                </span>
                <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-[#14b8a6] transition-colors">
                  {guide.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparisons ───────────────────────────────────────────────── */}
      <section className="bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">Head-to-Head Comparisons</h2>
            <p className="text-muted max-w-xl mx-auto">Side-by-side breakdowns of the most common Medicare and insurance decisions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {comparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/guides/${comp.slug}/`}
                className="group bg-white border border-border rounded-xl p-5 hover:shadow-md hover:border-[#14b8a6]/40 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-[#1a1a2e] text-white px-2.5 py-1 rounded-full">{comp.labelA}</span>
                  <span className="text-muted text-xs font-semibold">vs</span>
                  <span className="text-xs font-bold bg-[#0f3460] text-white px-2.5 py-1 rounded-full">{comp.labelB}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-[#14b8a6] transition-colors leading-snug">
                  {comp.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage types ────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Explore Your Medicare Options</h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto">Understanding the different types of Medicare coverage helps you make an informed decision about your healthcare.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-light rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#14b8a6]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Medicare Advantage</h3>
              <p className="text-muted text-sm mb-4">All-in-one plans from private insurers that combine Part A, Part B, and usually Part D. Often include dental, vision, and hearing benefits.</p>
              <Link href="/medicare-advantage/" className="text-[#14b8a6] font-semibold text-sm hover:text-[#0d9488] transition-colors">
                Explore by State &rarr;
              </Link>
            </div>
            <div className="bg-light rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-trust/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-trust" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Medicare Supplement</h3>
              <p className="text-muted text-sm mb-4">Medigap policies that help pay for costs Original Medicare does not cover, like copayments, coinsurance, and deductibles.</p>
              <Link href="/medicare-supplement/" className="text-trust font-semibold text-sm hover:text-trust-light transition-colors">
                Explore by State &rarr;
              </Link>
            </div>
            <div className="bg-light rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Part D Drug Plans</h3>
              <p className="text-muted text-sm mb-4">Stand-alone prescription drug plans that work with Original Medicare to cover your medication costs with a $2,100 out-of-pocket cap in 2026.</p>
              <Link href="/prescription-drug-plans/" className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors">
                Learn More &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
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

      {/* ── Disclaimer ────────────────────────────────────────────────── */}
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
