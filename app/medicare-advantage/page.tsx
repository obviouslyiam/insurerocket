import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '../components/Breadcrumbs';
import Disclaimer from '../components/Disclaimer';
import FAQSchema from '../components/FAQSchema';
import states from '../../data/states.json';

export const metadata: Metadata = {
  title: 'Medicare Advantage Plans by State - Compare MA Plans',
  description: 'Compare Medicare Advantage (Part C) plans in all 50 states. Find top carriers, plan options, benefits, and enrollment information for your state.',
};

const faqs = [
  { question: 'What is Medicare Advantage?', answer: 'Medicare Advantage (Part C) is a type of Medicare plan offered by private insurance companies that contracts with Medicare. These plans provide all Part A and Part B benefits, usually include Part D drug coverage, and often offer extra benefits like dental, vision, and hearing.' },
  { question: 'How much do Medicare Advantage plans cost?', answer: 'Many Medicare Advantage plans have $0 monthly premiums beyond your Part B premium. You will have copays and coinsurance when using services, with an annual out-of-pocket maximum for financial protection.' },
  { question: 'Can I see any doctor with Medicare Advantage?', answer: 'Most MA plans use provider networks. HMO plans require you to use in-network providers. PPO plans allow out-of-network care at a higher cost. Always verify your preferred doctors are in-network before enrolling.' },
  { question: 'When can I enroll in a Medicare Advantage plan?', answer: 'You can enroll during your Initial Enrollment Period (around your 65th birthday), the Annual Enrollment Period (October 15 - December 7), or during a Special Enrollment Period if you have a qualifying life event.' },
];

export default function MedicareAdvantagePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Medicare Advantage' }]} />

        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Medicare Advantage Plans by State</h1>
          <p className="text-lg text-muted">Compare Medicare Advantage (Part C) plans available in your state. Find top carriers, plan types, benefits, and enrollment information to help you choose the right coverage.</p>
        </div>

        {/* Overview section */}
        <div className="bg-light border border-border rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Understanding Medicare Advantage Plans</h2>
          <p className="text-muted mb-4">Medicare Advantage plans are offered by private insurance companies approved by Medicare. They combine your Part A (hospital), Part B (medical), and usually Part D (prescription drug) coverage into a single plan. Most plans also include extra benefits not covered by Original Medicare, such as dental, vision, hearing, and fitness programs.</p>
          <p className="text-muted mb-4">Key advantages include annual out-of-pocket maximums for financial protection, many $0 premium options, additional benefits beyond Original Medicare, and coordinated care management. Plan availability and benefits vary by county, so it is important to compare options specific to your location.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-accent">3,400+</p>
              <p className="text-sm text-muted">MA Plans Nationwide</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-trust">51%</p>
              <p className="text-sm text-muted">Of Eligible Beneficiaries Enrolled</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">$0</p>
              <p className="text-sm text-muted">Premium on Many Plans</p>
            </div>
          </div>
        </div>

        {/* State grid */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Select Your State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/medicare-advantage/${state.slug}/`}
              className="bg-white border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors"
            >
              {state.name}
            </Link>
          ))}
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
