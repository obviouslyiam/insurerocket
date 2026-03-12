import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Disclaimer from '../../components/Disclaimer';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import guides from '../../../data/guides.json';

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
        </section>

        <Disclaimer />
      </article>
    </>
  );
}
