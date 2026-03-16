import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Disclaimer from '../../components/Disclaimer';
import FAQSchema from '../../components/FAQSchema';
import guides from '../../../data/guides.json';
import newGuides from '../../../data/new-guides.json';

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

// Carrier logo map: display name -> domain for Clearbit logo API
const carrierLogos: Record<string, string> = {
  'UnitedHealthcare': 'uhc.com',
  'Humana': 'humana.com',
  'Aetna': 'aetna.com',
  'Cigna': 'cigna.com',
  'Kaiser Permanente': 'kaiserpermanente.org',
  'Blue Cross Blue Shield': 'bcbs.com',
  'Anthem': 'anthem.com',
  'WellCare': 'wellcare.com',
  'Molina': 'molinahealthcare.com',
  'Devoted Health': 'devotedhealth.com',
  'Mutual of Omaha': 'mutualofomaha.com',
  'GEICO': 'geico.com',
  'State Farm': 'statefarm.com',
  'Progressive': 'progressive.com',
  'Allstate': 'allstate.com',
  'USAA': 'usaa.com',
  'Liberty Mutual': 'libertymutual.com',
  'Nationwide': 'nationwide.com',
  'Travelers': 'travelers.com',
  'MetLife': 'metlife.com',
  'Delta Dental': 'deltadental.com',
  'Guardian': 'guardianlife.com',
  'VSP': 'vsp.com',
};

// Slug-to-carriers mapping for featured carrier bars
const slugCarriers: Record<string, string[]> = {
  'what-is-medicare-advantage': ['UnitedHealthcare', 'Humana', 'Aetna', 'Cigna', 'Kaiser Permanente', 'Anthem'],
  'medicare-advantage-vs-original-medicare': ['UnitedHealthcare', 'Humana', 'Aetna', 'Anthem', 'WellCare'],
  'medicare-advantage-vs-original-medicare-2026': ['UnitedHealthcare', 'Humana', 'Aetna', 'Cigna', 'Anthem', 'WellCare'],
  'medicare-advantage-complete-guide': ['UnitedHealthcare', 'Humana', 'Aetna', 'Cigna', 'Kaiser Permanente', 'Anthem'],
  'how-to-choose-a-medicare-plan': ['UnitedHealthcare', 'Humana', 'Aetna', 'Cigna', 'Kaiser Permanente', 'Blue Cross Blue Shield'],
  'what-is-medigap-supplement-insurance': ['Mutual of Omaha', 'Aetna', 'Cigna', 'Humana', 'Blue Cross Blue Shield'],
  'medicare-supplement-medigap-plans-compared-2026': ['Mutual of Omaha', 'Aetna', 'Cigna', 'Humana', 'Guardian'],
  'medigap-complete-guide': ['Mutual of Omaha', 'Aetna', 'Cigna', 'Humana', 'Blue Cross Blue Shield'],
  'medicare-plan-f-vs-plan-g': ['Mutual of Omaha', 'Aetna', 'Cigna', 'Humana'],
  'understanding-medicare-part-d': ['UnitedHealthcare', 'Humana', 'Cigna', 'Aetna', 'WellCare'],
  'medicare-part-d-prescription-drug-coverage-2026': ['UnitedHealthcare', 'Humana', 'Cigna', 'Aetna', 'WellCare'],
  'part-d-complete-guide': ['UnitedHealthcare', 'Humana', 'Cigna', 'Aetna', 'WellCare', 'Molina'],
  'dental-vision-hearing-medicare': ['Delta Dental', 'Guardian', 'Humana', 'Cigna', 'VSP'],
  'dental-insurance-complete-guide': ['Delta Dental', 'Guardian', 'Humana', 'Cigna', 'Aetna'],
  'auto-insurance-complete-guide': ['State Farm', 'GEICO', 'Progressive', 'Allstate', 'USAA', 'Liberty Mutual'],
  'homeowners-insurance-complete-guide': ['State Farm', 'Allstate', 'Liberty Mutual', 'Travelers', 'Nationwide'],
  'life-insurance-complete-guide': ['MetLife', 'Mutual of Omaha', 'Guardian', 'Nationwide', 'Allstate'],
  'health-insurance-complete-guide': ['UnitedHealthcare', 'Aetna', 'Cigna', 'Blue Cross Blue Shield', 'Anthem', 'Humana'],
};

// Category label inferred from slug keywords
function inferCategory(slug: string, explicitCategory?: string): string {
  if (explicitCategory) return explicitCategory;
  if (slug.includes('auto')) return 'Auto Insurance';
  if (slug.includes('dental')) return 'Dental Insurance';
  if (slug.includes('homeowner') || slug.includes('home')) return 'Home Insurance';
  if (slug.includes('life')) return 'Life Insurance';
  if (slug.includes('health')) return 'Health Insurance';
  if (slug.includes('part-d') || slug.includes('prescription')) return 'Medicare Part D';
  if (slug.includes('medigap') || slug.includes('supplement') || slug.includes('plan-f') || slug.includes('plan-g')) return 'Medicare Supplement';
  if (slug.includes('advantage')) return 'Medicare Advantage';
  if (slug.includes('veteran')) return 'Veterans Benefits';
  if (slug.includes('enroll') || slug.includes('enrollment') || slug.includes('switching')) return 'Medicare Enrollment';
  if (slug.includes('cost') || slug.includes('premium')) return 'Medicare Costs';
  if (slug.includes('medicare')) return 'Medicare';
  return 'Insurance Guide';
}

// Extract a key numeric stat from section content (first number with context)
function extractStat(content: string): { number: string; label: string } | null {
  // Match patterns like "$2,000", "65%", "30 days", "12 months", "3 plans", "10 million"
  const match = content.match(/(\$[\d,]+(?:\.\d+)?(?:\s*(?:billion|million|thousand))?|\d[\d,]*(?:\.\d+)?(?:\s*(?:billion|million|thousand|%|years?|months?|days?|plans?|carriers?|states?|people|beneficiaries))?)/i);
  if (!match) return null;
  const numStr = match[1];
  // Get surrounding context (up to 6 words after the number)
  const afterIdx = content.indexOf(numStr) + numStr.length;
  const after = content.slice(afterIdx, afterIdx + 60).split(/[.,!?;]/)[0].trim().replace(/\s+/g, ' ');
  // Get a short label: the matched text + a few words
  const label = after.length > 3 ? after.slice(0, 40) : 'key figure for this topic';
  return { number: numStr.trim(), label };
}

// Extract key point: first full sentence (or first 120 chars)
function extractKeyPoint(content: string): string {
  const firstPara = content.split('\n\n')[0].replace(/^- /, '').trim();
  const sentenceEnd = firstPara.search(/[.!?]/);
  if (sentenceEnd > 20 && sentenceEnd < 200) {
    return firstPara.slice(0, sentenceEnd + 1);
  }
  return firstPara.slice(0, 120).trim() + (firstPara.length > 120 ? '...' : '');
}

// Estimate reading time from all content
function estimateReadingTime(sections: { content: string }[], faqs: { answer: string }[]): number {
  const totalWords = [
    ...sections.map((s) => s.content),
    ...faqs.map((f) => f.answer),
  ]
    .join(' ')
    .split(/\s+/).length;
  return Math.max(3, Math.round(totalWords / 200));
}

// Map slugs to image filenames
const SLUG_TO_IMAGE: Record<string, string> = {
  'medicare-advantage-complete-guide': 'medicare-advantage',
  'medigap-complete-guide': 'medigap',
  'health-insurance-complete-guide': 'health-insurance',
  'part-d-complete-guide': 'part-d',
  'medicare-enrollment-complete-guide': 'enrollment',
  'medicare-costs-complete-guide': 'medicare-costs',
  'life-insurance-complete-guide': 'life-insurance',
  'auto-insurance-complete-guide': 'auto-insurance',
  'homeowners-insurance-complete-guide': 'home-insurance',
  'dental-insurance-complete-guide': 'dental-vision',
  'medicare-veterans-complete-guide': 'medicare-veterans',
};
function slugToKeyword(slug: string): string {
  return SLUG_TO_IMAGE[slug] || slug.replace(/-2026.*$/, '').replace(/-guide$/, '').replace(/-complete$/, '');
}

interface GuideData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  summary: string;
  sections: { heading: string; content: string }[];
  faq: { question: string; answer: string }[];
}

interface NewGuideData {
  slug: string;
  title?: string;
  description?: string;
  category?: string;
  sections: { heading: string; content: string }[];
  faqs?: { question: string; answer: string }[];
  keyTakeaways?: string[];
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

  // Merge enriched data from new-guides.json when available
  const enriched = (newGuides as NewGuideData[]).find((g) => g.slug === slug);
  const keyTakeaways = enriched?.keyTakeaways ?? [];
  const category = inferCategory(slug, enriched?.category);
  const readingTime = estimateReadingTime(guide.sections, guide.faq);
  const keyword = slugToKeyword(slug);
  const featuredCarriers = slugCarriers[slug] ?? [];
  const relatedGuides = guides.filter((g) => g.slug !== guide.slug).slice(0, 4);

  return (
    <>
      <FAQSchema faqs={guide.faq} />

      {/* Hero Image — full width, image has title baked in */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/heroes/hero-${keyword}.png`}
          alt={guide.h1}
          className="w-full rounded-2xl mb-6 object-cover"
          style={{ maxHeight: '400px' }}
        />

        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Guides', href: '/insurance-guides/' }, { label: guide.h1 }]} />

        {/* Category badge */}
        <div className="mb-4 mt-4">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
            style={{ background: '#0d9488', color: '#fff' }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-foreground">
          {guide.h1}
        </h1>

        {/* Meta description */}
        <p className="text-base sm:text-lg max-w-3xl mb-6 leading-relaxed text-muted">
          {guide.metaDescription}
        </p>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Updated March 2026
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {readingTime} min read
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              {guide.sections.length} sections
            </span>
          </div>
      </div>

      {/* Featured Carriers Bar */}
      {featuredCarriers.length > 0 && (
        <div style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#6b7280' }}>
              Featured Carriers
            </p>
            <div className="flex flex-wrap items-center gap-5">
              {featuredCarriers.map((carrier) => {
                const domain = carrierLogos[carrier];
                return (
                  <div
                    key={carrier}
                    className="flex items-center gap-2 group"
                    title={carrier}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                      alt={`${carrier} logo`}
                      width={28}
                      height={28}
                      className="rounded opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ objectFit: 'contain', maxHeight: '28px', maxWidth: '80px' }}
                      onError={undefined}
                    />
                    <span className="text-xs font-medium hidden sm:inline" style={{ color: '#374151' }}>{carrier}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content — two-column layout on desktop */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">

          {/* Left — article body */}
          <main>
            {/* Key Takeaways Box */}
            {keyTakeaways.length > 0 && (
              <div
                className="rounded-xl p-6 mb-10"
                style={{
                  background: 'linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%)',
                  border: '2px solid #0d9488',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
                    style={{ background: '#0d9488' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="text-base font-bold" style={{ color: '#0f766e' }}>Key Takeaways</h2>
                </div>
                <ul className="space-y-3">
                  {keyTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm leading-relaxed" style={{ color: '#134e4a' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mobile Table of Contents — collapsible */}
            <details
              className="lg:hidden rounded-xl mb-8 overflow-hidden"
              style={{ border: '1px solid #e5e7eb', background: '#f9fafb' }}
            >
              <summary
                className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-semibold select-none"
                style={{ color: '#1a1a2e', listStyle: 'none' }}
              >
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  In This Guide
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="toc-chevron">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <nav className="px-5 pb-4 pt-2">
                <ol className="space-y-2">
                  {guide.sections.map((section, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-xs font-bold mt-0.5 w-5 flex-shrink-0 text-right" style={{ color: '#0d9488' }}>{i + 1}.</span>
                      <a
                        href={`#section-${i}`}
                        className="text-sm leading-snug hover:underline transition-colors"
                        style={{ color: '#1d4e89' }}
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <span className="text-xs font-bold mt-0.5 w-5 flex-shrink-0 text-right" style={{ color: '#0d9488' }}>{guide.sections.length + 1}.</span>
                    <a href="#faq" className="text-sm leading-snug hover:underline" style={{ color: '#1d4e89' }}>
                      Frequently Asked Questions
                    </a>
                  </li>
                </ol>
              </nav>
            </details>

            {/* Content Sections */}
            {guide.sections.map((section, i) => {
              const showImage = i > 0 && i % 2 === 0;
              // Sections without an image: alternate Quick Stat (odd index) and Key Point (every 4th+1)
              const showQuickStat = !showImage && i > 0 && i % 4 === 1;
              const showKeyPoint = !showImage && i > 0 && i % 4 === 3;
              const stat = showQuickStat ? extractStat(section.content) : null;
              const keyPoint = showKeyPoint ? extractKeyPoint(section.content) : null;
              return (
              <div key={i}>
                {/* In-article image every 2nd section (after section 0) */}
                {showImage && (
                  <div
                    className="w-full rounded-xl mb-6 overflow-hidden flex items-center justify-center"
                    style={{
                      height: '180px',
                      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 70%, #0f3460 100%)',
                      backgroundImage: `url('/images/articles/${keyword}-${i}.png'), linear-gradient(135deg, #1a1a2e 0%, #16213e 70%, #0f3460 100%)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div
                      className="px-6 py-3 rounded-lg text-sm font-medium"
                      style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.7)' }}
                    >
                      {section.heading}
                    </div>
                  </div>
                )}

                {/* Quick Stat card — dark bg, teal accent, large number */}
                {showQuickStat && stat && (
                  <div
                    className="rounded-xl mb-6 px-6 py-5 flex items-center gap-5"
                    style={{ background: '#0f1f38', border: '1px solid #0d9488' }}
                  >
                    <div className="flex-shrink-0 text-center">
                      <div
                        className="text-3xl sm:text-4xl font-extrabold leading-none"
                        style={{ color: '#2dd4bf' }}
                      >
                        {stat.number}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#0d9488' }}>
                        Quick Stat
                      </div>
                      <div className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Point callout — bordered left accent */}
                {showKeyPoint && keyPoint && (
                  <div
                    className="rounded-r-xl mb-6 px-5 py-4"
                    style={{
                      borderLeft: '4px solid #0d9488',
                      background: 'linear-gradient(90deg, #f0fdfa 0%, #f9fafb 100%)',
                    }}
                  >
                    <div className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#0f766e' }}>
                      Key Point
                    </div>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: '#134e4a' }}>
                      {keyPoint}
                    </p>
                  </div>
                )}

                <section id={`section-${i}`} className="mb-12">
                  {/* Section heading with teal accent bar */}
                  <div className="flex items-start gap-3 mb-5">
                    <div
                      className="flex-shrink-0 w-1 rounded-full mt-1"
                      style={{ background: '#0d9488', height: '2rem' }}
                    />
                    <h2 className="text-xl sm:text-2xl font-bold leading-snug" style={{ color: '#1a1a2e' }}>
                      {section.heading}
                    </h2>
                  </div>

                  {/* Section content with enhanced rendering */}
                  <div className="prose-like">
                    {section.content.split('\n\n').map((paragraph, j) => {
                      if (paragraph.startsWith('- ') || paragraph.includes('\n- ')) {
                        const lines = paragraph.split('\n');
                        const intro = lines[0].startsWith('- ') ? null : lines[0];
                        const items = lines.filter((line) => line.trim().startsWith('- '));
                        return (
                          <div key={j} className="mb-5">
                            {intro && (
                              <p className="mb-3 leading-relaxed" style={{ color: '#374151' }}>{intro}</p>
                            )}
                            <ul className="space-y-2.5">
                              {items.map((item, k) => (
                                <li key={k} className="flex items-start gap-3">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0d9488"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="flex-shrink-0 mt-1"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                  <span className="text-sm leading-relaxed" style={{ color: '#374151' }}>
                                    {item.replace(/^- /, '')}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      return (
                        <p key={j} className="leading-relaxed mb-4" style={{ color: '#374151', fontSize: '0.9375rem' }}>
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </section>

                {/* Visual divider between sections (not after last) */}
                {i < guide.sections.length - 1 && (
                  <div className="flex items-center gap-4 mb-10" aria-hidden="true">
                    <div className="flex-1 h-px" style={{ background: '#e5e7eb' }} />
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#0d9488' }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#0ea5e9' }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#0d9488' }} />
                    </div>
                    <div className="flex-1 h-px" style={{ background: '#e5e7eb' }} />
                  </div>
                )}
              </div>
              );
            })}

            {/* FAQ Accordion */}
            <section id="faq" className="mt-4 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: '#0ea5e9' }} />
                <h2 className="text-xl sm:text-2xl font-bold" style={{ color: '#1a1a2e' }}>
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-3">
                {guide.faq.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-xl overflow-hidden"
                    style={{ border: '1px solid #e5e7eb' }}
                  >
                    <summary
                      className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer select-none"
                      style={{ background: '#f9fafb', listStyle: 'none' }}
                    >
                      <span className="text-sm font-semibold leading-snug pr-2" style={{ color: '#1a1a2e' }}>
                        {faq.question}
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 mt-0.5 transition-transform duration-200"
                        style={{ minWidth: '18px' }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <div className="px-5 py-4" style={{ background: '#ffffff', borderTop: '1px solid #e5e7eb' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Authority Links */}
            {authorityLinks[guide.slug] && (
              <section
                className="rounded-xl p-6 mb-10"
                style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4e89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <h2 className="text-sm font-bold" style={{ color: '#1e3a5f' }}>Official Resources</h2>
                </div>
                <ul className="space-y-3">
                  {authorityLinks[guide.slug].map((link, i) => (
                    <li key={i} className="flex flex-col gap-0.5">
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#1d4e89' }}
                      >
                        {link.label} &rarr;
                      </a>
                      {link.note && (
                        <span className="text-xs" style={{ color: '#3b82f6' }}>{link.note}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Cross-links CTA bar */}
            <section className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href="/medicare-advantage/"
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-center transition-all hover:opacity-90"
                  style={{ background: '#1a1a2e', color: '#ffffff', border: '1px solid #16213e' }}
                >
                  Compare MA Plans &rarr;
                </Link>
                <Link
                  href="/medicare-supplement/"
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-center transition-all hover:opacity-90"
                  style={{ background: '#0d9488', color: '#ffffff', border: '1px solid #0f766e' }}
                >
                  Compare Medigap Plans &rarr;
                </Link>
                <Link
                  href="/prescription-drug-plans/"
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-center transition-all hover:opacity-90"
                  style={{ background: '#0ea5e9', color: '#ffffff', border: '1px solid #0284c7' }}
                >
                  Compare Part D Plans &rarr;
                </Link>
              </div>

              {['medicare-costs-and-premiums-explained', 'medicare-advantage-vs-original-medicare', 'medicare-advantage-vs-original-medicare-2026', 'how-to-choose-a-medicare-plan', 'medicare-plan-f-vs-plan-g', 'medicare-supplement-medigap-plans-compared-2026'].includes(guide.slug) && (
                <div
                  className="mt-3 p-4 rounded-lg text-sm"
                  style={{ background: '#fffbeb', border: '1px solid #fcd34d', color: '#92400e' }}
                >
                  <span className="font-semibold">Planning for retirement costs?</span>{' '}
                  <a
                    href="https://www.bankingdeal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline hover:no-underline"
                    style={{ color: '#b45309' }}
                  >
                    BankingDeal.com
                  </a>{' '}
                  compares high-yield savings accounts and CDs — useful for building a healthcare cost reserve alongside your Medicare coverage.
                </div>
              )}
            </section>

            {/* Share This Guide */}
            <section
              className="rounded-xl p-6 mb-10"
              style={{ background: '#0f1f38', border: '1px solid #1e3a5f' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#2dd4bf' }}>Share This Guide</h2>
              </div>
              <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Help others find the right coverage — share this guide with friends or family.
              </p>
              <div className="flex flex-wrap gap-3">
                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(guide.h1)}&url=${encodeURIComponent(`https://www.insurerocket.com/guides/${guide.slug}/`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: '#000000', color: '#ffffff', border: '1px solid #333' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                  </svg>
                  Post on X
                </a>
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.insurerocket.com/guides/${guide.slug}/`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: '#1877f2', color: '#ffffff', border: '1px solid #1565d8' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Share on Facebook
                </a>
                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.insurerocket.com/guides/${guide.slug}/`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: '#0a66c2', color: '#ffffff', border: '1px solid #0853a0' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Share on LinkedIn
                </a>
              </div>
            </section>

            {/* Related Guides */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: '#0d9488' }} />
                <h2 className="text-xl font-bold" style={{ color: '#1a1a2e' }}>Related Guides</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedGuides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}/`}
                    className="group rounded-xl p-5 transition-all hover:shadow-md"
                    style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold leading-snug transition-colors group-hover:text-teal-600" style={{ color: '#1a1a2e' }}>
                        {g.h1}
                      </h3>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                    <p className="text-xs mt-1.5 leading-relaxed line-clamp-2" style={{ color: '#6b7280' }}>{g.summary}</p>
                  </Link>
                ))}
              </div>
            </section>

            <Disclaimer />
          </main>

          {/* Right — sticky desktop Table of Contents */}
          <aside className="hidden lg:block">
            <div
              className="sticky rounded-xl p-5"
              style={{ top: '5rem', border: '1px solid #e5e7eb', background: '#f9fafb' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1a1a2e' }}>In This Guide</h2>
              </div>
              <nav>
                <ol className="space-y-2.5">
                  {guide.sections.map((section, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-xs font-bold mt-0.5 w-5 flex-shrink-0 text-right tabular-nums" style={{ color: '#0d9488' }}>
                        {i + 1}.
                      </span>
                      <a
                        href={`#section-${i}`}
                        className="text-xs leading-snug hover:underline transition-colors"
                        style={{ color: '#374151' }}
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <span className="text-xs font-bold mt-0.5 w-5 flex-shrink-0 text-right tabular-nums" style={{ color: '#0d9488' }}>
                      {guide.sections.length + 1}.
                    </span>
                    <a
                      href="#faq"
                      className="text-xs leading-snug hover:underline transition-colors"
                      style={{ color: '#374151' }}
                    >
                      Frequently Asked Questions
                    </a>
                  </li>
                </ol>
              </nav>

              {/* Reading time in sidebar */}
              <div
                className="mt-5 pt-4 flex items-center gap-2 text-xs"
                style={{ borderTop: '1px solid #e5e7eb', color: '#6b7280' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {readingTime} min read &bull; Updated March 2026
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}
