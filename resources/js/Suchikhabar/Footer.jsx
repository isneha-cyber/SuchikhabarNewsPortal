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
  { label: 'गृहपृष्ठ',          href: '/' },
  { label: 'हाम्रो टिम',        href: '/hamro-team' },
  { label: 'विज्ञापन सम्पर्क',  href: 'https://www.facebook.com/ShuchiKhabar' },
  { label: ' प्राइभेसी पोलिसी',    href: '/privacy-policy' },
];

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/ShuchiKhabar',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: 'https://twitter.com/shuchikhabar',
    label: 'Twitter',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    href: 'https://www.youtube.com/channel/UCUtukCXV6yPNCmtVlo3Emxg',
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/shuchikhabar/',
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
    {/* <div style={{ background: 'rgba(0,0,0,0.18)' }}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-24 py-4">
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
    </div> */}

    {/* ── MIDDLE: 3-column info grid ── */}
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-24 py-10 border-b border-white/15">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">

        {/* ── Col 1: About with Registration Details and Address ── */}
        <div className="flex flex-col">
          {/* Logo */}
          <div className="mb-5">
            <div className="inline-block bg-white p-2">
              <img
                src="/images/logo.png"
                alt="Shuchikhabar"
                className="w-[200px] h-auto"
              />
            </div>
          </div>

          <SectionHeading>हाम्रो बारेमा</SectionHeading>

          {/* <p className="text-[0.84rem] text-white/65 leading-[1.8] mb-4">
         शुचीखबर नेपालको एक विश्वसनीय अनलाइन समाचार पोर्टल हो, जसले नेपाली भाषामा विभिन्न क्षेत्रका ताजा समाचार प्रदान गर्दछ।
          </p> */}

          {/* Address */}
          {/* <div className="mt-2 space-y-1">
            <p className="text-[0.85rem] text-white/80">
              <span className="font-medium">ठेगाना:</span> चन्द्रागिरी नगरपालिका–११, काठमाडौं
            </p>
          </div> */}

          {/* Registration Details */}
          <div className="mt-2 space-y-1">
            <p className="text-[0.85rem] text-white/80 font-medium">
              सूचना विभाग दर्ता नं.: २०७८/०७७-७८
            </p>
            {/* <p className="text-[0.85rem] text-white/80">
              प्रकाशक: शुचि मिडिया एण्ड इभेन्ट प्रा. लि.
            </p> */}
            <p className="text-[0.85rem] text-white/80">
              <span className="font-medium">सम्पादक:</span> प्रदीप ज्ञवाली
            </p>
          </div>
        </div>

        {/* ── Col 2: Useful Links + Social ── */}
        <div className="flex flex-col">
          <SectionHeading>उपयोगी लिंकहरु</SectionHeading>

          <ul className="space-y-2.5 mb-7">
            {USEFUL_LINKS.map(link => (
              <li key={link.label} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000] flex-shrink-0" />
                <Link
                  href={link.href}
                  className="text-[0.84rem] text-white/70 hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div className="mt-2">
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
            शुचि मिडिया एण्ड इभेन्ट प्रा.लि.  <br />
 चन्द्रागिरी नगरपालिका–११, काठमाडौं
         
          </p>

          <div className="space-y-2.5">
            {/* Phone Number */}
            <a
              href="tel: +9779851310487"
              className="flex items-center gap-2.5 text-[0.84rem] text-white/70 hover:text-white transition-colors duration-150 group"
            >
              <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-white/50 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <path d="M22 16.92v3a1.999 1.999 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
         
               +9779851310487
            </a>

            {/* Email */}
            <a
              href="mailto:shuchikhabar@gmail.com"
              className="flex items-center gap-2.5 text-[0.84rem] text-white/70 hover:text-white transition-colors duration-150 group"
            >
              <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-white/50 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
     shuchikhabar@gmail.com
            </a>

            {/* Website */}
            {/* <a
              href="https://shuchikhabar.com"
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
            </a> */}
          </div>

          {/* Partner */}
          <div className="mt-7 pt-6 border-t border-white/10">
            <SectionHeading>हाम्रो साझेदार</SectionHeading>
            <a
              href="https://www.sait.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
              style={{ height: 44 }}
            >
              <img
                src="/images/sait.gif"
                alt="SAIT"
                className="h-12 w-auto object-contain"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-[0.8rem] text-white">
            © {new Date().getFullYear()} shuchikhabar.com — सर्वाधिकार सुरक्षित
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