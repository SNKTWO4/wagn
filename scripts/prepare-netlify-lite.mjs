import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const uploadDir = path.join(root, 'netlify-static-upload');

if (!existsSync(distDir)) {
  throw new Error('dist does not exist. Run npm.cmd run build first.');
}

await rm(uploadDir, { recursive: true, force: true });
await mkdir(uploadDir, { recursive: true });
await cp(distDir, uploadDir, { recursive: true });

await writeFile(path.join(uploadDir, 'netlify.toml'), '[build]\n  publish = "."\n', 'utf8');

const assetsDir = path.join(uploadDir, 'assets');
const assetFiles = await import('node:fs/promises').then((fs) => fs.readdir(assetsDir));
const jsFile = assetFiles.find((file) => /^index-.*\.js$/.test(file));

if (!jsFile) {
  throw new Error('Could not find built JS bundle.');
}

const jsPath = path.join(assetsDir, jsFile);
let js = await readFile(jsPath, 'utf8');

const replacements = [
  [
    '{type:`video`,title:`华谊集团宣传片`,meta:`企业空间与品牌形象叙事`,src:`/media/promo-huayi.m4v`}',
    '{type:`image`,title:`华谊集团宣传片`,meta:`企业空间与品牌形象叙事`,src:`/media/portfolio-shots/image30.jpeg`}',
  ],
  [
    '{type:`video`,title:`茶山品牌影像`,meta:`产地环境与茶文化氛围`,src:`/media/promo-tea.m4v`}',
    '{type:`image`,title:`茶山品牌影像`,meta:`产地环境与茶文化氛围`,src:`/media/portfolio-shots/image25.jpeg`}',
  ],
  [
    '{type:`video`,title:`定制服务人物口播`,meta:`服务卖点与人物表达统一`,src:`/media/founder-ip-1.mp4`,portrait:!0}',
    '{type:`image`,title:`定制服务人物口播`,meta:`服务卖点与人物表达统一`,src:`/media/portfolio-shots/image16.jpeg`,portrait:!0}',
  ],
  [
    '{type:`video`,title:`弹簧工厂人物口播`,meta:`工厂实景与产品能力呈现`,src:`/media/founder-ip-3.mp4`,portrait:!0}',
    '{type:`image`,title:`弹簧工厂人物口播`,meta:`工厂实景与产品能力呈现`,src:`/media/portfolio-shots/image18.jpeg`,portrait:!0}',
  ],
];

for (const [from, to] of replacements) {
  if (!js.includes(from)) {
    throw new Error(`Bundle replacement target not found: ${from}`);
  }
  js = js.replace(from, to);
}

await writeFile(jsPath, js, 'utf8');

const unusedMedia = [
  'promo-huayi.m4v',
  'promo-tea.m4v',
  'founder-ip-1.mp4',
  'founder-ip-2.mp4',
  'founder-ip-3.mp4',
  'founder-ip-4.mp4',
  'project-color.mp4',
  'project-motion.mp4',
  'camera.png',
  'portfolio',
  'street-project.jpeg',
  'tea-field.jpeg',
  'ip-project.jpeg',
];

for (const file of unusedMedia) {
  await rm(path.join(uploadDir, 'media', file), { force: true });
}

console.log(`Prepared lightweight Netlify upload at ${uploadDir}`);
