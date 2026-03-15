import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Carrier logos */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-white/60 mb-4">Trusted Insurance Carriers</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
            <img src="/carriers/aetna.png" alt="Aetna" className="h-8 brightness-0 invert" />
            <img src="/carriers/bluecross.png" alt="Blue Cross Blue Shield" className="h-8 brightness-0 invert" />
            <img src="/carriers/cigna.png" alt="Cigna" className="h-8 brightness-0 invert" />
            <img src="/carriers/united.png" alt="UnitedHealthcare" className="h-8 brightness-0 invert" />
            <img src="/carriers/first.png" alt="First Health" className="h-8 brightness-0 invert" />
            <img src="/carriers/tricare.png" alt="TRICARE" className="h-8 brightness-0 invert" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img src="/logo-footer.png" alt="InsureRocket" className="h-10 mb-4" />
            <p className="text-sm text-white/60">Compare Medicare and insurance plans to find the right coverage for your needs.</p>
          </div>

          {/* Medicare */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Medicare</h3>
            <ul className="space-y-2">
              <li><Link href="/medicare-advantage/" className="text-sm text-white/60 hover:text-white transition-colors">Medicare Advantage</Link></li>
              <li><Link href="/medicare-supplement/" className="text-sm text-white/60 hover:text-white transition-colors">Medicare Supplement</Link></li>
              <li><Link href="/prescription-drug-plans/" className="text-sm text-white/60 hover:text-white transition-colors">Prescription Drug Plans</Link></li>
              <li><Link href="/insurance-guides/" className="text-sm text-white/60 hover:text-white transition-colors">Insurance Guides</Link></li>
            </ul>
          </div>

          {/* Top Carriers */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Top Carriers</h3>
            <ul className="space-y-2">
              <li><Link href="/insurance-companies/unitedhealthcare/" className="text-sm text-white/60 hover:text-white transition-colors">UnitedHealthcare</Link></li>
              <li><Link href="/insurance-companies/humana/" className="text-sm text-white/60 hover:text-white transition-colors">Humana</Link></li>
              <li><Link href="/insurance-companies/aetna/" className="text-sm text-white/60 hover:text-white transition-colors">Aetna</Link></li>
              <li><Link href="/insurance-companies/cigna/" className="text-sm text-white/60 hover:text-white transition-colors">Cigna</Link></li>
              <li><Link href="/insurance-companies/kaiser-permanente/" className="text-sm text-white/60 hover:text-white transition-colors">Kaiser Permanente</Link></li>
              <li><Link href="/insurance-companies/blue-cross-blue-shield/" className="text-sm text-white/60 hover:text-white transition-colors">Blue Cross Blue Shield</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/guides/what-is-medicare-advantage/" className="text-sm text-white/60 hover:text-white transition-colors">What Is Medicare Advantage?</Link></li>
              <li><Link href="/guides/when-to-enroll-in-medicare/" className="text-sm text-white/60 hover:text-white transition-colors">When to Enroll</Link></li>
              <li><Link href="/guides/how-to-choose-a-medicare-plan/" className="text-sm text-white/60 hover:text-white transition-colors">How to Choose a Plan</Link></li>
              <li><Link href="/about/" className="text-sm text-white/60 hover:text-white transition-colors">About InsureRocket</Link></li>
            </ul>
          </div>
        </div>

        {/* Partner sites + official links */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">Official Medicare Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                  Medicare.gov — Official Plan Finder &amp; Enrollment
                </a>
              </li>
              <li>
                <a href="https://www.cms.gov/medicare/health-drug-plans/medicareadvtgspecneeds/downloads/2026-star-ratings" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                  CMS.gov — 2026 Star Ratings
                </a>
              </li>
              <li>
                <a href="https://www.ssa.gov/medicare/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                  SSA.gov — Medicare Enrollment via Social Security
                </a>
              </li>
              <li>
                <a href="https://www.shiphelp.org" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                  SHIP — Free Medicare Counseling in Your State
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">More Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.bankingdeal.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                  BankingDeal.com — Compare Savings Accounts &amp; CDs for Retirement
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="space-y-3 text-xs text-white/40">
            <p>We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.</p>
            <p>Plan availability, benefits, and premiums vary by location. The information provided on this website is for educational purposes only and should not be considered as medical or insurance advice. Contact Medicare.gov or 1-800-MEDICARE for complete information.</p>
            <p>InsureRocket.com is not affiliated with or endorsed by the United States government or the federal Medicare program.</p>
            <p>&copy; {new Date().getFullYear()} InsureRocket.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
