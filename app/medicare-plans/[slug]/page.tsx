import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Disclaimer from '../../components/Disclaimer';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import cities from '../../../data/cities.json';

interface CityData {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;
  stateSlug: string;
  population: string;
  tier: string;
  topCarriers: string[];
  maPlansAvailable: number;
  avgPremium: number;
}

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const city = cities.find((c) => c.slug === params.slug) as CityData | undefined;
  if (!city) return {};
  return {
    title: `Medicare Plans in ${city.city}, ${city.stateAbbr} - Compare MA & Supplement Plans (2026)`,
    description: `Compare Medicare plans in ${city.city}, ${city.stateAbbr}. ${city.maPlansAvailable}+ Medicare Advantage plans available. Top carriers: ${city.topCarriers.slice(0, 3).join(', ')}. Find the best coverage.`,
  };
}

export default function CityMedicarePage({ params }: { params: { slug: string } }) {
  const city = cities.find((c) => c.slug === params.slug) as CityData | undefined;
  if (!city) notFound();

  const otherCitiesInState = cities.filter((c) => c.stateSlug === city.stateSlug && c.slug !== city.slug);
  const nearbyCities = cities.filter((c) => c.slug !== city.slug).slice(0, 6);

  const faqs = [
    { question: `How many Medicare Advantage plans are available in ${city.city}, ${city.stateAbbr}?`, answer: `There are approximately ${city.maPlansAvailable} Medicare Advantage plans available in the ${city.city}, ${city.stateAbbr} area. The exact number varies by county and zip code. Use Medicare.gov Plan Finder with your specific zip code for a precise count.` },
    { question: `Who are the best Medicare insurance companies in ${city.city}?`, answer: `Top Medicare carriers in the ${city.city} area include ${city.topCarriers.join(', ')}. The best carrier for you depends on your specific doctors, medications, and coverage needs.` },
    { question: `What is the average cost of Medicare Advantage in ${city.city}?`, answer: `Many Medicare Advantage plans in ${city.city}, ${city.stateAbbr} have $0 monthly premiums beyond the standard Part B premium ($185/month in 2026). Plans with enhanced benefits may charge $10-$50/month. Copays and out-of-pocket costs vary by plan.` },
    { question: `Can I get Medicare Supplement (Medigap) plans in ${city.city}?`, answer: `Yes. Multiple insurance carriers offer Medigap plans in ${city.city}, ${city.stateAbbr}. Medigap plans are standardized, so Plan G from one company covers the same benefits as Plan G from another — only premiums differ. Compare quotes from multiple carriers.` },
    { question: `When can I enroll in Medicare in ${city.city}, ${city.stateAbbr}?`, answer: `Medicare enrollment periods are federal and apply nationwide, including in ${city.city}. The main periods are the Initial Enrollment Period (around your 65th birthday), Annual Enrollment Period (October 15 - December 7), and Special Enrollment Periods for qualifying life events.` },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[
          { label: 'Medicare Plans' },
          { label: `${city.city}, ${city.stateAbbr}` },
        ]} />

        <h1 className="text-4xl font-bold text-foreground mb-4">Medicare Plans in {city.city}, {city.stateAbbr}</h1>
        <p className="text-lg text-muted mb-8">Compare Medicare Advantage, Medicare Supplement, and Part D plans available in the {city.city}, {city.state} area. Review top carriers, plan options, and enrollment information for {city.city} residents.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-accent">{city.maPlansAvailable}+</p>
            <p className="text-xs text-muted">MA Plans Available</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-trust">{city.topCarriers.length}</p>
            <p className="text-xs text-muted">Major Carriers</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">$0</p>
            <p className="text-xs text-muted">Premium Options</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{city.population}</p>
            <p className="text-xs text-muted">City Population</p>
          </div>
        </div>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Medicare Coverage in {city.city}, {city.stateAbbr}</h2>
          <p className="text-muted mb-4">{city.city}, {city.state} residents have access to a competitive Medicare market with approximately {city.maPlansAvailable} Medicare Advantage plan options from leading national and regional carriers. The {city.city} metropolitan area benefits from a {city.tier === 'major' ? 'large and highly competitive' : city.tier === 'large' ? 'well-established' : 'growing'} healthcare market with multiple hospital systems and extensive provider networks.</p>
          <p className="text-muted mb-4">As one of {city.state}&apos;s {city.tier === 'major' ? 'largest metropolitan areas' : 'significant population centers'}, {city.city} attracts all major Medicare insurance carriers, giving residents a wide range of plan choices across HMO, PPO, and Special Needs Plan categories. Many plans in the {city.city} area offer $0 monthly premiums, comprehensive dental, vision, and hearing benefits, and additional perks like fitness memberships and over-the-counter allowances.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Top Medicare Carriers in {city.city}</h2>
          <p className="text-muted mb-4">The following insurance carriers offer Medicare plans in the {city.city}, {city.stateAbbr} area. Plan availability and networks vary by zip code within the metropolitan area.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {city.topCarriers.map((carrier, i) => (
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
          <h2 className="text-2xl font-bold text-foreground mb-4">Medicare Plan Types in {city.city}</h2>
          <div className="space-y-4">
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">Medicare Advantage (Part C)</h3>
              <p className="text-sm text-muted">All-in-one plans bundling Part A, Part B, and usually Part D. {city.city} residents can choose from HMO plans (lower cost, in-network providers) or PPO plans (more flexibility, higher cost for out-of-network care). Many plans include dental, vision, hearing, and fitness benefits.</p>
            </div>
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">Medicare Supplement (Medigap)</h3>
              <p className="text-sm text-muted">Supplements Original Medicare to cover deductibles, copays, and coinsurance. {city.city} residents can see any Medicare-accepting provider nationwide. Plan G is the most popular option, covering nearly all cost-sharing except the annual Part B deductible.</p>
            </div>
            <div className="bg-light border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-2">Part D Prescription Drug Plans</h3>
              <p className="text-sm text-muted">Stand-alone drug plans for {city.city} residents on Original Medicare. Annual out-of-pocket drug costs are capped at $2,000 in 2026. Compare formularies using your specific medications to find the lowest-cost plan.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">How to Find the Best Medicare Plan in {city.city}</h2>
          <ol className="list-decimal pl-6 text-muted space-y-2">
            <li><strong>List your doctors:</strong> Note all healthcare providers you currently see in the {city.city} area and verify they are in-network for plans you consider</li>
            <li><strong>List your medications:</strong> Create a complete prescription list to compare Part D formularies and costs</li>
            <li><strong>Compare plan types:</strong> Decide between Medicare Advantage (bundled benefits, network-based) and Original Medicare with Medigap (provider freedom, predictable costs)</li>
            <li><strong>Use Medicare Plan Finder:</strong> Enter your {city.city} zip code at Medicare.gov to see all available plans with personalized cost estimates</li>
            <li><strong>Review extra benefits:</strong> Compare dental, vision, hearing, fitness, and other supplemental benefits that matter to you</li>
            <li><strong>Check star ratings:</strong> Higher-rated plans (4-5 stars) generally provide better care quality and member satisfaction</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Medicare Enrollment in {city.city}</h2>
          <p className="text-muted mb-4">{city.city} residents can enroll in or change Medicare plans during these federal enrollment periods:</p>
          <ul className="list-disc pl-6 text-muted space-y-2">
            <li><strong>Initial Enrollment Period:</strong> 7-month window around your 65th birthday</li>
            <li><strong>Annual Enrollment Period:</strong> October 15 - December 7 (changes effective January 1)</li>
            <li><strong>Medicare Advantage Open Enrollment:</strong> January 1 - March 31 (for current MA members)</li>
            <li><strong>Special Enrollment Periods:</strong> Triggered by qualifying life events like moving or losing other coverage</li>
          </ul>
        </section>

        {/* State link */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Statewide {city.state} Medicare Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href={`/medicare-advantage/${city.stateSlug}/`} className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              Medicare Advantage in {city.state} &rarr;
            </Link>
            <Link href={`/medicare-supplement/${city.stateSlug}/`} className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-trust hover:text-white hover:border-trust transition-colors">
              Medicare Supplement in {city.state} &rarr;
            </Link>
          </div>
        </section>

        {/* Other cities in state */}
        {otherCitiesInState.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">Other Cities in {city.state}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {otherCitiesInState.map((c) => (
                <Link key={c.slug} href={`/medicare-plans/${c.slug}/`} className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors text-center">
                  {c.city}, {c.stateAbbr}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other cities */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Medicare Plans in Other Major Cities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {nearbyCities.map((c) => (
              <Link key={c.slug} href={`/medicare-plans/${c.slug}/`} className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors text-center">
                {c.city}, {c.stateAbbr}
              </Link>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqs} />
        <Disclaimer />
      </div>
    </>
  );
}
