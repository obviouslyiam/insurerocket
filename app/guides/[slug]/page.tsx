import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Disclaimer from '../../components/Disclaimer';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import guides from '../../../data/guides.json';

// Authority links keyed by guide slug — only shown where contextually relevant
const authorityLinks: Record<string, { label: string; href: string; note?: string }[]> = {
  'what-is-medicare-advantage': [
    { label: 'Medicare.gov — Find & Compare Medicare Advantage Plans', href: 'https://www.medicare.gov/plan-compare/', note: 'Official federal plan comparison tool' },
    { label: 'CMS.gov — Medicare Advantage Star Ratings', href: 'https://www.cms.gov/medicare/health-drug-plans/medicareadvtgspecneeds/downloads/2026-star-ratings', note: 'CMS publishes plan quality data each October' },
  ],
  'medicare-advantage-vs-original-medicare': [
    { label: 'Medicare.gov — Compare Your Coverage Options', href: 'https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/your-medicare-coverage-choices', note: 'Official guidance from CMS' },
    { label: 'CMS.gov — Medicare & You Handbook 2026', href: 'https://www.medicare.gov/medicare-and-you', note: 'Free annual handbook mailed to all beneficiaries' },
  ],
  'medicare-advantage-vs-original-medicare-2026': [
    { label: 'Medicare.gov — Plan Finder Tool', href: 'https://www.medicare.gov/plan-compare/', note: 'Enter your zip code to compare local plans' },
    { label: 'CMS.gov — Medicare Advantage Star Ratings', href: 'https://www.cms.gov/medicare/health-drug-plans/medicareadvtgspecneeds/downloads/2026-star-ratings', note: 'Published quality ratings for all Medicare Advantage contracts' },
  ],
  'when-to-enroll-in-medicare': [
    { label: 'SSA.gov — Sign Up for Medicare', href: 'https://www.ssa.gov/medicare/sign-up', note: 'Apply for Medicare online through Social Security' },
    { label: 'Medicare.gov — Enrollment Periods', href: 'https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start', note: 'Official enrollment timeline guidance' },
    { label: 'SHIP — Free Enrollment Help in Your State', href: 'https://www.shiphelp.org', note: 'State Health Insurance Assistance Programs offer free counseling' },
  ],
  'medicare-open-enrollment-2026-guide': [
    { label: 'Medicare.gov — Annual Enrollment Period', href: 'https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start', note: 'Official AEP dates and rules' },
    { label: 'Medicare.gov — Plan Finder Tool', href: 'https://www.medicare.gov/plan-compare/', note: 'Compare plans during open enrollment' },
    { label: 'SHIP — Free Help Comparing Plans', href: 'https://www.shiphelp.org', note: 'Unbiased counseling at no cost' },
  ],
  'understanding-medicare-part-d': [
    { label: 'Medicare.gov — Drug Plan Finder', href: 'https://www.medicare.gov/plan-compare/#/?lang=en&year=2026', note: 'Enter your medications to find the lowest-cost Part D plan' },
    { label: 'SSA.gov — Apply for Extra Help (LIS)', href: 'https://www.ssa.gov/medicare/part-d-extra-help', note: 'Free program for Part D premium and cost assistance' },
    { label: 'HHS.gov — Inflation Reduction Act Drug Price Changes', href: 'https://www.hhs.gov/about/news/2023/08/29/biden-harris-administration-celebrat-achievement-prescription-drug-law.html', note: 'Background on the $2,000 Part D out-of-pocket cap' },
  ],
  'medicare-part-d-prescription-drug-coverage-2026': [
    { label: 'Medicare.gov — Drug Plan Finder', href: 'https://www.medicare.gov/plan-compare/#/?lang=en&year=2026', note: 'Compare Part D plans by your specific medications' },
    { label: 'SSA.gov — Extra Help Program', href: 'https://www.ssa.gov/medicare/part-d-extra-help', note: 'Premium and cost assistance for lower-income beneficiaries' },
  ],
  'what-is-medigap-supplement-insurance': [
    { label: 'Medicare.gov — Medigap Policies & Plans', href: 'https://www.medicare.gov/health-drug-plans/medigap', note: 'Federal overview of all standardized Medigap plans' },
    { label: 'SHIP — Free Medigap Counseling', href: 'https://www.shiphelp.org', note: 'State counselors can explain your options at no cost' },
  ],
  'medicare-supplement-medigap-plans-compared-2026': [
    { label: 'Medicare.gov — Medigap Plan Comparison', href: 'https://www.medicare.gov/health-drug-plans/medigap', note: 'Standardized plan benefits from the federal source' },
    { label: 'ConsumerFinance.gov — Shopping for Insurance', href: 'https://www.consumerfinance.gov/consumer-tools/insurance/', note: 'How to evaluate insurance products and complaints' },
  ],
  'medicare-plan-f-vs-plan-g': [
    { label: 'Medicare.gov — Medigap Plans Explained', href: 'https://www.medicare.gov/health-drug-plans/medigap', note: 'Official breakdown of Plan F, G, and all standardized options' },
    { label: 'SHIP — Free Medigap Cost Comparison', href: 'https://www.shiphelp.org', note: 'Free state counselors can pull premium quotes' },
  ],
  'how-to-choose-a-medicare-plan': [
    { label: 'Medicare.gov — Plan Finder Tool', href: 'https://www.medicare.gov/plan-compare/', note: 'The only tool with verified plan data from CMS' },
    { label: 'SHIP — Free Personalized Counseling', href: 'https://www.shiphelp.org', note: 'No-cost help from trained counselors in every state' },
    { label: 'CMS.gov — Star Ratings Data', href: 'https://www.cms.gov/medicare/health-drug-plans/medicareadvtgspecneeds/downloads/2026-star-ratings', note: 'Quality scores for all Medicare Advantage plans' },
  ],
  'medicare-costs-and-premiums-explained': [
    { label: 'Medicare.gov — 2026 Costs at a Glance', href: 'https://www.medicare.gov/basics/costs/medicare-costs', note: 'Official 2026 Part A and B premium and deductible figures' },
    { label: 'SSA.gov — IRMAA Income Brackets', href: 'https://www.ssa.gov/benefits/medicare/medicare-premiums.html', note: 'Income-related premium adjustments for higher earners' },
  ],
  'medicare-for-veterans': [
    { label: 'Medicare.gov — Medicare & VA Coverage', href: 'https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/medicare-and-other-insurance/medicare-coverage-if-you-have-va-benefits', note: 'How Medicare and VA benefits work together' },
    { label: 'HHS.gov — Veterans Health Information', href: 'https://www.hhs.gov/veterans/', note: 'Federal health resources for veterans' },
  ],
  'medicare-for-veterans-va-benefits-guide-2026': [
    { label: 'Medicare.gov — Medicare & VA Coverage', href: 'https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/medicare-and-other-insurance/medicare-coverage-if-you-have-va-benefits', note: 'How both programs coordinate' },
    { label: 'SSA.gov — Enrolling in Medicare as a Veteran', href: 'https://www.ssa.gov/medicare/sign-up', note: 'Sign-up process even with VA coverage' },
  ],
  'dental-vision-hearing-medicare': [
    { label: 'Medicare.gov — Dental, Vision & Hearing Coverage', href: 'https://www.medicare.gov/coverage/dental-care', note: 'What Original Medicare does (and does not) cover' },
    { label: 'Medicare.gov — Plan Finder — Filter by Extra Benefits', href: 'https://www.medicare.gov/plan-compare/', note: 'Compare plans by dental, vision, hearing allowances' },
  ],
  'medicare-annual-enrollment-period': [
    { label: 'Medicare.gov — Annual Enrollment Period', href: 'https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start', note: 'Oct 15 – Dec 7 each year' },
    { label: 'Medicare.gov — Plan Finder Tool', href: 'https://www.medicare.gov/plan-compare/', note: 'Compare and switch plans during AEP' },
    { label: 'SHIP — Local Enrollment Assistance', href: 'https://www.shiphelp.org', note: 'Free in-person and phone help available in every state' },
  ],
  'switching-medicare-plans': [
    { label: 'Medicare.gov — How to Switch Plans', href: 'https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start', note: 'Enrollment period rules from CMS' },
    { label: 'SHIP — Counseling Before You Switch', href: 'https://www.shiphelp.org', note: 'Get unbiased advice before changing coverage' },
  ],
};

interface GuideData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  summary: string;
  sections: { heading: string; content: string }[];
  faq: { question: string; answer: string }[];
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug) as GuideData | undefined;
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.metaDescription,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug) as GuideData | undefined;
  if (!guide) notFound();

  const otherGuides = guides.filter((g) => g.slug !== guide.slug).slice(0, 4);

  return (
    <>
      <FAQSchema faqs={guide.faq} />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[
          { label: 'Guides', href: '/insurance-guides/' },
          { label: guide.h1 },
        ]} />

        <h1 className="text-4xl font-bold text-foreground mb-4">{guide.h1}</h1>
        <p className="text-lg text-muted mb-8">{guide.summary}</p>

        {/* Table of contents */}
        <nav className="bg-light border border-border rounded-lg p-6 mb-10">
          <h2 className="font-semibold text-foreground mb-3">In This Guide</h2>
          <ul className="space-y-2">
            {guide.sections.map((section, i) => (
              <li key={i}>
                <a href={`#section-${i}`} className="text-sm text-trust hover:text-trust-light transition-colors">{section.heading}</a>
              </li>
            ))}
            <li>
              <a href="#faq" className="text-sm text-trust hover:text-trust-light transition-colors">Frequently Asked Questions</a>
            </li>
          </ul>
        </nav>

        {/* Content sections */}
        {guide.sections.map((section, i) => (
          <section key={i} id={`section-${i}`} className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">{section.heading}</h2>
            {section.content.split('\n\n').map((paragraph, j) => {
              if (paragraph.startsWith('- ') || paragraph.startsWith('  - ')) {
                const items = paragraph.split('\n').filter(line => line.trim().startsWith('- '));
                return (
                  <ul key={j} className="list-disc pl-6 text-muted space-y-1 mb-4">
                    {items.map((item, k) => (
                      <li key={k} className="text-sm leading-relaxed">{item.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={j} className="text-muted mb-4 leading-relaxed">{paragraph}</p>;
            })}
          </section>
        ))}

        {/* FAQ */}
        <div id="faq">
          <FAQSection faqs={guide.faq} />
        </div>

        {/* Authority links — only shown when relevant links exist for this guide */}
        {authorityLinks[guide.slug] && (
          <section className="mt-10 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-blue-900 mb-4">Official Resources</h2>
            <ul className="space-y-3">
              {authorityLinks[guide.slug].map((link, i) => (
                <li key={i} className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline shrink-0"
                  >
                    {link.label}
                  </a>
                  {link.note && (
                    <span className="text-xs text-blue-600 sm:ml-2 sm:mt-0.5">— {link.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related guides */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherGuides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}/`} className="bg-light border border-border rounded-lg p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-1">{g.h1}</h3>
                <p className="text-xs text-muted">{g.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/medicare-advantage/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors text-center">
              Compare MA Plans &rarr;
            </Link>
            <Link href="/medicare-supplement/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-trust hover:text-white hover:border-trust transition-colors text-center">
              Compare Medigap Plans &rarr;
            </Link>
            <Link href="/prescription-drug-plans/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors text-center">
              Compare Part D Plans &rarr;
            </Link>
          </div>
          {/* Retirement savings cross-link — shown on cost/financial planning guides */}
          {['medicare-costs-and-premiums-explained', 'medicare-advantage-vs-original-medicare', 'medicare-advantage-vs-original-medicare-2026', 'how-to-choose-a-medicare-plan', 'medicare-plan-f-vs-plan-g', 'medicare-supplement-medigap-plans-compared-2026'].includes(guide.slug) && (
            <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
              <span className="font-medium">Planning for retirement costs?</span>{' '}
              <a
                href="https://www.bankingdeal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-900 underline font-medium"
              >
                BankingDeal.com
              </a>{' '}
              compares high-yield savings accounts and CDs — useful for building a healthcare cost reserve alongside your Medicare coverage.
            </div>
          )}
        </section>

        <Disclaimer />
      </article>
    </>
  );
}
