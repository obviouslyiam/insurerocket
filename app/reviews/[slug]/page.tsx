import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Disclaimer from '../../components/Disclaimer';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import reviews from '../../../data/carrier-reviews.json';

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
