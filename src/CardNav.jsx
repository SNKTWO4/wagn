import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import './CardNav.css';

function CardNav({
  items,
  className = '',
  ease = 'power3.out',
  baseColor = 'rgba(245, 245, 243, 0.9)',
  menuColor = '#0a0a0a',
  buttonBgColor = '#0a0a0a',
  buttonTextColor = '#f5f5f3',
}) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return 260;
    const contentEl = navEl.querySelector('.card-nav-content');
    if (!contentEl) return 260;
    const previous = {
      visibility: contentEl.style.visibility,
      pointerEvents: contentEl.style.pointerEvents,
      position: contentEl.style.position,
      height: contentEl.style.height,
    };
    contentEl.style.visibility = 'visible';
    contentEl.style.pointerEvents = 'auto';
    contentEl.style.position = 'static';
    contentEl.style.height = 'auto';
    const height = 76 + contentEl.scrollHeight;
    Object.assign(contentEl.style, previous);
    return height;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 48, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    tlRef.current = createTimeline();
    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <button
            type="button"
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label={isExpanded ? '关闭菜单' : '打开菜单'}
            aria-expanded={isExpanded}
            style={{ color: menuColor }}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <a className="card-nav-logo" href="#home" aria-label="周国森作品集">ZHOU GUOSEN</a>

          <a className="card-nav-cta-button" href="#contact" style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}>
            Contact
          </a>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, index) => (
            <div
              key={item.label}
              className="nav-card"
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((link) => (
                  <a key={`${item.label}-${link.href}-${link.label}`} href={link.href} aria-label={link.ariaLabel}>
                    <ArrowUpRight size={15} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default CardNav;
