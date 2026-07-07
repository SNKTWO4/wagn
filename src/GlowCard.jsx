import BorderGlow from './BorderGlow.jsx';

function GlowCard({ children, className = '', radius = 16, animated = false, intensity = 0.78 }) {
  return (
    <BorderGlow
      className={className}
      borderRadius={radius}
      glowRadius={30}
      glowIntensity={intensity}
      glowColor="40 80 72"
      backgroundColor="#10100f"
      edgeSensitivity={24}
      coneSpread={24}
      animated={animated}
      fillOpacity={0.22}
      colors={['#d9a441', '#f5f5f3', '#6fa7c8']}
    >
      {children}
    </BorderGlow>
  );
}

export default GlowCard;
