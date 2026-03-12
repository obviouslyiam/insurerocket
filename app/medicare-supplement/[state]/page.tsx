import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Disclaimer from '../../components/Disclaimer';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import states from '../../../data/states.json';

interface StateData {
  slug: string;
  name: string;
  abbr: string;
  topCarriers: string[];
  maEnrollment: number;
  medigapPopularity: string;
  avgMaPremium: number;
  avgMedigapPremium: number;
}

export function generateStaticParams() {
  return states.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = states.find((s) => s.slug === stateSlug) as StateData | undefined;
  if (!state) return {};
  return {
    title: `Medicare Supplement (Medigap) Plans in ${state.name} (${state.abbr}) - 2026`,
    description: `Compare Medigap plans in ${state.name}. Plan F vs G vs N comparison, average premiums starting at $${state.avgMedigapPremium}/mo, top carriers, and enrollment information for ${state.abbr}.`,
  };
}

export default async function MedicareSupplementStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const state = states.find((s) => s.slug === stateSlug) as StateData | undefined;
  if (!state) notFound();

  const faqs = [
    { question: `What is the most popular Medigap plan in ${state.name}?`, answer: `${state.medigapPopularity} is the most popular Medigap plan in ${state.name}. For new enrollees (eligible after January 1, 2020), Plan G is the most comprehensive option available, covering all Medicare cost-sharing except the annual Part B deductible of $257.` },
    { question: `How much does Medigap cost in ${state.name}?`, answer: `Average Medigap Plan G premiums in ${state.name} start around $${state.avgMedigapPremium} per month, though prices vary by insurer, age, gender, tobacco use, and county. Shopping multiple carriers is essential since the same Plan G can vary by $100+ per month between companies.` },
    { question: `Who sells Medigap plans in ${state.name}?`, answer: `Major Medigap providers in ${state.name} include Mutual of Omaha, AARP/UnitedHealthcare, Cigna, Aetna, and various Blue Cross Blue Shield companies. Availability and pricing vary, so comparing quotes from multiple insurers is recommended.` },
    { question: `When is the best time to buy Medigap in ${state.name}?`, answer: `The best time is during your Medigap Open Enrollment Period — the 6-month window beginning when you are both 65 or older and enrolled in Medicare Part B. During this period, insurers in ${state.name} cannot deny coverage or charge more based on health conditions.` },
    { question: `Can I switch Medigap plans in ${state.name}?`, answer: `You can apply to switch Medigap plans in ${state.name} at any time, but outside your Open Enrollment Period, insurers may use medical underwriting and could deny your application or charge higher premiums. Some states offer additional switching protections.` },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[
          { label: 'Medicare Supplement', href: '/medicare-supplement/' },
          { label: state.name },
        ]} />

        <h1 className="text-4xl font-bold text-foreground mb-4">Medicare Supplement (Medigap) Plans in {state.name}</h1>
        <p className="text-lg text-muted mb-8">Compare Medigap plans available in {state.name}. Review Plan F vs G vs N, average premiums, top carriers, and how to choose the right supplement plan to pair with your Original Medicare coverage.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-trust">{state.medigapPopularity}</p>
            <p className="text-xs text-muted">Most Popular Plan</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-accent">${state.avgMedigapPremium}</p>
            <p className="text-xs text-muted">Avg Plan G Premium/mo</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-xs text-muted">Plan Types Available</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-foreground">10+</p>
            <p className="text-xs text-muted">Insurance Carriers</p>
          </div>
        </div>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Medigap Plans in {state.name}: Overview</h2>
          <p className="text-muted mb-4">Medicare Supplement (Medigap) insurance in {state.name} helps cover the out-of-pocket costs that Original Medicare leaves behind, including deductibles, copayments, and coinsurance. Unlike Medicare Advantage, Medigap works alongside Original Medicare and allows you to see any doctor or hospital that accepts Medicare anywhere in the country.</p>
          <p className="text-muted mb-4">Medigap plans in {state.name} are standardized by the federal government, meaning Plan G from one company offers the same benefits as Plan G from another company. The difference is in the premium, customer service, and pricing method used. With average Plan G premiums starting around ${state.avgMedigapPremium} per month in {state.name}, comparing quotes from multiple insurers can save you hundreds of dollars per year.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Plan F vs. Plan G vs. Plan N in {state.name}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-light">
                  <th className="border border-border px-4 py-3 text-left text-sm font-semibold text-foreground">Feature</th>
                  <th className="border border-border px-4 py-3 text-center text-sm font-semibold text-foreground">Plan F</th>
                  <th className="border border-border px-4 py-3 text-center text-sm font-semibold text-foreground">Plan G</th>
                  <th className="border border-border px-4 py-3 text-center text-sm font-semibold text-foreground">Plan N</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">Part A Deductible</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                </tr>
                <tr className="bg-light/50">
                  <td className="border border-border px-4 py-2 text-sm text-foreground">Part B Deductible</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-accent font-medium">Not Covered</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-accent font-medium">Not Covered</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">Part B Coinsurance</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">100%</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">100%</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-muted font-medium">Copays*</td>
                </tr>
                <tr className="bg-light/50">
                  <td className="border border-border px-4 py-2 text-sm text-foreground">Part B Excess Charges</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-accent font-medium">Not Covered</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">SNF Coinsurance</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                </tr>
                <tr className="bg-light/50">
                  <td className="border border-border px-4 py-2 text-sm text-foreground">Foreign Travel Emergency</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">Covered</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 text-sm text-foreground">Availability</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-muted">Pre-2020 only</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">All enrollees</td>
                  <td className="border border-border px-4 py-2 text-center text-sm text-green-600 font-medium">All enrollees</td>
                </tr>
                <tr className="bg-light/50">
                  <td className="border border-border px-4 py-2 text-sm text-foreground">Avg Premium in {state.abbr}</td>
                  <td className="border border-border px-4 py-2 text-center text-sm font-medium">${state.avgMedigapPremium + 30}/mo</td>
                  <td className="border border-border px-4 py-2 text-center text-sm font-medium">${state.avgMedigapPremium}/mo</td>
                  <td className="border border-border px-4 py-2 text-center text-sm font-medium">${Math.round(state.avgMedigapPremium * 0.75)}/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted mt-2">*Plan N charges copays of up to $20 for office visits and up to $50 for ER visits that do not result in admission.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Top Medigap Carriers in {state.name}</h2>
          <p className="text-muted mb-4">Several major insurance companies offer Medigap plans in {state.name}. Since all Plan G policies offer identical coverage regardless of carrier, the key differentiators are premium pricing, customer service quality, and the insurer&apos;s financial stability.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Mutual of Omaha', 'AARP/UnitedHealthcare', 'Cigna', 'Aetna', 'Blue Cross Blue Shield', 'Humana'].map((carrier, i) => (
              <div key={i} className="bg-light border border-border rounded-lg p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-trust/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-trust font-bold text-sm">{i + 1}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{carrier}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Medigap Open Enrollment in {state.name}</h2>
          <p className="text-muted mb-4">Your Medigap Open Enrollment Period is the most important window for purchasing a supplement plan in {state.name}. This 6-month period begins the first month you are both 65 or older and enrolled in Medicare Part B.</p>
          <p className="text-muted mb-4">During this window, {state.name} insurers cannot deny you a Medigap policy, charge you more due to pre-existing health conditions, or make you wait for coverage to start. This is a one-time guaranteed issue right that you do not want to miss.</p>
          <p className="text-muted">After your Open Enrollment Period ends, {state.name} insurers can use medical underwriting when you apply for Medigap. This means they may decline your application or charge significantly higher premiums based on your health history.</p>
        </section>

        {/* Internal links */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href={`/medicare-advantage/${state.slug}/`} className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              Medicare Advantage Plans in {state.name} &rarr;
            </Link>
            <Link href="/guides/what-is-medigap-supplement-insurance/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-trust hover:text-white hover:border-trust transition-colors">
              What Is Medigap Insurance? &rarr;
            </Link>
            <Link href="/guides/medicare-plan-f-vs-plan-g/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-trust hover:text-white hover:border-trust transition-colors">
              Plan F vs. Plan G Comparison &rarr;
            </Link>
            <Link href="/guides/medicare-advantage-vs-original-medicare/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-trust hover:text-white hover:border-trust transition-colors">
              Medicare Advantage vs. Original Medicare &rarr;
            </Link>
          </div>
        </section>

        <FAQSection faqs={faqs} />
        <Disclaimer />
      </div>
    </>
  );
}
