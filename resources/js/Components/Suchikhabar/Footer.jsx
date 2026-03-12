import React from 'react';
import { Link } from '@inertiajs/react';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: 'मुख्य',            href: '/category/मुख्य' },
  { label: 'समाचार',           href: '/category/समाचार' },
  { label: 'अर्थतन्त्र',      href: '/category/अर्थतन्त्र' },
  { label: 'अन्तर्राष्ट्रिय', href: '/category/अन्तर्राष्ट्रिय' },
  { label: 'खेलकुद',           href: '/category/खेलकुद' },
  { label: 'मनोरञ्जन',         href: '/category/मनोरञ्जन' },
  { label: 'कृषि',             href: '/category/कृषि' },
  { label: 'स्वास्थ्य',        href: '/category/स्वास्थ्य' },
  { label: 'धार्मिक',          href: '/category/धार्मिक' },
  { label: 'विचार',            href: '/category/विचार' },
];

const USEFUL_LINKS = [
  { label: 'विज्ञापन सम्पर्क',  href: '#' },
  { label: 'समाचार पठाउनुहोस्', href: '#' },
  { label: 'गोपनीयता नीति',     href: '#' },
  { label: 'सेवाका सर्तहरू',    href: '#' },
];

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/shuchikhabar',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

// ─── REUSABLE SECTION HEADING ──────────────────────────────────────────────────
const SectionHeading = ({ children }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <div className="w-[3px] h-5 bg-[#8B0000] rounded-sm flex-shrink-0" />
    <h4 className="text-[0.9rem] font-bold text-white tracking-wide">{children}</h4>
  </div>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="text-white" style={{ background: '#00649b' }}>

    {/* ── TOP: Categories strip ── */}
    <div style={{ background: 'rgba(0,0,0,0.18)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-[3px] h-5 bg-[#8B0000] rounded-sm flex-shrink-0" />
          <h3 className="text-[0.78rem] font-bold text-white/90 tracking-widest uppercase">
            शुचीखबरका विभागहरु
          </h3>
        </div>
        <div className="flex flex-wrap gap-y-2">
          {CATEGORIES.map((cat, i) => (
            <span key={cat.label} className="flex items-center">
              <Link
                href={cat.href}
                className="text-[0.83rem] text-white/75 hover:text-white transition-colors duration-150 whitespace-nowrap px-3 first:pl-0"
              >
                {cat.label}
              </Link>
              {i < CATEGORIES.length - 1 && (
                <span className="text-white/25 text-[0.7rem] select-none leading-none">│</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* ── MIDDLE: 3-column info grid ── */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-white/15">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">

        {/* ── Col 1: About ── */}
        <div className="flex flex-col">
          {/* Logo — fixed size, white bg pill */}
          <div className="mb-5 inline-flex">
            <div className="bg-white px-2 py-1inline-flex items-center justify-center"
                 style={{ width: 190, height: 52 }}>
              <img
                src="/images/logo.png"
                alt="Shuchikhabar"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>

          <SectionHeading>हाम्रो बारेमा</SectionHeading>

          <p className="text-[0.84rem] text-white/65 leading-[1.8] flex-1">
            शुचीखबर नेपालको एक विश्वसनीय अनलाइन समाचार पोर्टल हो। यो पोर्टलले नेपाली भाषामा
            राजनीति, अर्थतन्त्र, खेलकुद, मनोरञ्जन, कृषि, स्वास्थ्य लगायत विभिन्न क्षेत्रका
            ताजा समाचार र विश्लेषण प्रदान गर्दछ।
          </p>

          {/* Stats row — fills the empty space naturally */}
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
            {[
              { num: '१२+', label: 'वर्षदेखि' },
              { num: '५०क+', label: 'पाठकहरू' },
              { num: '२४/७', label: 'समाचार' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-[1.1rem] font-bold text-white leading-tight">{stat.num}</div>
                <div className="text-[0.7rem] text-white/45 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Col 2: Useful Links + Social ── */}
        <div className="flex flex-col">
          <SectionHeading>उपयोगी लिंकहरु</SectionHeading>

          <ul className="space-y-2.5 mb-7">
            {USEFUL_LINKS.map(link => (
              <li key={link.label} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000] flex-shrink-0" />
                <a
                  href={link.href}
                  className="text-[0.84rem] text-white/70 hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div className="mt-auto">
            <p className="text-[0.75rem] text-white/40 uppercase tracking-widest mb-3 font-medium">
              सामाजिक सञ्जाल
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-white/80
                             hover:bg-[#8B0000] hover:border-[#8B0000] hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Col 3: Contact + Partner ── */}
        <div className="flex flex-col">
          {/* Contact */}
          <SectionHeading>सम्पर्क ठेगाना</SectionHeading>

          <p className="text-[0.84rem] text-white/65 leading-[1.8] mb-4">
            शुचीखबर मिडिया प्रा.लि.<br />
            काठमाडौं, नेपाल
          </p>

          <div className="space-y-2.5">
            <a
              href="mailto:info@shuchikhabar.com"
              className="flex items-center gap-2.5 text-[0.84rem] text-white/70 hover:text-white transition-colors duration-150 group"
            >
              <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-white/50 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              info@shuchikhabar.com
            </a>
            <a
              href="http://shuchikhabar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[0.84rem] text-white/70 hover:text-white transition-colors duration-150 group"
            >
              <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-white/50 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              www.shuchikhabar.com
            </a>
          </div>

          {/* Partner */}
          <div className="mt-7 pt-6 border-t border-white/10">
            <SectionHeading>हाम्रो साझेदार</SectionHeading>
            <a
              href="https://www.sait.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white/20 rounded px-3 py-1.5
                         hover:border-white/40 hover:bg-white/5 transition-all duration-200"
              style={{ height: 44 }}
            >
              <img
                src="/images/sait.gif"
                alt="SAIT"
                style={{ height: 28, width: 'auto', objectFit: 'contain' }}
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
              <div
                className="hidden items-center justify-center text-white text-[0.72rem] font-bold tracking-widest"
                style={{ display: 'none' }}
              >
                SAIT
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>

    {/* ── BOTTOM: copyright bar ── */}
    <div style={{ background: 'rgba(0,0,0,0.22)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[0.8rem] text-white">
            ©२०२६ shuchikhabar.com — सर्वाधिकार सुरक्षित
          </p>
          <div className="flex items-center gap-1.5 text-[0.8rem] text-white">
            <span>Crafted by :</span>
            <a
              href="https://sait.com.np/"
              className="text-white/60 text-[0.8rem] hover:text-white transition-colors duration-150 font-medium"
            >
              S.A.I.T Solution Trade &amp; Concern
            </a>
          </div>
        </div>
      </div>
    </div>

  </footer>
);

export default Footer;