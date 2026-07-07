import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

function SplitText({
  text = '',
  tag = 'p',
  className = '',
  delay = 45,
  duration = 0.9,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 34 },
  to = { opacity: 1, y: 0 },
  textAlign = 'left',
}) {
  const ref = useRef(null);
  const parts = useMemo(() => {
    if (splitType === 'words') return text.split(/(\s+)/);
    return Array.from(text);
  }, [splitType, text]);
  const Tag = tag;

  useEffect(() => {
    if (!ref.current) return undefined;
    const targets = ref.current.querySelectorAll('[data-split-part]');
    const tween = gsap.fromTo(targets, from, { ...to, duration, ease, stagger: delay / 1000 });
    return () => tween.kill();
  }, [delay, duration, ease, from, to, text]);

  return (
    <Tag ref={ref} className={`split-parent ${className}`} style={{ textAlign }}>
      {parts.map((part, index) => (
        <span className="split-part" data-split-part key={`${part}-${index}`}>
          {part === ' ' ? '\u00A0' : part}
        </span>
      ))}
    </Tag>
  );
}

export default SplitText;
