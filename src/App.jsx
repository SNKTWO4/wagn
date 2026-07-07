import { useEffect, useState } from 'react';
import {
  Archive,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  Clapperboard,
  ClipboardCheck,
  Factory,
  HardDrive,
  PackageCheck,
  Radio,
  Scissors,
  Store,
  UserRound,
  Video,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardNav from './CardNav.jsx';
import GlowCard from './GlowCard.jsx';
import { Method, Proof } from './MethodProofSections.jsx';
import { experiences, profile } from './portfolioData.js';

gsap.registerPlugin(ScrollTrigger);

const statIcons = [Camera, Radio, Video, ClipboardCheck, Clapperboard, Archive];
const experienceIcons = [Factory, PackageCheck, Store, BriefcaseBusiness, UserRound];
const skillBadges = [
  [ClipboardCheck, '脚本拆解'],
  [Camera, '现场拍摄'],
  [Scissors, '剪辑调色'],
  [HardDrive, '素材归档'],
  [Radio, '账号节奏'],
  [BadgeCheck, '客户沟通'],
];

const navItems = [
  {
    label: '经验',
    bgColor: '#141312',
    textColor: '#f5f5f3',
    links: [
      { label: '经验厚度', href: '#experience', ariaLabel: '查看工作经历' },
      { label: '个人能力', href: '#method', ariaLabel: '查看个人能力卡' },
    ],
  },
  {
    label: '案例',
    bgColor: '#1a1712',
    textColor: '#f5f5f3',
    links: [
      { label: '宣传片', href: '#promo', ariaLabel: '查看宣传片案例' },
      { label: '老板 IP', href: '#founder-ip', ariaLabel: '查看老板 IP 案例' },
      { label: '纪实摄影', href: '#documentary', ariaLabel: '查看纪实摄影案例' },
    ],
  },
  {
    label: '更多',
    bgColor: '#201a10',
    textColor: '#f5f5f3',
    links: [
      { label: '调色案例', href: '#color-grade', ariaLabel: '查看调色案例' },
      { label: '海外抖音', href: '#overseas-tiktok', ariaLabel: '查看海外抖音案例' },
      { label: '联系', href: '#contact', ariaLabel: '联系邮箱' },
    ],
  },
];

function Hero() {
  return (
    <section className="hero" id="home">
      <video className="heroVideo" src="media/hero-bg.mp4" autoPlay muted loop playsInline />
      <div className="heroVeil" />
      <div className="heroSplit">
        <div className="heroGlass">
          <strong className="heroWord heroWordMuted">ZHOU</strong>
          <div className="heroCopy">
            <span>5年经验</span>
            <p>{profile.summary}</p>
          </div>
          <a className="heroLink" href="#experience">View experience</a>
        </div>
        <div className="heroImagePanel">
          <div className="heroNavHint">Guangzhou / 2026</div>
          <strong className="heroWord">PORT<br />FOLIO</strong>
          <p className="heroLabel">出海宣传 / 电商产品 / 老板 IP / 调色后期</p>
        </div>
      </div>
    </section>
  );
}

function ProfileCard() {
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

function Stats() {
  return (
    <section className="statsSection">
      <div className="sectionShell">
        <div className="sectionLead">
          <p>经验厚度</p>
          <h2>经验覆盖全流程</h2>
        </div>
        <div className="statsLayout">
          <ProfileCard />
          <div className="statGrid">
            {profile.stats.map(([value, label], index) => {
              const Icon = statIcons[index];
              return (
                <GlowCard className="statCard revealBlock" key={label} animated={index === 0}>
                  <Icon size={26} />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experienceSection" id="experience">
      <div className="sectionShell">
        <div className="sectionLead stickyLead">
          <p>工作经历</p>
          <h2>从事摄影行业 5 年以上</h2>
          <p className="experienceSummary">
            工作内容涵盖产品静物、电商短视频、品牌宣传片拍摄等，沟通能力强，对光影和画面质感把控到位，熟悉从前期策划到后期调色的全流程。
          </p>
          <div className="experienceDecor">
            {skillBadges.map(([Icon, label]) => (
              <span key={label}>
                <Icon size={18} />
                {label}
              </span>
            ))}
          </div>
          <div className="experienceMeter">
            <strong>5年</strong>
            <span>从现场执行到账号内容交付</span>
          </div>
        </div>
        <div className="timelineList">
          {experiences.map((item, index) => {
            const Icon = experienceIcons[index];
            return (
            <GlowCard className="experienceCard revealBlock" key={`${item.time}-${item.company}`}>
              <div className="experienceSide">
                <div className="experienceIcon"><Icon size={22} /></div>
                <div className="experienceTime">{item.time}</div>
              </div>
              <div>
                <h3>{item.company}</h3>
                <strong>{item.role}</strong>
                <p>{item.text}</p>
                <div className="tagRow">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contactSection" id="contact">
      <video src="media/closing-bg.mp4" autoPlay muted loop playsInline />
      <div className="contactVeil" />
      <div className="contactHero">
        <p className="contactBadge">Available for brand film / founder IP</p>
        <h2>
          <span>把品牌故事</span>
          拍成电影
        </h2>
        <p className="contactText">摄影 / 剪辑 / 调色 / 短视频内容交付</p>
        <div className="contactActions">
          <a href={`mailto:${profile.email}`}>联系邮箱</a>
          <span>{profile.email}</span>
        </div>
      </div>
    </section>
  );
}

function App() {
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from('.heroNavHint, .heroWord, .heroLabel, .heroCopy, .heroLink', {
        autoAlpha: 0,
        y: 34,
        duration: 1.15,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.utils.toArray('.revealBlock').forEach((block) => {
        gsap.from(block, {
          autoAlpha: 0,
          y: 44,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: block, start: 'top 82%' },
        });
      });
    });

    return () => context.revert();
  }, []);

  return (
    <main>
      <CardNav
        items={navItems}
        baseColor="rgba(245, 245, 243, 0.88)"
        menuColor="#0a0a0a"
        buttonBgColor="#0a0a0a"
        buttonTextColor="#f5f5f3"
      />
      <Hero />
      <Stats />
      <Experience />
      <Method profile={profile} skillBadges={skillBadges} />
      <Proof />
      <Contact />
    </main>
  );
}

export default App;
