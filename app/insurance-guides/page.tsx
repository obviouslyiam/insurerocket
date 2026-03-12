import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '../components/Breadcrumbs';
import Disclaimer from '../components/Disclaimer';
import FAQSchema from '../components/FAQSchema';
import guides from '../../data/guides.json';

export const metadata: Metadata = {
  title: 'Medicare Insurance Guides - Free Educational Resources',
  description: 'Free Medicare guides covering enrollment, costs, plan comparisons, and coverage options. Learn everything you need to know to make confident Medicare decisions.',
};

const faqs = [
  { question: 'Where can I learn about Medicare for free?', answer: 'InsureRocket provides free educational guides covering all aspects of Medicare, including plan types, enrollment periods, costs, and how to choose the right coverage. You can also visit Medicare.gov or call 1-800-MEDICARE for official information.' },
  { question: 'What are the different types of Medicare?', answer: 'Medicare has four parts: Part A (hospital insurance), Part B (medical insurance), Part C (Medicare Advantage — private plans that combine A, B, and usually D), and Part D (prescription drug coverage). You may also purchase a Medicare Supplement (Medigap) policy with Original Medicare.' },
];

export default function InsuranceGuidesPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Insurance Guides' }]} />

        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Medicare & Insurance Guides</h1>
          <p className="text-lg text-muted">Free educational guides to help you understand Medicare coverage options, enrollment periods, costs, and how to choose the right plan for your needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}/`} className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-shadow group">
              <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{guide.title.replace(/ - .*| for 2026| in 2026/g, '')}</h2>
              <p className="text-sm text-muted mb-4">{guide.summary}</p>
              <span className="text-accent font-semibold text-sm group-hover:text-accent-dark transition-colors">Read Guide &rarr;</span>
            </Link>
          ))}
        </div>

        {/* Related sections */}
        <div className="bg-light border border-border rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Explore More Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/medicare-advantage/" className="bg-white border border-border rounded-lg px-4 py-4 text-center hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-1">Medicare Advantage</h3>
              <p className="text-xs text-muted">Plans by state</p>
            </Link>
            <Link href="/medicare-supplement/" className="bg-white border border-border rounded-lg px-4 py-4 text-center hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-1">Medicare Supplement</h3>
              <p className="text-xs text-muted">Medigap plans by state</p>
            </Link>
            <Link href="/prescription-drug-plans/" className="bg-white border border-border rounded-lg px-4 py-4 text-center hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-1">Part D Plans</h3>
              <p className="text-xs text-muted">Prescription drug coverage</p>
            </Link>
            <Link href="/insurance-companies/unitedhealthcare/" className="bg-white border border-border rounded-lg px-4 py-4 text-center hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-1">Company Reviews</h3>
              <p className="text-xs text-muted">Carrier comparisons</p>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <Disclaimer />
      </div>
    </>
  );
}
