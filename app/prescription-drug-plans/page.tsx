import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '../components/Breadcrumbs';
import Disclaimer from '../components/Disclaimer';
import FAQSchema from '../components/FAQSchema';

export const metadata: Metadata = {
  title: 'Medicare Part D Prescription Drug Plans - Compare Plans 2026',
  description: 'Compare Medicare Part D prescription drug plans. Understand coverage phases, formularies, costs, and the $2,000 annual out-of-pocket cap. Find the best Part D plan.',
};

const faqs = [
  { question: 'What is Medicare Part D?', answer: 'Medicare Part D is the prescription drug benefit program. Coverage is available through stand-alone Prescription Drug Plans (PDPs) that supplement Original Medicare, or through Medicare Advantage plans that include drug coverage (MA-PDs).' },
  { question: 'How much does Part D cost?', answer: 'Part D premiums average about $40/month in 2026, ranging from $7 to over $100. The maximum deductible is $590. Thanks to the Inflation Reduction Act, annual out-of-pocket drug costs are capped at $2,000.' },
  { question: 'Do I need Part D if I have Medicare Advantage?', answer: 'Most Medicare Advantage plans include Part D prescription drug coverage. If your MA plan includes Part D, you do not need a separate stand-alone Part D plan. Check your MA plan details to confirm drug coverage is included.' },
  { question: 'What happens if I do not sign up for Part D?', answer: 'If you do not enroll in Part D when first eligible and do not have other creditable drug coverage, you will pay a permanent late enrollment penalty of 1% of the national base premium per month you were without coverage.' },
];

export default function PrescriptionDrugPlansPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Prescription Drug Plans' }]} />

        <h1 className="text-4xl font-bold text-foreground mb-4">Medicare Part D Prescription Drug Plans</h1>
        <p className="text-lg text-muted mb-8">Understand how Medicare Part D works, compare plan options, and find the best prescription drug coverage for your medications in 2026.</p>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-accent">$2,000</p>
            <p className="text-xs text-muted">Annual OOP Cap</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-trust">$590</p>
            <p className="text-xs text-muted">Max Deductible</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">~$40</p>
            <p className="text-xs text-muted">Avg Premium/mo</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-foreground">$35</p>
            <p className="text-xs text-muted">Max Insulin Cost/mo</p>
          </div>
        </div>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">How Medicare Part D Works</h2>
          <p className="text-muted mb-4">Medicare Part D provides prescription drug coverage through private insurance plans approved by Medicare. You can get Part D coverage either through a stand-alone Prescription Drug Plan (PDP) that works alongside Original Medicare, or through a Medicare Advantage plan that includes drug coverage (MA-PD).</p>
          <p className="text-muted">Part D is voluntary but strongly recommended. If you do not enroll when first eligible and lack other creditable drug coverage, you will face a permanent late enrollment penalty that increases your premiums for life.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">2026 Part D Coverage Phases</h2>
          <div className="space-y-4">
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">1. Deductible Phase</h3>
              <p className="text-sm text-muted">You pay the full cost of drugs until you meet the annual deductible (up to $590 in 2026). Many plans have $0 deductibles for generic drugs or waive the deductible entirely.</p>
            </div>
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">2. Initial Coverage Phase</h3>
              <p className="text-sm text-muted">After the deductible, you pay copays or coinsurance for prescriptions. Costs vary by drug tier: generics are cheapest (Tier 1-2), brand-name drugs cost more (Tier 3-4), and specialty drugs are most expensive (Tier 5).</p>
            </div>
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">3. Out-of-Pocket Cap ($2,000)</h3>
              <p className="text-sm text-muted">Thanks to the Inflation Reduction Act, total out-of-pocket Part D spending is capped at $2,000 per year. This eliminates the old coverage gap (donut hole) and provides significant cost protection.</p>
            </div>
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">4. Catastrophic Coverage</h3>
              <p className="text-sm text-muted">Once you reach the $2,000 out-of-pocket cap, you pay nothing for covered Part D drugs for the remainder of the calendar year.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Understanding Drug Formularies and Tiers</h2>
          <p className="text-muted mb-4">Each Part D plan has a formulary — a list of covered drugs organized into tiers. Lower tiers have lower costs:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-light">
                  <th className="border border-border px-4 py-3 text-left text-sm font-semibold">Tier</th>
                  <th className="border border-border px-4 py-3 text-left text-sm font-semibold">Drug Type</th>
                  <th className="border border-border px-4 py-3 text-left text-sm font-semibold">Typical Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-border px-4 py-2 text-sm">Tier 1</td><td className="border border-border px-4 py-2 text-sm">Preferred generics</td><td className="border border-border px-4 py-2 text-sm">$0 - $15</td></tr>
                <tr className="bg-light/50"><td className="border border-border px-4 py-2 text-sm">Tier 2</td><td className="border border-border px-4 py-2 text-sm">Generics</td><td className="border border-border px-4 py-2 text-sm">$5 - $20</td></tr>
                <tr><td className="border border-border px-4 py-2 text-sm">Tier 3</td><td className="border border-border px-4 py-2 text-sm">Preferred brands</td><td className="border border-border px-4 py-2 text-sm">$30 - $50</td></tr>
                <tr className="bg-light/50"><td className="border border-border px-4 py-2 text-sm">Tier 4</td><td className="border border-border px-4 py-2 text-sm">Non-preferred brands</td><td className="border border-border px-4 py-2 text-sm">25-50% coinsurance</td></tr>
                <tr><td className="border border-border px-4 py-2 text-sm">Tier 5</td><td className="border border-border px-4 py-2 text-sm">Specialty drugs</td><td className="border border-border px-4 py-2 text-sm">25-33% coinsurance</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Key 2026 Part D Protections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">$2,000 Annual Out-of-Pocket Cap</h3>
              <p className="text-sm text-muted">No more donut hole. Total out-of-pocket drug spending is capped at $2,000 per year, after which you pay $0 for covered drugs.</p>
            </div>
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">$35 Insulin Cap</h3>
              <p className="text-sm text-muted">All covered insulin products are capped at $35 per month per prescription, regardless of the coverage phase you are in.</p>
            </div>
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">Free Vaccines</h3>
              <p className="text-sm text-muted">All Part D covered vaccines (including shingles and Tdap) are available at $0 cost-sharing under the Inflation Reduction Act.</p>
            </div>
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">Medicare Prescription Payment Plan</h3>
              <p className="text-sm text-muted">New option to spread out-of-pocket drug costs into monthly payments throughout the year instead of paying large amounts at the pharmacy.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">How to Choose a Part D Plan</h2>
          <ol className="list-decimal pl-6 text-muted space-y-2">
            <li><strong>List your medications:</strong> Write down every prescription including drug name, dosage, and quantity</li>
            <li><strong>Use Medicare Plan Finder:</strong> Enter your drugs at Medicare.gov to compare plans in your area</li>
            <li><strong>Check formularies:</strong> Verify each medication is covered and note the tier</li>
            <li><strong>Compare total costs:</strong> Look at premiums + deductible + copays for your specific drugs, not just premium alone</li>
            <li><strong>Check pharmacies:</strong> Verify your preferred pharmacy is in the plan&apos;s network (preferred pharmacies often have lower copays)</li>
            <li><strong>Review restrictions:</strong> Check for prior authorization, step therapy, or quantity limit requirements on your drugs</li>
            <li><strong>Re-evaluate annually:</strong> Formularies and costs change every year — compare plans during each Annual Enrollment Period</li>
          </ol>
        </section>

        {/* Related links */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/guides/understanding-medicare-part-d/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              Understanding Medicare Part D &rarr;
            </Link>
            <Link href="/guides/medicare-costs-and-premiums-explained/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              Medicare Costs Explained &rarr;
            </Link>
            <Link href="/guides/how-to-choose-a-medicare-plan/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              How to Choose a Medicare Plan &rarr;
            </Link>
            <Link href="/insurance-companies/silverscript/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              SilverScript (Largest Part D Provider) &rarr;
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
              <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <Disclaimer />
      </div>
    </>
  );
}
