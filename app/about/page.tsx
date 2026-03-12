import type { Metadata } from 'next';
import Breadcrumbs from '../components/Breadcrumbs';
import Disclaimer from '../components/Disclaimer';
import FAQSchema from '../components/FAQSchema';

export const metadata: Metadata = {
  title: 'About InsureRocket - Medicare Plan Comparison & Education',
  description: 'InsureRocket helps Medicare beneficiaries compare plans and understand their coverage options. Learn about our mission to simplify Medicare decisions.',
};

const faqs = [
  { question: 'Is InsureRocket affiliated with Medicare?', answer: 'No. InsureRocket is not affiliated with or endorsed by the United States government or the federal Medicare program. We provide independent educational information to help beneficiaries understand their options.' },
  { question: 'Does InsureRocket offer every plan in my area?', answer: 'No. We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.' },
  { question: 'Is InsureRocket free to use?', answer: 'Yes. All educational content and plan comparison information on InsureRocket is completely free. There is no cost or obligation to use our resources.' },
];

export default function AboutPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'About' }]} />

        <h1 className="text-4xl font-bold text-foreground mb-6">About InsureRocket</h1>

        <div className="prose max-w-none">
          <p className="text-lg text-muted mb-6">InsureRocket is an independent Medicare and insurance education resource dedicated to helping beneficiaries understand their coverage options and make informed decisions about their healthcare.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Our Mission</h2>
          <p className="text-muted mb-4">Navigating Medicare can be overwhelming. With dozens of plan types, hundreds of carriers, and coverage that varies by county, most beneficiaries struggle to find clear, unbiased information about their options.</p>
          <p className="text-muted mb-4">InsureRocket was built to solve that problem. We provide straightforward, jargon-free educational content about Medicare Advantage, Medicare Supplement (Medigap), Part D prescription drug plans, and the insurance carriers that offer them. Our goal is to give every Medicare beneficiary the information they need to choose the right plan with confidence.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">What We Cover</h2>
          <ul className="list-disc pl-6 text-muted space-y-2 mb-6">
            <li><strong>Medicare Advantage Plans</strong> — State-by-state breakdowns of Medicare Advantage options, top carriers, benefits, and enrollment information</li>
            <li><strong>Medicare Supplement (Medigap) Plans</strong> — Comparisons of Medigap plan types, premium ranges, and coverage details by state</li>
            <li><strong>Part D Prescription Drug Plans</strong> — How Part D works, coverage phases, formularies, and cost-saving strategies</li>
            <li><strong>Insurance Company Reviews</strong> — In-depth profiles of the top Medicare insurance carriers including ratings, plan offerings, and coverage areas</li>
            <li><strong>Medicare Plans by City</strong> — Local plan availability and carrier information for major metropolitan areas</li>
            <li><strong>Educational Guides</strong> — Comprehensive guides on topics like enrollment periods, costs, plan comparisons, and more</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Our Commitment to Accuracy</h2>
          <p className="text-muted mb-4">We strive to provide accurate, up-to-date information about Medicare plans and insurance carriers. Medicare plan details change annually, and we work to keep our content current with the latest plan year information.</p>
          <p className="text-muted mb-4">However, plan availability, benefits, and premiums vary by location and change frequently. We always recommend verifying specific plan details through Medicare.gov or by calling 1-800-MEDICARE (1-800-633-4227) before making enrollment decisions.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Important Disclaimers</h2>
          <ul className="list-disc pl-6 text-muted space-y-2 mb-6">
            <li>InsureRocket is not affiliated with or endorsed by the United States government or the federal Medicare program</li>
            <li>We do not offer every plan available in your area</li>
            <li>Information provided is for educational purposes only and should not be considered medical or insurance advice</li>
            <li>Always verify plan details, benefits, and premiums through official Medicare channels before enrolling</li>
          </ul>
        </div>

        <div className="mt-12">
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
