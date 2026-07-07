import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const MOBILE_BREAKPOINT = 768;

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

function createParticle(x, y, color) {
  const particle = document.createElement('span');
  particle.className = 'magic-particle';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.setProperty('--magic-glow-rgb', color);
  return particle;
}

export function MagicBentoGrid({
  children,
  className = '',
  enableSpotlight = true,
  glowColor = '217, 164, 65',
  spotlightRadius = 300,
}) {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();

  useEffect(() => {
    if (!enableSpotlight || isMobile || !gridRef.current) return undefined;
    const grid = gridRef.current;
    const handleMouseMove = (event) => {
      const rect = grid.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      grid.style.setProperty('--spotlight-opacity', inside ? '1' : '0');
      grid.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
      grid.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
      grid.style.setProperty('--spotlight-radius', `${spotlightRadius}px`);
      grid.style.setProperty('--magic-glow-rgb', glowColor);
    };
    const handleMouseLeave = () => grid.style.setProperty('--spotlight-opacity', '0');
    window.addEventListener('mousemove', handleMouseMove);
    grid.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      grid.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableSpotlight, glowColor, isMobile, spotlightRadius]);

  return (
    <div className={`magic-bento-grid bento-section ${className}`} ref={gridRef}>
      {children}
    </div>
  );
}

function MagicBentoCard({
  children,
  className = '',
  glowColor = '217, 164, 65',
  enableStars = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
}) {
  const cardRef = useRef(null);
  const isMobile = useMobileDetection();

  useEffect(() => {
    const card = cardRef.current;
    if (!card || isMobile) return undefined;
    const particles = [];

    const handleMouseMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
      card.style.setProperty('--glow-intensity', '1');

      if (enableTilt) {
        gsap.to(card, {
          rotateX: ((y - centerY) / centerY) * -5,
          rotateY: ((x - centerX) / centerX) * 5,
          duration: 0.18,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        gsap.to(card, { x: (x - centerX) * 0.025, y: (y - centerY) * 0.025, duration: 0.28, ease: 'power2.out' });
      }
    };

    const handleMouseEnter = () => {
      card.style.setProperty('--glow-intensity', '1');
      if (!enableStars) return;
      const rect = card.getBoundingClientRect();
      for (let i = 0; i < 8; i += 1) {
        const particle = createParticle(Math.random() * rect.width, Math.random() * rect.height, glowColor);
        card.appendChild(particle);
        particles.push(particle);
        gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, delay: i * 0.04, ease: 'back.out(1.7)' });
        gsap.to(particle, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, opacity: 0.25, duration: 1.6, repeat: -1, yoyo: true });
      }
    };

    const clearParticles = () => {
      particles.splice(0).forEach((particle) => {
        gsap.to(particle, { scale: 0, opacity: 0, duration: 0.2, onComplete: () => particle.remove() });
      });
    };

    const handleMouseLeave = () => {
      card.style.setProperty('--glow-intensity', '0');
      clearParticles();
      gsap.to(card, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
    };

    const handleClick = (event) => {
      if (!clickEffect) return;
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'magic-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      ripple.style.setProperty('--magic-glow-rgb', glowColor);
      card.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 0.7 }, { scale: 18, opacity: 0, duration: 0.75, ease: 'power2.out', onComplete: () => ripple.remove() });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('click', handleClick);
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('click', handleClick);
      clearParticles();
    };
  }, [clickEffect, enableMagnetism, enableStars, enableTilt, glowColor, isMobile]);

  return (
    <div className={`magic-bento-card ${className}`} ref={cardRef} style={{ '--magic-glow-rgb': glowColor }}>
      {children}
    </div>
  );
}

export default MagicBentoCard;
