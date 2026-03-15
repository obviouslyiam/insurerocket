import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Disclaimer from '../../components/Disclaimer';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import companies from '../../../data/insurance-companies.json';

// Official carrier Medicare pages — linked in reviews for authority and trust signals
const carrierOfficialLinks: Record<string, { label: string; href: string }> = {
  aetna: { label: 'Aetna Medicare — Official Plan Information', href: 'https://www.aetnamedicare.com' },
  'anthem-blue-cross': { label: 'Anthem Medicare — Official Plans & Enrollment', href: 'https://www.anthem.com/medicare/' },
  'blue-cross-blue-shield': { label: 'BCBS Medicare — Find Your Local Plan', href: 'https://www.bcbs.com/medicare' },
  cigna: { label: 'Cigna Medicare — Plans & Coverage Options', href: 'https://www.cigna.com/medicare/' },
  humana: { label: 'Humana Medicare — Official Plan Details', href: 'https://www.humana.com/medicare/' },
  unitedhealthcare: { label: 'UnitedHealthcare Medicare — Plans & Enrollment', href: 'https://www.uhc.com/medicare' },
  'kaiser-permanente': { label: 'Kaiser Permanente Medicare — Senior Advantage', href: 'https://healthy.kaiserpermanente.org/medicare' },
  molina: { label: 'Molina Medicare — Plans & Benefits', href: 'https://www.molinahealthcare.com/medicare/' },
  centene: { label: 'WellCare Medicare (Centene) — Plan Information', href: 'https://www.wellcare.com/medicare' },
  wellcare: { label: 'WellCare Medicare — Plans & Coverage', href: 'https://www.wellcare.com/medicare' },
  'mutual-of-omaha': { label: 'Mutual of Omaha — Medicare Supplement Plans', href: 'https://www.mutualofomaha.com/medicare-supplement-insurance/' },
  'aarp-unitedhealthcare': { label: 'AARP Medicare Plans — Official Information', href: 'https://www.aarp.org/health/medicare-insurance/' },
  silverscript: { label: 'SilverScript — CVS Part D Plans', href: 'https://www.silverscript.com' },
  'devoted-health': { label: 'Devoted Health — Medicare Advantage Plans', href: 'https://www.devoted.com' },
  'clover-health': { label: 'Clover Health — Medicare Advantage', href: 'https://www.cloverhealth.com' },
  'oscar-health': { label: 'Oscar Health — Medicare Plans', href: 'https://www.hioscar.com/medicare' },
  'bright-health': { label: 'Bright Health — Medicare Coverage', href: 'https://www.brighthealthplan.com/medicare' },
  'alignment-healthcare': { label: 'Alignment Health Plan — Medicare Advantage', href: 'https://www.alignmenthealth.com' },
  'scan-health': { label: 'SCAN Health Plan — Medicare Advantage', href: 'https://www.scanhealthplan.com' },
  agewell: { label: 'AgeWell — Medicare Plans', href: 'https://www.agewellnewyork.com' },
};

interface CompanyData {
  slug: string;
  name: string;
  shortName: string;
  founded: number;
  headquarters: string;
  parent: string;
  maMembers: string;
  statesServed: number;
  rating: number;
  cmsStarRating: string;
  plansOffered: string[];
  strengths: string[];
  weaknesses: string[];
  overview: string;
  medicarePlans: string;
  coverageAreas: string;
}

export function generateStaticParams() {
  return companies.map((co) => ({ company: co.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ company: string }> }): Promise<Metadata> {
  const { company: companySlug } = await params;
  const company = companies.find((c) => c.slug === companySlug) as CompanyData | undefined;
  if (!company) return {};
  return {
    title: `${company.name} Medicare Review - Plans, Ratings & Coverage (2026)`,
    description: `${company.shortName} Medicare review: ${company.cmsStarRating} CMS star rating, ${company.statesServed} states served. Plans offered include ${company.plansOffered.slice(0, 3).join(', ')}. Pros, cons, and coverage details.`,
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : star - 0.5 <= rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-muted ml-1">{rating}/5</span>
    </div>
  );
}

export default async function InsuranceCompanyPage({ params }: { params: Promise<{ company: string }> }) {
  const { company: companySlug } = await params;
  const company = companies.find((c) => c.slug === companySlug) as CompanyData | undefined;
  if (!company) notFound();

  const faqs = [
    { question: `Is ${company.shortName} a good Medicare insurance company?`, answer: `${company.shortName} has a CMS star rating of ${company.cmsStarRating} out of 5. Key strengths include ${company.strengths.slice(0, 3).join(', ')}. However, some limitations include ${company.weaknesses.slice(0, 2).join(' and ')}. The best plan depends on your specific healthcare needs and location.` },
    { question: `What Medicare plans does ${company.shortName} offer?`, answer: `${company.shortName} offers the following Medicare products: ${company.plansOffered.join(', ')}. Plan availability varies by county, so check ${company.shortName}'s website or Medicare.gov to see what is available in your area.` },
    { question: `How many states does ${company.shortName} serve?`, answer: `${company.shortName} Medicare plans are available in ${company.statesServed === 50 ? 'all 50 states' : `approximately ${company.statesServed} states`}. Coverage areas and plan options vary by county within each state.` },
    { question: `How do I enroll in a ${company.shortName} Medicare plan?`, answer: `You can enroll in ${company.shortName} Medicare plans during the Initial Enrollment Period (around your 65th birthday), the Annual Enrollment Period (October 15 - December 7), or during a Special Enrollment Period. Enroll through Medicare.gov, by contacting ${company.shortName} directly, or through a licensed insurance agent.` },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[
          { label: 'Insurance Companies', href: '/insurance-companies/aetna/' },
          { label: company.shortName },
        ]} />

        <h1 className="text-4xl font-bold text-foreground mb-4">{company.name} Medicare Review (2026)</h1>
        <p className="text-lg text-muted mb-8">Comprehensive review of {company.shortName} Medicare plans including coverage options, ratings, pros and cons, and how they compare to other carriers.</p>

        {/* Company stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted mb-1">CMS Star Rating</p>
            <p className="text-xl font-bold text-foreground">{company.cmsStarRating}</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted mb-1">States Served</p>
            <p className="text-xl font-bold text-foreground">{company.statesServed}</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted mb-1">MA Members</p>
            <p className="text-xl font-bold text-foreground">{company.maMembers}</p>
          </div>
          <div className="bg-light border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted mb-1">Founded</p>
            <p className="text-xl font-bold text-foreground">{company.founded}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-2">InsureRocket Rating</h2>
          <StarRating rating={company.rating} />
        </div>

        {/* Overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">{company.shortName} Overview</h2>
          <p className="text-muted mb-4">{company.overview}</p>
          <div className="bg-light border border-border rounded-lg p-5 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold text-foreground">Headquarters:</span> <span className="text-muted">{company.headquarters}</span></div>
              <div><span className="font-semibold text-foreground">Parent Company:</span> <span className="text-muted">{company.parent}</span></div>
              <div><span className="font-semibold text-foreground">Founded:</span> <span className="text-muted">{company.founded}</span></div>
              <div><span className="font-semibold text-foreground">CMS Star Rating:</span> <span className="text-muted">{company.cmsStarRating}/5</span></div>
            </div>
          </div>
        </section>

        {/* Medicare plans */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">{company.shortName} Medicare Plans</h2>
          <p className="text-muted mb-4">{company.medicarePlans}</p>
          <h3 className="font-semibold text-foreground mb-3">Plans Offered:</h3>
          <div className="flex flex-wrap gap-2">
            {company.plansOffered.map((plan) => (
              <span key={plan} className="bg-light border border-border rounded-full px-4 py-1 text-sm text-foreground">{plan}</span>
            ))}
          </div>
        </section>

        {/* Coverage areas */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Coverage Areas</h2>
          <p className="text-muted">{company.coverageAreas}</p>
        </section>

        {/* Official resources */}
        <section className="mb-10 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-base font-semibold text-blue-900 mb-4">Official Resources</h2>
          <ul className="space-y-3">
            {carrierOfficialLinks[company.slug] && (
              <li>
                <a
                  href={carrierOfficialLinks[company.slug].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
                >
                  {carrierOfficialLinks[company.slug].label}
                </a>
                <span className="text-xs text-blue-600 ml-2">— Official carrier site</span>
              </li>
            )}
            <li>
              <a
                href="https://www.medicare.gov/plan-compare/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
              >
                Medicare.gov — Plan Finder Tool
              </a>
              <span className="text-xs text-blue-600 ml-2">— Compare {company.shortName} plans in your zip code</span>
            </li>
            <li>
              <a
                href="https://www.cms.gov/medicare/health-drug-plans/medicareadvtgspecneeds/downloads/2026-star-ratings"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
              >
                CMS.gov — 2026 Medicare Star Ratings
              </a>
              <span className="text-xs text-blue-600 ml-2">— Verify {company.shortName}&apos;s contract-level ratings</span>
            </li>
            <li>
              <a
                href="https://www.shiphelp.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
              >
                SHIP — Free Medicare Counseling
              </a>
              <span className="text-xs text-blue-600 ml-2">— Unbiased help comparing {company.shortName} to local alternatives</span>
            </li>
          </ul>
        </section>

        {/* Pros and cons */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Pros and Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Strengths
              </h3>
              <ul className="space-y-2">
                {company.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-green-700">{s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                Weaknesses
              </h3>
              <ul className="space-y-2">
                {company.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-red-700">{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Related companies */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Compare Other Insurance Companies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {companies.filter((c) => c.slug !== company.slug).slice(0, 6).map((co) => (
              <Link key={co.slug} href={`/insurance-companies/${co.slug}/`} className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors text-center">
                {co.shortName}
              </Link>
            ))}
          </div>
        </section>

        {/* Related guides */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/guides/what-is-medicare-advantage/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              What Is Medicare Advantage? &rarr;
            </Link>
            <Link href="/guides/how-to-choose-a-medicare-plan/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors">
              How to Choose a Medicare Plan &rarr;
            </Link>
          </div>
        </section>

        <FAQSection faqs={faqs} />
        <Disclaimer />
      </div>
    </>
  );
}
