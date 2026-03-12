import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link, usePage, router } from '@inertiajs/react';
import { FaHouse } from "react-icons/fa6";
import NepaliDate from "nepali-date-converter";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { name: 'मुख्य', route: '/category/मुख्य' },
  { name: 'समाचार', route: '/category/समाचार' },
  { name: 'अर्थतन्त्र', route: '/category/अर्थतन्त्र' },
  { name: 'अन्तर्राष्ट्रिय', route: '/category/अन्तर्राष्ट्रिय' },
  { name: 'खेलकुद', route: '/category/खेलकुद' },
  { name: 'मनोरञ्जन', route: '/category/मनोरञ्जन' },
  { name: 'कृषि', route: '/category/कृषि' },
];

// Dropdown items for "अन्य"
const ANYA_DROPDOWN = [
  { name: 'स्वास्थ्य', route: '/category/स्वास्थ्य' },
  { name: 'धार्मिक', route: '/category/धार्मिक' },
  { name: 'विचार', route: '/category/विचार' },
];

// ─── DATE UTILITIES ───────────────────────────────────────────────────────────
// const FIXED_DATE = new Date("2026-07-16T00:00:00+05:45");

const FIXED_DATE = new Date();

// Convert english digits → nepali digits
const toNepaliDigits = (num) => {
  const nepaliNums = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).split('').map(d => nepaliNums[d] ?? d).join('');
};

const getNepaliDate = () => {
  try {
    const nepaliDate = new NepaliDate(FIXED_DATE);

    const nepaliMonths = [
      "वैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज",
      "कार्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत्र"
    ];

    const nepaliWeekdays = [
      "आइतबार", "सोमबार", "मङ्गलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"
    ];

    const day   = toNepaliDigits(nepaliDate.getDate());
    const month = nepaliMonths[nepaliDate.getMonth()];
    const year  = toNepaliDigits(nepaliDate.getYear());

    // Get correct weekday in Nepal timezone (+05:45)
    const nepalOffsetMs = (5 * 60 + 45) * 60 * 1000;
    const nepalTime     = new Date(FIXED_DATE.getTime() + nepalOffsetMs);
    const weekday       = nepaliWeekdays[nepalTime.getUTCDay()];

    return `${day} ${month} ${year}, ${weekday}`;
  } catch (error) {
    return "";
  }
};

const getEnglishDate = () => {
  return FIXED_DATE.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kathmandu",
  });
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
const SearchIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const CloseIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// ─── LOGO COMPONENT ───────────────────────────────────────────────────────────
const Logo = ({ className = 'h-11', variant = 'default' }) => {
  const [imgError, setImgError] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!logoRef.current) return;
    gsap.fromTo(logoRef.current,
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 0.1 }
    );
  }, []);

  return (
    <Link href="/" ref={logoRef} className="flex items-center gap-2 no-underline flex-shrink-0 group bg-white">
      {!imgError ? (
        <div className="relative h-18">
          <img
            src="/images/logo.png"
            alt="Shuchikhabar"
            className={`${className} h-18 object-contain relative z-20`}
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="relative flex flex-col leading-none select-none" />
      )}
    </Link>
  );
};

// ─── SEARCH MODAL ─────────────────────────────────────────────────────────────
const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery]     = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const modalRef   = useRef(null);
  const inputRef   = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      if (saved) setRecentSearches(JSON.parse(saved).slice(0, 5));
    } catch {}
  }, []);

  useEffect(() => {
    if (!modalRef.current || !overlayRef.current) return;
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out', pointerEvents: 'auto' });
      gsap.fromTo(modalRef.current, { y: -40, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in', pointerEvents: 'none' });
      gsap.to(modalRef.current, { y: -30, opacity: 0, scale: 0.97, duration: 0.2, ease: 'power2.in' });
    }
  }, [isOpen]);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    try { localStorage.setItem('recentSearches', JSON.stringify(updated)); } catch {}
    router.visit(`/search?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  const handleRecentClick = (q) => {
    setSearchQuery(q);
    router.visit(`/search?q=${encodeURIComponent(q)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div ref={overlayRef} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" style={{ opacity: 0, pointerEvents: 'none' }} />
      <div ref={modalRef} className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-lg z-[70] bg-white rounded-xl shadow-2xl overflow-hidden" style={{ opacity: 0 }}>
        <div className="p-5">
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <SearchIcon size={18} className="text-[#a09488] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="खोज्नुहोस्..."
              className="flex-1 text-base outline-none border-none bg-transparent text-[#1c1711] placeholder:text-[#c0b8b0]"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="text-[#a09488] hover:text-[#1c1711] transition-colors">
                <CloseIcon size={18} />
              </button>
            )}
          </form>
        </div>

        {recentSearches.length > 0 && (
          <div className="border-t border-[rgba(28,23,17,0.08)] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.62rem] font-semibold text-[#a09488] uppercase tracking-wider">भर्खरको खोजी</span>
              <button
                onClick={() => { setRecentSearches([]); try { localStorage.removeItem('recentSearches'); } catch {} }}
                className="text-[0.62rem] text-[#a09488] hover:text-[#8B0000] transition-colors"
              >
                सबै हटाउनुहोस्
              </button>
            </div>
            <div className="space-y-1">
              {recentSearches.map((q, i) => (
                <button key={i} onClick={() => handleRecentClick(q)}
                  className="flex items-center gap-2 w-full text-left text-sm text-[#1c1711] hover:text-[#8B0000] py-1 transition-colors group">
                  <span className="text-[#c9a84c] text-[0.6rem]">◈</span>
                  <span>{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-[rgba(28,23,17,0.08)] bg-[#faf9f8] px-5 py-3 flex items-center gap-5 text-[0.6rem] text-[#a09488]">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white rounded border border-[rgba(28,23,17,0.12)] text-[10px] font-mono">↵</kbd>
            खोज
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white rounded border border-[rgba(28,23,17,0.12)] text-[10px] font-mono">esc</kbd>
            बन्द
          </span>
        </div>
      </div>
    </>
  );
};

// ─── ANYA DROPDOWN NAV ITEM ───────────────────────────────────────────────────
const AnyaDropdown = ({ isMobile = false }) => {
  const [open, setOpen]   = useState(false);
  const dropdownRef       = useRef(null);
  const menuRef           = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.set(menuRef.current, { display: 'block' });
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -6, scale: 0.96, transformOrigin: 'top left' },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0, y: -4, scale: 0.97, duration: 0.15, ease: 'power2.in',
        onComplete: () => gsap.set(menuRef.current, { display: 'none' }),
      });
    }
  }, [open]);

  if (isMobile) {
    return (
      <div>
        <button
          onClick={() => setOpen(p => !p)}
          className={`flex items-center justify-between w-full px-6 py-3 text-[0.85rem] font-medium tracking-wide transition-colors
            ${open ? 'text-[#8B0000] bg-[rgba(139,0,0,0.04)]' : 'text-[#1c1711] hover:text-[#8B0000] hover:bg-[rgba(139,0,0,0.03)]'}`}
        >
          <span>अन्य</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            className="transition-transform duration-200 flex-shrink-0"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && (
          <div className="bg-[#faf9f7] border-t border-[rgba(28,23,17,0.06)]">
            {ANYA_DROPDOWN.map((item, i) => (
              <Link key={i} href={item.route}
                className="flex items-center gap-2 px-9 py-2.5 text-[0.85rem] text-[#4a3f35] hover:text-[#8B0000] hover:bg-[rgba(139,0,0,0.03)] transition-colors">
                <span className="w-1 h-1 rounded-full bg-[#c9a84c] flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="relative flex-shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`relative flex items-center gap-1 px-7 py-1 lg:px-4 lg:py-[14px] text-[0.85rem] lg:text-[1rem] font-medium tracking-wide whitespace-nowrap transition-colors
          ${open ? 'text-[#8B0000]' : 'text-[#1c1711] hover:text-[#8B0000]'}`}
      >
        अन्य
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className="transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
        {open && <span className="absolute bottom-0 left-3 lg:left-4 right-3 lg:right-4 h-[2px] rounded-t bg-[#8B0000]" />}
      </button>

      <div
        ref={menuRef}
        className="absolute top-full left-0 z-[200] bg-white shadow-2xl border border-[rgba(28,23,17,0.08)] rounded-b-lg overflow-hidden min-w-[168px]"
        style={{ display: 'none', opacity: 0 }}
      >
        {ANYA_DROPDOWN.map((item, i) => (
          <Link key={i} href={item.route}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-[1rem] text-[#1c1711] hover:text-[#8B0000] hover:bg-[rgba(139,0,0,0.03)] transition-colors group border-b border-[rgba(28,23,17,0.04)] last:border-0">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

// ─── HAMBURGER ICON ───────────────────────────────────────────────────────────
const HamburgerIcon = ({ open }) => (
  <div className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
    <span className="block h-[1.5px] bg-[#1c1711] transition-all duration-300 origin-center"
      style={{ width: '18px', transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
    <span className="block h-[1.5px] bg-[#1c1711] transition-all duration-300"
      style={{ width: '14px', opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'scaleX(1)' }} />
    <span className="block h-[1.5px] bg-[#1c1711] transition-all duration-300 origin-center"
      style={{ width: '18px', transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
  </div>
);

// ─── MOBILE DRAWER ────────────────────────────────────────────────────────────
const MobileDrawer = ({ open, activeNav, setActiveNav, onClose }) => {
  const drawerRef  = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef   = useRef([]);

  useEffect(() => {
    if (!drawerRef.current) return;
    if (open) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out', pointerEvents: 'auto' });
      gsap.fromTo(drawerRef.current, { x: '-100%', opacity: 0.6 }, { x: '0%', opacity: 1, duration: 0.35, ease: 'power3.out' });
      gsap.fromTo(itemsRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.04, delay: 0.15, ease: 'power2.out' });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in', pointerEvents: 'none' });
      gsap.to(drawerRef.current, { x: '-100%', opacity: 0.6, duration: 0.25, ease: 'power2.in' });
    }
  }, [open]);

  return (
    <>
      <div ref={overlayRef} onClick={onClose} className="fixed inset-0 bg-black/40 z-40" style={{ opacity: 0, pointerEvents: 'none' }} />
      <div ref={drawerRef} className="fixed top-0 left-0 h-full z-50 bg-white shadow-2xl flex flex-col"
        style={{ width: '72vw', maxWidth: '300px', transform: 'translateX(-100%)' }}>

        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(28,23,17,0.1)] bg-[#faf9f7]">
          <Logo className="h-8" variant="compact" />
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#1c1711] hover:text-[#8B0000] transition-colors">
            <CloseIcon />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col py-3 overflow-y-auto flex-1">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 text-[1rem] font-medium tracking-wide text-[#1c1711] hover:text-[#8B0000] hover:bg-[rgba(139,0,0,0.03)] transition-colors"
          >
            <FaHouse className="text-[20px]" />
          </Link>

          {NAV_ITEMS.map((item, i) => (
            <Link key={i} href={item.route}
              ref={el => itemsRef.current[i] = el}
              onClick={() => { setActiveNav(i); onClose(); }}
              className={`text-left px-6 py-3 text-[0.85rem] font-medium tracking-wide transition-colors relative ${
                activeNav === i ? 'text-[#8B0000] bg-[rgba(139,0,0,0.04)]' : 'text-[#1c1711] hover:text-[#8B0000] hover:bg-[rgba(139,0,0,0.03)]'
              }`}>
              {activeNav === i && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#8B0000] rounded-r" />}
              {item.name}
            </Link>
          ))}

          <AnyaDropdown isMobile />
        </nav>

        {/* Date footer */}
        <div className="px-6 py-4 border-t border-[rgba(28,23,17,0.08)] bg-[#faf9f7]">
          <p className="text-[0.6rem] tracking-[0.1em] text-[#a09488]">{getNepaliDate()}</p>
          <p className="text-[0.58rem] text-[#c0b8b0] mt-0.5">{getEnglishDate()}</p>
        </div>
      </div>
    </>
  );
};

// ─── MAIN NAVBAR ──────────────────────────────────────────────────────────────
const Navbar = () => {
  const { url } = usePage();
  const [activeNav, setActiveNav]         = useState(-1);
  const [scrolled, setScrolled]           = useState(false);
  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const headerRef    = useRef(null);
  const stickyNavRef = useRef(null);

  useEffect(() => {
    const path = url.split('?')[0];
    const idx  = NAV_ITEMS.findIndex(item => path === item.route);
    setActiveNav(idx !== -1 ? idx : -1);
  }, [url]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.to(headerRef.current, scrolled
      ? { y: -80, opacity: 0, duration: 0.3, ease: 'power2.in' }
      : { y: 0,   opacity: 1, duration: 0.35, ease: 'power2.out' }
    );
  }, [scrolled]);

  useEffect(() => {
    if (!stickyNavRef.current || !scrolled) return;
    gsap.fromTo(stickyNavRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
  }, [scrolled]);

  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchModalOpen(true); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  return (
    <>
      {/* ── HEADER (logo area, desktop only, hides on scroll) ── */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-[#00649b] hidden md:block"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="flex items-center justify-between px-6 lg:px-12 h-[72px] border-b border-[rgba(28,23,17,0.08)]">
          <div className="relative flex items-center gap-4">
            <Logo className="h-14" />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2 text-sm text-white tracking-wide">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span>{getNepaliDate()}</span>
              <span className="text-white">|</span>
              <span>{getEnglishDate()}</span>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="group flex items-center gap-2 px-5 h-8 border border-white transition-all duration-200 rounded-sm text-md text-white"
                aria-label="Search"
              >
                <SearchIcon size={16} />
                <span className="hidden lg:inline">खोज्नुहोस्</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── NAVBAR ── */}
      <nav
        ref={stickyNavRef}
        className={`z-40 bg-white border-b border-[rgba(28,23,17,0.14)] overflow-visible
          ${scrolled ? 'fixed top-0 left-0 right-0 shadow-md' : 'sticky top-[74px] md:top-0 md:relative border-t border-[rgba(28,23,17,0.06)]'}
        `}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* ── DESKTOP NAV ── */}
        <div className="hidden md:flex items-center justify-between px-6 lg:px-12 h-[55px]">
          {scrolled && (
            <div className="mr-5 flex-shrink-0">
              <Logo variant="compact" />
            </div>
          )}

          <div className={`flex items-center gap-4 ${scrolled ? 'flex-1 justify-end' : 'w-full justify-center'}`}>
            <div className="flex items-center">
              <Link
                href="/"
                className={`relative px-3 lg:px-4 py-[14px] flex items-center text-[0.9rem] transition-colors
                  ${url === '/' ? 'text-[#1c1711]' : 'text-[#1c1711] hover:text-[#8B0000]'}`}
              >
                <FaHouse className="text-[20px]" />
              </Link>

              {NAV_ITEMS.map((item, i) => (
                <Link key={i} href={item.route}
                  className={`relative px-3 lg:px-4 py-[14px] text-[0.72rem] lg:text-[1rem] font-medium tracking-wide whitespace-nowrap transition-colors flex-shrink-0
                    ${activeNav === i ? 'text-[#8B0000]' : 'text-[#1c1711] hover:text-[#8B0000]'}`}>
                  {item.name}
                  {activeNav === i && (
                    <span className="absolute bottom-0 left-3 lg:left-4 right-3 lg:right-4 h-[2px] rounded-t bg-[#8B0000]" />
                  )}
                  <span className="absolute bottom-0 left-3 lg:left-4 right-3 lg:right-4 h-[2px] rounded-t bg-[#c9a84c]/0 hover:bg-[#c9a84c]/40 transition-colors duration-200" />
                </Link>
              ))}

              <AnyaDropdown />
            </div>

            {scrolled && (
              <button
                onClick={() => setSearchModalOpen(true)}
                className="ml-4 w-8 h-8 border border-[rgba(28,23,17,0.12)] hover:border-[#8B0000]/40 flex items-center justify-center transition-all rounded-sm"
                aria-label="Search"
              >
                <SearchIcon size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ── MOBILE NAV ── */}
        <div className="flex md:hidden items-center justify-between px-4 h-[52px]">
          <Logo className="h-8" variant="compact" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="w-8 h-8 flex items-center justify-center text-[#1c1711]"
              aria-label="Search"
            >
              <SearchIcon size={15} />
            </button>
            {!drawerOpen && (
              <button
                onClick={() => setDrawerOpen(p => !p)}
                className="w-8 h-8 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <HamburgerIcon open={drawerOpen} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <MobileDrawer
        open={drawerOpen}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onClose={() => setDrawerOpen(false)}
      />

      {/* ── SEARCH MODAL ── */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};

export default Navbar;