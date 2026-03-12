import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '../components/Breadcrumbs';
import Disclaimer from '../components/Disclaimer';
import FAQSchema from '../components/FAQSchema';
import states from '../../data/states.json';

export const metadata: Metadata = {
  title: 'Medicare Supplement (Medigap) Plans by State - Compare Plans',
  description: 'Compare Medicare Supplement (Medigap) plans in all 50 states. Find Plan F, G, and N details, average premiums, top carriers, and enrollment information.',
};

const faqs = [
  { question: 'What is a Medicare Supplement (Medigap) plan?', answer: 'Medigap plans are sold by private insurance companies to help cover costs that Original Medicare does not pay, including copayments, coinsurance, and deductibles. They work alongside Original Medicare Parts A and B.' },
  { question: 'What is the best Medigap plan?', answer: 'Medigap Plan G is the most popular choice for new enrollees because it offers the most comprehensive coverage available (covering everything except the annual Part B deductible of $257 in 2026). Plan N is a popular lower-cost alternative.' },
  { question: 'Can I buy a Medigap plan at any time?', answer: 'The best time to buy is during your Medigap Open Enrollment Period — a 6-month window starting when you turn 65 and enroll in Part B. During this period, insurers cannot deny you or charge more for health conditions. Outside this window, medical underwriting may apply.' },
  { question: 'Do Medigap plans cover prescriptions?', answer: 'No. Medigap plans do not cover prescription drugs. You need a separate Part D prescription drug plan for medication coverage if you have Original Medicare with a Medigap supplement.' },
];

export default function MedicareSupplementPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Medicare Supplement' }]} />

        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Medicare Supplement (Medigap) Plans by State</h1>
          <p className="text-lg text-muted">Compare Medigap plans available in your state. Find plan types, average premiums, top carriers, and enrollment information to supplement your Original Medicare coverage.</p>
        </div>

        {/* Plan comparison */}
        <div className="bg-light border border-border rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Medigap Plan Comparison</h2>
          <p className="text-muted mb-6">Medigap plans are standardized by the federal government. Each plan letter offers the same benefits regardless of the insurer, but premiums vary. Here are the most popular options:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-foreground">Plan G</h3>
                <span className="text-xs bg-accent text-white px-2 py-1 rounded-full font-semibold">Most Popular</span>
              </div>
              <p className="text-sm text-muted mb-4">Most comprehensive plan for new enrollees. Covers all Medicare cost-sharing except the Part B deductible ($257/year).</p>
              <p className="text-sm font-medium text-foreground">Avg. Premium: $100-$300/mo</p>
            </div>
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-3">Plan N</h3>
              <p className="text-sm text-muted mb-4">Lower-cost alternative covering most cost-sharing. Small copays for office visits ($20) and ER visits ($50) that do not result in admission.</p>
              <p className="text-sm font-medium text-foreground">Avg. Premium: $80-$220/mo</p>
            </div>
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-foreground">Plan F</h3>
                <span className="text-xs bg-muted text-white px-2 py-1 rounded-full font-semibold">Pre-2020 Only</span>
              </div>
              <p className="text-sm text-muted mb-4">Covers 100% of cost-sharing including Part B deductible. Only available to those eligible before 1/1/2020.</p>
              <p className="text-sm font-medium text-foreground">Avg. Premium: $120-$350/mo</p>
            </div>
          </div>
        </div>

        {/* State grid */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Select Your State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/medicare-supplement/${state.slug}/`}
              className="bg-white border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-trust hover:text-white hover:border-trust transition-colors"
            >
              {state.name}
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <Disclaimer />
      </div>
    </>
  );
}
