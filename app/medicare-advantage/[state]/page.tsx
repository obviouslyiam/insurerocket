import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Disclaimer from '../../components/Disclaimer';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import states from '../../../data/states.json';
import cities from '../../../data/cities.json';

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
    title: `Medicare Advantage Plans in ${state.name} (${state.abbr}) - 2026 Guide`,
    description: `Compare Medicare Advantage plans in ${state.name}. Find top carriers like ${state.topCarriers.slice(0, 3).join(', ')}, plan benefits, enrollment periods, and how to choose the best MA plan in ${state.abbr}.`,
  };
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toString();
}

export default async function MedicareAdvantageStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const state = states.find((s) => s.slug === stateSlug) as StateData | undefined;
  if (!state) notFound();

  const stateCities = cities.filter((c) => c.stateSlug === state.slug);

  const faqs = [
    { question: `How many Medicare Advantage plans are available in ${state.name}?`, answer: `The number of Medicare Advantage plans in ${state.name} varies by county. Major metropolitan areas typically have 40-90+ plan options, while rural counties may have 10-30 options. Top carriers in ${state.name} include ${state.topCarriers.join(', ')}.` },
    { question: `What is the average cost of Medicare Advantage in ${state.name}?`, answer: `Many Medicare Advantage plans in ${state.name} have $0 monthly premiums beyond the standard Part B premium ($185/month in 2026). Plans with additional benefits may charge $10-$50/month. Copays and out-of-pocket costs vary by plan.` },
    { question: `Who are the top Medicare Advantage carriers in ${state.name}?`, answer: `The leading Medicare Advantage carriers in ${state.name} include ${state.topCarriers.join(', ')}. Each carrier offers different plan types, networks, and benefit packages across ${state.name} counties.` },
    { question: `When can I enroll in Medicare Advantage in ${state.name}?`, answer: `${state.name} residents can enroll in Medicare Advantage during the Initial Enrollment Period (around your 65th birthday), the Annual Enrollment Period (October 15 - December 7), or during a Special Enrollment Period triggered by a qualifying life event.` },
    { question: `Do Medicare Advantage plans in ${state.name} cover dental and vision?`, answer: `Most Medicare Advantage plans in ${state.name} include dental, vision, and hearing benefits. Coverage levels vary by plan but commonly include preventive dental care, routine eye exams, and annual hearing screenings. Some plans offer comprehensive dental with higher annual allowances.` },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[
          { label: 'Medicare Advantage', href: '/medicare-advantage/' },
          { label: state.name },
        ]} />

        <h1 className="text-4xl font-bold text-foreground mb-4">Medicare Advantage Plans in {state.name} ({state.abbr})</h1>
        <p className="text-lg text-muted mb-8">Compare Medicare Advantage (Part C) plans available in {state.name}. Review top carriers, plan benefits, costs, and enrollment information to find the best coverage for your needs in {state.abbr}.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-accent">{formatNumber(state.maEnrollment)}</p>
            <p className="text-xs text-muted">MA Enrollees</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-trust">{state.topCarriers.length}+</p>
            <p className="text-xs text-muted">Major Carriers</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">$0</p>
            <p className="text-xs text-muted">Premium Options Available</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-foreground">HMO/PPO</p>
            <p className="text-xs text-muted">Plan Types</p>
          </div>
        </div>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Medicare Advantage in {state.name}: Overview</h2>
          <p className="text-muted mb-4">Medicare Advantage plans in {state.name} provide an alternative to Original Medicare, offering comprehensive coverage through private insurance companies approved by the federal government. With approximately {formatNumber(state.maEnrollment)} enrolled beneficiaries, {state.name} has a robust Medicare Advantage market with multiple carriers competing for members.</p>
          <p className="text-muted mb-4">{state.name} Medicare Advantage plans typically include all Part A and Part B benefits, Part D prescription drug coverage, and additional benefits such as dental cleanings, vision exams, hearing aids, fitness programs, over-the-counter allowances, and transportation to medical appointments. Many plans in {state.name} offer $0 monthly premiums, making them an affordable option for beneficiaries looking for comprehensive coverage.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Top Medicare Advantage Carriers in {state.name}</h2>
          <p className="text-muted mb-4">The following insurance carriers offer some of the most popular Medicare Advantage plans in {state.name}. Plan availability, benefits, and network coverage vary by county within the state.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {state.topCarriers.map((carrier, i) => (
              <div key={i} className="bg-light border border-border rounded-lg p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold text-sm">{i + 1}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{carrier}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Medicare Advantage Plan Types in {state.name}</h2>
          <p className="text-muted mb-4">{state.name} beneficiaries can choose from several types of Medicare Advantage plans, each with different network structures and cost-sharing arrangements:</p>
          <div className="space-y-4">
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">HMO Plans (Health Maintenance Organization)</h3>
              <p className="text-sm text-muted">The most common MA plan type in {state.name}. HMO plans generally require you to use in-network doctors and hospitals and may need referrals for specialist care. Premiums and copays tend to be lower than PPO plans.</p>
            </div>
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">PPO Plans (Preferred Provider Organization)</h3>
              <p className="text-sm text-muted">PPO plans in {state.name} offer more flexibility, allowing you to see out-of-network providers at a higher cost. No referrals needed for specialists. Good for {state.name} residents who want broader provider access.</p>
            </div>
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">Special Needs Plans (SNPs)</h3>
              <p className="text-sm text-muted">Available in {state.name} for beneficiaries with specific conditions or circumstances: D-SNPs for dual-eligible (Medicare and Medicaid) members, C-SNPs for chronic conditions, and I-SNPs for institutionalized individuals.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Benefits Commonly Included in {state.name} MA Plans</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Dental Coverage', 'Vision Care', 'Hearing Benefits', 'Fitness Programs', 'OTC Allowances', 'Telehealth', 'Transportation', 'Meal Delivery', 'Prescription Drugs'].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 bg-light rounded-lg px-3 py-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">How to Enroll in Medicare Advantage in {state.name}</h2>
          <p className="text-muted mb-4">You can enroll in a Medicare Advantage plan in {state.name} during the following enrollment periods:</p>
          <ul className="list-disc pl-6 text-muted space-y-2 mb-4">
            <li><strong>Initial Enrollment Period:</strong> The 7-month window around your 65th birthday (3 months before, your birthday month, and 3 months after)</li>
            <li><strong>Annual Enrollment Period:</strong> October 15 through December 7 each year, with coverage starting January 1</li>
            <li><strong>Medicare Advantage Open Enrollment:</strong> January 1 through March 31 for current MA members to switch plans</li>
            <li><strong>Special Enrollment Periods:</strong> Triggered by qualifying events such as moving, losing coverage, or qualifying for Medicaid</li>
          </ul>
          <p className="text-muted">Use the Medicare Plan Finder at Medicare.gov to compare all Medicare Advantage plans available in your {state.name} county.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">How to Choose a Medicare Advantage Plan in {state.name}</h2>
          <p className="text-muted mb-4">When selecting a Medicare Advantage plan in {state.name}, consider these factors:</p>
          <ol className="list-decimal pl-6 text-muted space-y-2">
            <li><strong>Provider network:</strong> Verify that your current doctors, specialists, and preferred hospitals in {state.name} are in the plan&apos;s network</li>
            <li><strong>Prescription drug coverage:</strong> Check that your medications are on the plan&apos;s formulary and review cost tiers</li>
            <li><strong>Total costs:</strong> Compare premiums, copays, deductibles, and annual out-of-pocket maximums</li>
            <li><strong>Extra benefits:</strong> Evaluate dental, vision, hearing, and other supplemental benefits</li>
            <li><strong>Star ratings:</strong> Review CMS quality ratings for member satisfaction and care outcomes</li>
          </ol>
        </section>

        {/* City links if available */}
        {stateCities.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">Medicare Plans in {state.name} Cities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {stateCities.map((city) => (
                <Link key={city.slug} href={`/medicare-plans/${city.slug}/`} className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
                  {city.city}, {city.stateAbbr}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal links */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href={`/medicare-supplement/${state.slug}/`} className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-trust hover:text-white hover:border-trust transition-colors">
              Medicare Supplement Plans in {state.name} &rarr;
            </Link>
            <Link href="/guides/what-is-medicare-advantage/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              What Is Medicare Advantage? &rarr;
            </Link>
            <Link href="/guides/how-to-choose-a-medicare-plan/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              How to Choose a Medicare Plan &rarr;
            </Link>
            <Link href="/guides/when-to-enroll-in-medicare/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              When to Enroll in Medicare &rarr;
            </Link>
          </div>
        </section>

        <FAQSection faqs={faqs} />
        <Disclaimer />
      </div>
    </>
  );
}
