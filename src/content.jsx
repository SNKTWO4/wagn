import { Boxes, Clapperboard, Palette, UserRound } from 'lucide-react';

export const navItems = [
  {
    label: '关于',
    links: [
      { label: '个人介绍', href: '#profile', ariaLabel: '查看个人介绍' },
      { label: '工作经历', href: '#profile', ariaLabel: '查看工作经历' },
    ],
  },
  {
    label: '作品',
    links: [
      { label: '老板IP', href: '#founder-ip', ariaLabel: '查看老板IP' },
      { label: '宣传片', href: '#promo', ariaLabel: '查看宣传片' },
      { label: '电商视频', href: '#ecommerce', ariaLabel: '查看电商视频' },
    ],
  },
  {
    label: '交付',
    links: [
      { label: '调色案例', href: '#color', ariaLabel: '查看调色案例' },
      { label: '执行流程', href: '#workflow', ariaLabel: '查看执行流程' },
      { label: '联系方式', href: '#contact', ariaLabel: '查看联系方式' },
    ],
  },
];

export const profileStats = [
  ['5年', '拍摄与剪辑实战经验'],
  ['13.3W', 'TikTok 单条最高播放'],
  ['4类', '老板IP / 宣传片 / 电商 / 调色'],
  ['全流程', '策划、拍摄、剪辑、归档'],
];

export const timeline = [
  ['2026.05 - 2026.07', '广州天河无忧出海', '摄影师 / 出海宣传视频'],
  ['2025.04 - 2026', '众擎投资有限公司', '摄影师 / 产品实景与运营素材'],
  ['2024.05 - 2025.02', '河源市拾六传媒有限公司', '摄影师 / 店铺宣传与个人 IP'],
  ['2023.08 - 2024.01', '河源星灏电子商务有限公司', '摄像师 / 工厂流程与产品展示'],
  ['2021.05 - 2023.06', '优米亲子儿童摄影', '摄像师 / 宣传片、婚礼、活动'],
];

export const chapters = [
  {
    id: 'founder-ip',
    icon: UserRound,
    eyebrow: 'Founder IP',
    title: '老板 IP 打造',
    subtitle: '把老板从产品介绍者，转成行业可信人物',
    intro: '围绕老板身份、工厂资源、从业年限与客户痛点，搭建稳定的人设标签、脚本开场、拍摄表达和封面包装。',
    image: 'media/ip-project.jpeg',
    mediaMode: 'default',
    videos: [['老板IP 样片 A', 'https://github.com/SNKTWO4/wagn/releases/download/videos/founder-ip-1.mp4'], ['老板IP 样片 B', 'https://github.com/SNKTWO4/wagn/releases/download/videos/founder-ip-2.mp4']],
    details: [['定位', '老板身份 / 工厂实力 / 从业时间'], ['开场', '客户痛点 / 价格疑问 / 交付焦虑'], ['画面', '人物口播 / 生产线 / 产品细节'], ['包装', '封面标题 / 关键词 / 统一识别']],
    process: ['账号方向', '脚本开场', '拍摄场景', '封面包装', '复盘迭代'],
    deliverables: ['账号定位建议', '口播脚本方向', '竖屏短视频样片', '封面标题模板'],
  },
  {
    id: 'promo',
    icon: Clapperboard,
    eyebrow: 'Promo Film',
    title: '宣传片与中长视频',
    subtitle: '单独成章，承接企业形象、项目介绍和场景质感',
    intro: '宣传片更强调情绪铺陈、信息层级和画面统一性。这里加入宣传片文件夹里的华谊集团、茶山素材，作为独立板块展示。',
    image: 'media/tea-field.jpeg',
    mediaMode: 'single',
    videos: [['华谊集团宣传片', 'https://github.com/SNKTWO4/wagn/releases/download/videos/promo-huayi.m4v', 2]],
    details: [['叙事', '企业信息 / 项目背景 / 视觉气质'], ['拍摄', '空镜 / 人物 / 环境 / 产品关系'], ['剪辑', '节奏铺陈 / 字幕包装 / 音乐情绪'], ['适配', '横版主片 / 竖版切条 / 封面画面']],
    process: ['项目信息梳理', '视觉基调', '主片剪辑', '短版拆条', '素材归档'],
    deliverables: ['企业宣传片', '专题内容', '商业素材', '多平台剪裁版本'],
  },
  {
    id: 'ecommerce',
    icon: Boxes,
    eyebrow: 'E-commerce',
    title: '电商视频与本地生活',
    subtitle: '把产品卖点、人物动作和咨询路径拍清楚',
    intro: '服务抖店、千川、直播带货、商品页面和本地生活短视频，把门店、人物、产品卖点组合成可转化素材。',
    image: 'media/street-project.jpeg',
    mediaMode: 'wide',
    videos: [['电商动作与转化素材', 'media/project-motion.mp4']],
    details: [['前3秒', '冲突点 / 利益点 / 场景问题'], ['过程', '人物动作承接产品卖点'], ['结尾', '回到门店、页面或咨询路径'], ['复用', '直播间素材 / 商品页 / 短视频切条']],
    process: ['卖点拆解', '场景设计', '动作承接', '转化路径', '多版本导出'],
    deliverables: ['产品展示', '口播短视频', '场景跟拍', '直播素材更新'],
  },
  {
    id: 'color',
    icon: Palette,
    eyebrow: 'DaVinci Color',
    title: '调色案例与画面质感',
    subtitle: '产品要清楚，人物要可信，现场要有节奏',
    intro: '通过光影氛围、肤色还原和色彩叙事，让不同项目保持稳定观感。后期覆盖 PR / AE / 达芬奇 / 剪映。',
    image: 'media/camera.png',
    mediaMode: 'default',
    videos: [['调色案例 01', 'media/project-color.mp4'], ['调色案例 02', 'media/project-motion.mp4']],
    details: [['光影', '现场氛围和主体层次'], ['肤色', '人物可信度和质感还原'], ['色调', '品牌调性和情绪节奏'], ['导出', '横竖屏规格和多平台版本']],
    process: ['素材整理', '基础校正', '风格匹配', '字幕包装', '多规格导出'],
    deliverables: ['调色成片', '字幕包装', '多规格导出', '工程文件归档'],
  },
];

export const workflow = ['需求确认', '脚本拆解', '现场拍摄', '剪辑调色', '发布复盘', '素材归档'];
