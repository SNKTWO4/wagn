import { Layers3, Sparkles, TrendingUp } from 'lucide-react';
import GlowCard from './GlowCard.jsx';
import MagicBentoCard, { MagicBentoGrid } from './MagicBento.jsx';
import PortfolioSections from './PortfolioSections.jsx';
import { methods } from './portfolioData.js';

const methodIcons = [TrendingUp, Sparkles, Layers3];

function ProfileCard({ profile, skillBadges }) {
  return (
    <GlowCard className="profileCard revealBlock" animated>
      <div className="profileCardHead">
        <span>个人能力卡</span>
        <strong>{profile.name}</strong>
      </div>
      <p>{profile.summary}</p>
      <div className="skillBadgeGrid">
        {skillBadges.map(([Icon, label]) => (
          <span key={label}>
            <Icon size={17} />
            {label}
          </span>
        ))}
      </div>
    </GlowCard>
  );
}

export function Method({ profile, skillBadges }) {
  return (
    <section className="methodSection" id="method">
      <div className="sectionShell">
        <div className="sectionLead">
          <p>方法论</p>
          <h2>方法论决定交付质量</h2>
        </div>
        <MagicBentoGrid className="methodBentoArea" glowColor="217, 164, 65" spotlightRadius={340}>
          <div className="methodIntro">
            <MagicBentoCard className="profileCard revealBlock">
              <div className="profileCardHead">
                <span>个人能力卡</span>
                <strong>{profile.name}</strong>
              </div>
              <p>{profile.summary}</p>
              <div className="skillBadgeGrid">
                {skillBadges.map(([Icon, label]) => (
                  <span key={label}>
                    <Icon size={17} />
                    {label}
                  </span>
                ))}
              </div>
            </MagicBentoCard>
            <MagicBentoCard className="methodStatement revealBlock">
            <span>核心判断</span>
            <p>拍摄不是孤立动作，重点是把画面变成能复用、能转化、能沉淀的内容资产。</p>
            </MagicBentoCard>
          </div>
          <div className="methodGrid">
            {methods.map((method, index) => {
              const Icon = methodIcons[index];
              return (
                <MagicBentoCard className="methodCard revealBlock" key={method.title}>
                  <Icon size={28} />
                  <h3>{method.title}</h3>
                  <p>{method.text}</p>
                  <ul>
                    {method.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </MagicBentoCard>
              );
            })}
          </div>
        </MagicBentoGrid>
      </div>
    </section>
  );
}

export function Proof() {
  return <PortfolioSections />;
}
