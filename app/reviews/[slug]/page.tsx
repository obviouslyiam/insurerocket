import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Disclaimer from '../../components/Disclaimer';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import reviews from '../../../data/carrier-reviews.json';

// Authority + carrier links per review slug
const reviewAuthorityLinks: Record<string, { label: string; href: string; note: string }[]> = {
  'unitedhealthcare-medicare-review-2026': [
    { label: 'UnitedHealthcare Medicare — Official Plans & Enrollment', href: 'https://www.uhc.com/medicare', note: 'Official UHC Medicare site' },
    { label: 'Medicare.gov — Compare UHC Plans in Your Zip Code', href: 'https://www.medicare.gov/plan-compare/', note: 'Official federal plan comparison tool' },
    { label: 'CMS.gov — 2026 Star Ratings by Contract', href: 'https://www.cms.gov/medicare/health-drug-plans/medicareadvtgspecneeds/downloads/2026-star-ratings', note: 'Verify UHC contract-level ratings' },
    { label: 'SHIP — Free Counseling Before You Enroll', href: 'https://www.shiphelp.org', note: 'Unbiased help in every state' },
    { label: 'ConsumerFinance.gov — How to File an Insurance Complaint', href: 'https://www.consumerfinance.gov/consumer-tools/insurance/', note: 'If you experience issues with a plan' },
  ],
  'humana-medicare-review-2026': [
    { label: 'Humana Medicare — Official Plans & Benefits', href: 'https://www.humana.com/medicare/', note: 'Official Humana Medicare site' },
    { label: 'Medicare.gov — Find Humana Plans Near You', href: 'https://www.medicare.gov/plan-compare/', note: 'Filter by zip code to see local Humana options' },
    { label: 'CMS.gov — 2026 Star Ratings (Check Humana Contracts)', href: 'https://www.cms.gov/medicare/health-drug-plans/medicareadvtgspecneeds/downloads/2026-star-ratings', note: 'H5216 and other contract ratings' },
    { label: 'SHIP — Free Local Medicare Counseling', href: 'https://www.shiphelp.org', note: 'No-cost help comparing Humana to local alternatives' },
  ],
  'aetna-medicare-review-2026': [
    { label: 'Aetna Medicare — Official Plan Information', href: 'https://www.aetnamedicare.com', note: 'Official Aetna Medicare site' },
    { label: 'Medicare.gov — Compare Aetna Plans in Your Area', href: 'https://www.medicare.gov/plan-compare/', note: 'Enter your zip code to see local plan options' },
    { label: 'CMS.gov — 2026 Medicare Advantage Star Ratings', href: 'https://www.cms.gov/medicare/health-drug-plans/medicareadvtgspecneeds/downloads/2026-star-ratings', note: 'Aetna contract-level quality ratings' },
    { label: 'ConsumerFinance.gov — Insurance Complaints & Resources', href: 'https://www.consumerfinance.gov/consumer-tools/insurance/', note: 'How to escalate coverage disputes' },
  ],
  'kaiser-permanente-medicare-review-2026': [
    { label: 'Kaiser Permanente Medicare — Senior Advantage Plans', href: 'https://healthy.kaiserpermanente.org/medicare', note: 'Official Kaiser Medicare site' },
    { label: 'Medicare.gov — Verify Kaiser Availability in Your Area', href: 'https://www.medicare.gov/plan-compare/', note: 'Kaiser is only available in 8 states + DC' },
    { label: 'CMS.gov — Kaiser Star Ratings (Consistently 4.5–5 Stars)', href: 'https://www.cms.gov/medicare/health-drug-plans/medicareadvtgspecneeds/downloads/2026-star-ratings', note: 'Kaiser routinely earns the highest ratings in the program' },
  ],
  'bcbs-medicare-plans-2026-state-guide': [
    { label: 'BCBS.com — Find Your Local Blue Cross Blue Shield Plan', href: 'https://www.bcbs.com/medicare', note: 'Each state has its own BCBS company' },
    { label: 'Medicare.gov — Compare BCBS Plans by State', href: 'https://www.medicare.gov/plan-compare/', note: 'Official comparison tool — enter your zip code' },
    { label: 'CMS.gov — BCBS Contract Star Ratings by State', href: 'https://www.cms.gov/medicare/health-drug-plans/medicareadvtgspecneeds/downloads/2026-star-ratings', note: 'BCBS quality varies significantly by local plan' },
    { label: 'SHIP — State-by-State Medicare Counseling', href: 'https://www.shiphelp.org', note: 'Especially useful given BCBS quality variation by market' },
  ],
};

interface ReviewSection {
  heading: string;
  content: string;
}

interface ReviewData {
  slug: string;
  title: string;
  description: string;
  sections: ReviewSection[];
  faqs: { question: string; answer: string }[];
}

export function generateStaticParams() {
  return reviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const review = reviews.find((r) => r.slug === slug) as ReviewData | undefined;
  if (!review) return {};
  return {
    title: review.title,
    description: review.description,
  };
}

function renderContent(content: string) {
  const paragraphs = content.split('\n\n');
  return paragraphs.map((paragraph, j) => {
    // Markdown-style table: starts with | and has | separators
    if (paragraph.trim().startsWith('|')) {
      const rows = paragraph.trim().split('\n').filter((line) => line.trim().startsWith('|'));
      const headerRow = rows[0];
      const dataRows = rows.slice(2); // skip separator row
      const headers = headerRow.split('|').filter((c) => c.trim() !== '');
      return (
        <div key={j} className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-light">
                {headers.map((h, k) => (
                  <th key={k} className="border border-border px-3 py-2 text-left font-semibold text-foreground">
                    {h.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, k) => {
                const cells = row.split('|').filter((c) => c.trim() !== '');
                return (
                  <tr key={k} className={k % 2 === 0 ? 'bg-white' : 'bg-light'}>
                    {cells.map((cell, l) => (
                      <td key={l} className="border border-border px-3 py-2 text-muted">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // Bullet list
    if (paragraph.startsWith('- ') || paragraph.startsWith('  - ')) {
      const items = paragraph.split('\n').filter((line) => line.trim().startsWith('- '));
      return (
        <ul key={j} className="list-disc pl-6 text-muted space-y-1 mb-4">
          {items.map((item, k) => (
            <li key={k} className="text-sm leading-relaxed">{item.replace(/^- /, '')}</li>
          ))}
        </ul>
      );
    }

    // H3 heading (### prefix)
    if (paragraph.startsWith('### ')) {
      return (
        <h3 key={j} className="text-lg font-semibold text-foreground mt-6 mb-3">
          {paragraph.replace(/^### /, '')}
        </h3>
      );
    }

    // Bold inline: **text** — render as paragraph with bolding preserved as-is for now
    return (
      <p key={j} className="text-muted mb-4 leading-relaxed">
        {paragraph}
      </p>
    );
  });
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = reviews.find((r) => r.slug === slug) as ReviewData | undefined;
  if (!review) notFound();

  const otherReviews = reviews.filter((r) => r.slug !== review.slug).slice(0, 4);

  return (
    <>
      <FAQSchema faqs={review.faqs} />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[
          { label: 'Insurance Reviews', href: '/reviews/' },
          { label: review.title },
        ]} />

        <h1 className="text-4xl font-bold text-foreground mb-4">{review.title}</h1>
        <p className="text-lg text-muted mb-8">{review.description}</p>

        {/* Table of contents */}
        <nav className="bg-light border border-border rounded-lg p-6 mb-10">
          <h2 className="font-semibold text-foreground mb-3">In This Review</h2>
          <ul className="space-y-2">
            {review.sections.map((section, i) => (
              <li key={i}>
                <a href={`#section-${i}`} className="text-sm text-trust hover:text-trust-light transition-colors">
                  {section.heading}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className="text-sm text-trust hover:text-trust-light transition-colors">
                Frequently Asked Questions
              </a>
            </li>
          </ul>
        </nav>

        {/* Content sections */}
        {review.sections.map((section, i) => (
          <section key={i} id={`section-${i}`} className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">{section.heading}</h2>
            {renderContent(section.content)}
          </section>
        ))}

        {/* FAQ */}
        <div id="faq">
          <FAQSection faqs={review.faqs} />
        </div>

        {/* Authority links */}
        {reviewAuthorityLinks[review.slug] && (
          <section className="mt-10 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-blue-900 mb-4">Official Resources & Verification Links</h2>
            <ul className="space-y-3">
              {reviewAuthorityLinks[review.slug].map((link, i) => (
                <li key={i} className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline shrink-0"
                  >
                    {link.label}
                  </a>
                  <span className="text-xs text-blue-600 sm:ml-2 sm:mt-0.5">— {link.note}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Other reviews */}
        {otherReviews.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">More Carrier Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherReviews.map((r) => (
                <Link
                  key={r.slug}
                  href={`/reviews/${r.slug}/`}
                  className="bg-light border border-border rounded-lg p-5 hover:shadow-md transition-shadow group"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Cross-links */}
        <section className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/medicare-advantage/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors text-center">
              Compare MA Plans &rarr;
            </Link>
            <Link href="/medicare-supplement/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-trust hover:text-white hover:border-trust transition-colors text-center">
              Compare Medigap Plans &rarr;
            </Link>
            <Link href="/insurance-guides/" className="bg-light border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors text-center">
              Medicare Guides &rarr;
            </Link>
          </div>
        </section>

        <Disclaimer />
      </article>
    </>
  );
}
