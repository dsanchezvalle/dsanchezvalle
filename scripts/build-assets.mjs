// Builds the static SVG assets of the profile README (hero and project illustrations).
import { mkdir, readFile, writeFile } from "node:fs/promises";

const font = (await readFile("assets/src/bricolage-600.woff2")).toString("base64");
const SANS = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif`;

const style = (extra = "") => `<style>
@font-face { font-family: 'Bricolage'; font-weight: 600; src: url(data:font/woff2;base64,${font}) format('woff2'); }
svg { --fg: #1f2328; --muted: #59636e; --line: #d1d9e0; --canvas: #f6f8fa; --surface: #ffffff; --soft: #e6eaef; --dot: #d8dee4; --spec: #bf3989; --live: #1a7f37; --wip: #9a6700; }
@media (prefers-color-scheme: dark) {
  svg { --fg: #f0f6fc; --muted: #9198a1; --line: #3d444d; --canvas: #151b23; --surface: #0d1117; --soft: #262c36; --dot: #2a313c; --spec: #e275b9; --live: #3fb950; --wip: #d29922; }
}
text { font-family: ${SANS}; fill: var(--fg); }
.display { font-family: 'Bricolage', ${SANS}; font-weight: 600; }
.muted { fill: var(--muted); }
.spec { fill: var(--spec); }
.stroke { fill: none; stroke: var(--muted); stroke-width: 1.5; }
.hair { fill: none; stroke: var(--line); stroke-width: 1; }
.spec-line { fill: none; stroke: var(--spec); stroke-width: 1; }
.canvas { fill: var(--canvas); }
.live { fill: var(--live); }
.wip { fill: var(--wip); }
.surface { fill: var(--surface); stroke: var(--line); stroke-width: 1; }
.soft { fill: var(--soft); }
.tint { fill: var(--spec); fill-opacity: 0.1; stroke: var(--spec); stroke-width: 1; }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
${extra}
</style>`;

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function hero() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 282" width="1200" height="282" role="img" aria-label="David Sánchez Valle. Frontend engineer for product, UX and design systems. Medellín, Colombia.">
${style()}
<text x="0" y="88" font-size="84" class="display">David Sánchez Valle</text>
<text x="1" y="142" font-size="26">Frontend engineer for product, UX and design systems</text>
<text x="1" y="188" font-size="19" class="muted">I turn product intent into accessible, coherent interfaces with React and Next.js,</text>
<text x="1" y="216" font-size="19" class="muted">and I write down what I decided, what I ruled out and why.</text>
<text x="1" y="268" font-size="16" class="muted">Medellín, Colombia</text>
</svg>
`;
}

function heroMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 446" width="640" height="446" role="img" aria-label="David Sánchez Valle. Frontend engineer for product, UX and design systems. Medellín, Colombia.">
${style()}
<text x="0" y="78" font-size="72" class="display">David</text>
<text x="0" y="156" font-size="72" class="display">Sánchez Valle</text>
<text x="1" y="212" font-size="28">Frontend engineer for product,</text>
<text x="1" y="248" font-size="28">UX and design systems</text>
<text x="1" y="298" font-size="24" class="muted">I turn product intent into accessible,</text>
<text x="1" y="331" font-size="24" class="muted">coherent interfaces with React and</text>
<text x="1" y="364" font-size="24" class="muted">Next.js, and I write down what I</text>
<text x="1" y="397" font-size="24" class="muted">decided, what I ruled out and why.</text>
<text x="1" y="442" font-size="20" class="muted">Medellín, Colombia</text>
</svg>
`;
}

const DOTS = `<pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="var(--dot)"/></pattern>`;

const t = (x, y, text, { size = 14, cls = "", anchor = "start", weight } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}"${cls ? ` class="${cls}"` : ""}${anchor !== "start" ? ` text-anchor="${anchor}"` : ""}${weight ? ` font-weight="${weight}"` : ""}>${escape(text)}</text>`;

const measure = (x, y1, y2, value) => `
  <path d="M${x} ${y1 + 0.5} V${y2 - 0.5} M${x - 4} ${y1 + 0.5} H${x + 4} M${x - 4} ${y2 - 0.5} H${x + 4}" class="spec-line"/>
  <rect x="${x + 8}" y="${(y1 + y2) / 2 - 10}" width="28" height="20" rx="4" fill="var(--spec)"/>
  <text x="${x + 22}" y="${(y1 + y2) / 2 + 4.5}" font-size="12" text-anchor="middle" style="fill: var(--surface)">${value}</text>`;

const check = (cx, cy, color = "var(--surface)") =>
  `<path d="M${cx - 5} ${cy} l3.5 3.5 l6.5 -7" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

const motifs = {
  trotamundos: `
  <g>
    <rect x="210" y="44" width="180" height="372" rx="30" class="surface" stroke-width="1.25"/>
    <rect x="272" y="56" width="56" height="16" rx="8" class="soft"/>
    <rect x="300" y="88" width="76" height="20" rx="10" fill="var(--live)" fill-opacity="0.12"/>
    <circle cx="311" cy="98" r="3" class="live"/>
    ${t(319, 102, "Offline", { size: 11 })}
    ${t(226, 140, "Today", { size: 24, cls: "display" })}
    ${t(226, 160, "Your guide for this stop", { size: 11.5, cls: "muted" })}
    <rect x="226" y="174" width="148" height="66" rx="12" class="soft"/>
    <rect x="240" y="188" width="24" height="24" rx="6" fill="var(--surface)"/>
    <path d="M247 205 l5 -10 l5 10" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-linejoin="round"/>
    <rect x="274" y="192" width="78" height="7" rx="3.5" fill="var(--muted)" fill-opacity="0.45"/>
    <rect x="274" y="205" width="54" height="7" rx="3.5" fill="var(--muted)" fill-opacity="0.25"/>
    <rect x="240" y="222" width="100" height="6" rx="3" fill="var(--muted)" fill-opacity="0.25"/>
    <rect x="226" y="254" width="148" height="48" rx="12" fill="var(--fg)"/>
    ${t(300, 283, "Show address", { size: 14, anchor: "middle" }).replace("<text", '<text style="fill: var(--surface)"')}
    <rect x="226.5" y="312.5" width="147" height="47" rx="12" class="surface"/>
    ${t(300, 341, "Phrases", { size: 14, anchor: "middle" })}
  </g>
  ${measure(400, 254, 302, "48")}
  <path d="M444 278 H460" class="spec-line"/>
  ${t(466, 283, "Touch targets", { cls: "spec" })}
  <path d="M378 98 H460" class="spec-line" stroke-dasharray="2 3"/>
  ${t(466, 102, "Works offline", { cls: "spec" })}
  <path d="M200 132 H150" class="spec-line" stroke-dasharray="2 3"/>
  <rect x="56" y="122" width="20" height="20" rx="4" fill="var(--fg)"/>
  <rect x="78" y="122" width="20" height="20" rx="4" class="surface"/>
  ${t(104, 137, "7:1", { cls: "spec" })}
  ${t(56, 162, "Text contrast", { size: 13, cls: "muted" })}
  <path d="M200 278 H150" class="spec-line" stroke-dasharray="2 3"/>
  ${t(56, 274, "1 tap", { cls: "spec" })}
  ${t(56, 292, "to show an address", { size: 13, cls: "muted" })}`,

  mistarjetas: `
  <rect x="300" y="58" width="262" height="130" rx="12" class="surface"/>
  ${t(318, 80, "Card details", { size: 12.5, cls: "muted" })}
  ${[
    ["Annual fee", 52, "PDF", 52],
    ["Cashback", 38, "T&C", 52],
  ]
    .map(
      ([name, w, src, cw], i) => `
  <path d="M300.5 ${92 + i * 32} H561.5" class="hair"/>
  ${t(318, 113 + i * 32, name, { size: 13.5 })}
  <rect x="424" y="${104 + i * 32}" width="${w}" height="9" rx="4.5" fill="var(--muted)" fill-opacity="0.4"/>
  <rect x="${546 - cw}" y="${98 + i * 32}" width="${cw}" height="21" rx="10.5" class="tint"/>
  ${t(546 - cw / 2, 112.5 + i * 32, src, { size: 11.5, cls: "spec", anchor: "middle" })}`,
    )
    .join("")}
  <path d="M300.5 156 H561.5" class="hair"/>
  ${t(318, 177, "Lounge access", { size: 13.5 })}
  ${t(424, 177, "—", { cls: "muted" })}
  <rect x="464.5" y="162.5" width="81" height="20" rx="10" fill="none" stroke="var(--spec)" stroke-dasharray="3 3"/>
  ${t(505, 176.5, "No source", { size: 11.5, cls: "spec", anchor: "middle" })}
  <g>
    <rect x="40" y="58" width="220" height="130" rx="14" class="surface" stroke-width="1.25"/>
    <rect x="62" y="82" width="34" height="26" rx="5" class="soft"/>
    <path d="M62 95 H96 M79 82 V108" stroke="var(--surface)" stroke-width="1"/>
    <path d="M232 84 a8 8 0 0 1 0 14 M238 80 a13 13 0 0 1 0 22" fill="none" stroke="var(--muted)" stroke-width="1.25" stroke-linecap="round"/>
    <rect x="62" y="134" width="110" height="9" rx="4.5" fill="var(--muted)" fill-opacity="0.35"/>
    <rect x="62" y="154" width="64" height="7" rx="3.5" fill="var(--muted)" fill-opacity="0.22"/>
    <circle cx="218" cy="160" r="11" fill="var(--muted)" fill-opacity="0.35"/>
    <circle cx="232" cy="160" r="11" fill="var(--muted)" fill-opacity="0.2"/>
  </g>`,

  workflow: (() => {
    const steps = ["Issue", "Plan", "Build", "Review", "Merge", "Validate"];
    const human = new Set([1, 4, 5]);
    const w = 78;
    const gap = 12;
    const x0 = (600 - (steps.length * w + (steps.length - 1) * gap)) / 2;
    const y = 104;
    const xs = steps.map((_, i) => x0 + i * (w + gap));
    return `
  <path d="M${xs[3] + w / 2} ${y - 2} C${xs[3] + w / 2} 64 ${xs[2] + w / 2} 64 ${xs[2] + w / 2} ${y - 4}" fill="none" stroke="var(--muted)" stroke-width="1.25" stroke-dasharray="3 3"/>
  <path d="M${xs[2] + w / 2 - 4} ${y - 10} l4 6 l4 -6" fill="none" stroke="var(--muted)" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  ${t((xs[2] + xs[3] + w) / 2, 62, "Adversarial review loop", { size: 12, cls: "muted", anchor: "middle" })}
  ${xs
    .slice(0, -1)
    .map((x) => `<path d="M${x + w + 2} ${y + 17} H${x + w + gap - 2}" stroke="var(--line)" stroke-width="1.25"/>`)
    .join("")}
  ${steps
    .map((s, i) =>
      human.has(i)
        ? `<rect x="${xs[i] + 0.5}" y="${y + 0.5}" width="${w - 1}" height="33" rx="16.5" class="tint"/>${t(xs[i] + w / 2, y + 22, s, { size: 13.5, cls: "spec", anchor: "middle" })}`
        : `<rect x="${xs[i] + 0.5}" y="${y + 0.5}" width="${w - 1}" height="33" rx="16.5" class="surface"/>${t(xs[i] + w / 2, y + 22, s, { size: 13.5, cls: "muted", anchor: "middle" })}`,
    )
    .join("")}
  <rect x="${x0}" y="168" width="14" height="14" rx="7" class="tint"/>${t(x0 + 22, 180, "You decide", { size: 13, cls: "muted" })}
  <rect x="${x0 + 124.5}" y="168.5" width="13" height="13" rx="6.5" class="surface"/>${t(x0 + 146, 180, "Runs on its own", { size: 13, cls: "muted" })}`;
  })(),

  homelab: `
  <path d="M86 170 C86 140 146 146 146 116 S86 92 86 62" fill="none" stroke="var(--line)" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 9"/>
  <circle cx="86" cy="170" r="19" class="live"/>${check(86, 170)}
  <circle cx="146" cy="116" r="19" class="live"/>${check(146, 116)}
  <circle cx="86" cy="62" r="22" fill="var(--spec)" fill-opacity="0.12"/>
  <circle cx="86" cy="62" r="17" fill="var(--surface)" stroke="var(--spec)" stroke-width="2"/>
  <path d="M83 56 l8 6 l-8 6 Z" class="spec"/>
  <rect x="204" y="60" width="356" height="122" rx="10" class="surface"/>
  <path d="M204.5 86 H559.5" class="hair"/>
  <circle cx="222" cy="73" r="4" class="soft"/><circle cx="236" cy="73" r="4" class="soft"/><circle cx="250" cy="73" r="4" class="soft"/>
  ${t(382, 77.5, "lesson 3 of 12", { size: 11.5, cls: "muted", anchor: "middle" })}
  <text x="222" y="118" font-size="15.5" class="mono"><tspan style="fill: var(--live)">$</tspan> docker run --name ha -d</text>
  <rect x="222" y="134" width="20" height="20" rx="10" fill="var(--live)" fill-opacity="0.15"/>${check(232, 144, "var(--live)")}
  ${t(250, 149, "Flag order doesn't matter", { size: 13, cls: "muted" })}
  <rect x="482" y="135" width="62" height="20" rx="10" class="tint"/>
  ${t(513, 149.5, "+10 XP", { size: 11.5, cls: "spec", anchor: "middle" })}`,

  maringa: `
  ${[0, 1, 2, 3, 4, 5]
    .map(
      (k) =>
        `<path d="M-20 ${196 - k * 26} C 90 ${160 - k * 26} 170 ${214 - k * 26} 280 ${176 - k * 26} S 470 ${126 - k * 26} 620 ${150 - k * 26}" fill="none" stroke="var(--line)" stroke-width="1" opacity="0.8"/>`,
    )
    .join("")}
  <path d="M96 222 L352 -6" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="7 5"/>
  ${[
    [176, 140],
    [196, 132],
    [212, 112],
    [236, 104],
    [252, 86],
    [272, 76],
    [190, 154],
    [228, 124],
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="var(--muted)" fill-opacity="0.12"/><circle cx="${x}" cy="${y}" r="3.5" fill="var(--muted)"/>`)
    .join("")}
  <circle cx="236" cy="104" r="12" fill="none" stroke="var(--spec)" stroke-width="1.5"/>
  <path d="M248 104 H356" class="spec-line"/>
  <rect x="356" y="68" width="210" height="104" rx="12" class="surface"/>
  <circle cx="380" cy="94" r="10" class="tint"/>${t(380, 98.5, "1", { size: 11.5, cls: "spec", anchor: "middle" })}
  ${t(398, 99, "Source", { size: 14, weight: 600 })}
  ${t(374, 126, "Publisher", { size: 12.5, cls: "muted" })}
  <rect x="460" y="117" width="82" height="9" rx="4.5" fill="var(--muted)" fill-opacity="0.35"/>
  ${t(374, 150, "Published", { size: 12.5, cls: "muted" })}
  <rect x="460" y="141" width="56" height="9" rx="4.5" fill="var(--muted)" fill-opacity="0.35"/>
  <path d="M360 190 H390" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="7 5"/>
  ${t(398, 194.5, "Estimated track, not official", { size: 12.5, cls: "muted" })}`,
};

const workflowMobile = (() => {
  const w = 112;
  const h = 40;
  const gap = 16;
  const x = (col) => 26 + col * (w + gap);
  const rows = [56, 148];
  const steps = [
    ["Issue", 0, 0, false],
    ["Plan", 1, 0, true],
    ["Build", 2, 0, false],
    ["Review", 2, 1, false],
    ["Merge", 1, 1, true],
    ["Validate", 0, 1, true],
  ];
  const pills = steps
    .map(([s, col, row, human]) => {
      const y = rows[row];
      return `<rect x="${x(col) + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="${h / 2 - 0.5}" class="${human ? "tint" : "surface"}"/>${t(x(col) + w / 2, y + 26, s, { size: 17, cls: human ? "spec" : "muted", anchor: "middle" })}`;
    })
    .join("");
  const cx = x(2) + w / 2;
  return `
  <path d="M${x(0) + w + 3} ${rows[0] + 20} H${x(1) - 3} M${x(1) + w + 3} ${rows[0] + 20} H${x(2) - 3}" stroke="var(--line)" stroke-width="1.5"/>
  <path d="M${cx} ${rows[0] + h + 3} V${rows[1] - 3}" stroke="var(--line)" stroke-width="1.5"/>
  <path d="M${x(1) + w + 3} ${rows[1] + 20} H${x(2) - 3} M${x(0) + w + 3} ${rows[1] + 20} H${x(1) - 3}" stroke="var(--line)" stroke-width="1.5"/>
  <path d="M${x(2) + w + 2} ${rows[1] + 20} C${x(2) + w + 30} ${rows[1] + 20} ${x(2) + w + 30} ${rows[0] + 20} ${x(2) + w + 6} ${rows[0] + 20}" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="3 3"/>
  <path d="M${x(2) + w + 12} ${rows[0] + 14} l-6 6 l6 6" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  ${t(x(2) + w + 18, 36, "Review loop", { size: 15, cls: "muted", anchor: "end" })}
  ${pills}
  <rect x="26" y="222" width="16" height="16" rx="8" class="tint"/>${t(50, 236, "You decide", { size: 16, cls: "muted" })}
  <rect x="176.5" y="222.5" width="15" height="15" rx="7.5" class="surface"/>${t(200, 236, "Runs on its own", { size: 16, cls: "muted" })}`;
})();

const svgOpen = (viewBox, w, h, alt) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}" role="img" aria-label="${escape(alt)}">
${style()}`;

function desktop({ motif, scale, tx, ty, height = 300, alt }) {
  return `${svgOpen(`0 0 1200 ${height}`, 1200, height, alt)}
<defs>${DOTS}<clipPath id="c"><rect x="0.5" y="0.5" width="1199" height="${height - 1}" rx="12"/></clipPath></defs>
<g clip-path="url(#c)">
  <rect width="1200" height="${height}" class="canvas"/>
  <rect width="1200" height="${height}" fill="url(#dots)"/>
  <g transform="translate(${tx} ${ty}) scale(${scale})">${motif}</g>
</g>
<rect x="0.5" y="0.5" width="1199" height="${height - 1}" rx="12" class="hair"/>
</svg>
`;
}

function mobile({ motif, crop: [x, y, w, h], alt }) {
  return `${svgOpen(`${x} ${y} ${w} ${h}`, w, h, alt)}
<defs>${DOTS}<clipPath id="c"><rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="12"/></clipPath></defs>
<g clip-path="url(#c)">
  <rect x="${x}" y="${y}" width="${w}" height="${h}" class="canvas"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#dots)"/>
  ${motif}
</g>
<rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="12" class="hair"/>
</svg>
`;
}

const wide = (centerY) => ({ scale: 1.3, tx: 210, ty: Math.round(150 - centerY * 1.3) });

const projects = [
  {
    file: "trotamundos",
    desktop: { scale: 1.1, tx: 270, ty: -14, height: 400 },
    crop: [200, 36, 380, 300],
    alt: "Trotamundos Today screen: offline badge, large Show address button annotated with a 48 px touch target.",
  },
  {
    file: "mistarjetas",
    desktop: wide(126),
    crop: [200, 46, 380, 152],
    alt: "A card next to its details table: annual fee sourced from a PDF, cashback from the T&C, lounge access empty with no source.",
  },
  {
    file: "workflow",
    desktop: wide(120),
    mobileMotif: workflowMobile,
    crop: [0, 0, 430, 260],
    alt: "Workflow from issue to validation, with plan, merge and validation as human checkpoints and a review loop back to build.",
  },
  {
    file: "homelab",
    desktop: wide(111),
    crop: [120, 40, 450, 150],
    alt: "A lesson path next to a terminal: docker run --name ha -d is graded correct because flag order doesn't matter.",
  },
  {
    file: "maringa",
    desktop: wide(102),
    crop: [150, 50, 424, 152],
    alt: "Map with damage points along an estimated track, and a source sheet with publisher and date.",
  },
];

await mkdir("assets/projects", { recursive: true });
await writeFile("assets/hero.svg", hero());
await writeFile("assets/hero-mobile.svg", heroMobile());
for (const p of projects) {
  await writeFile(`assets/projects/${p.file}.svg`, desktop({ motif: motifs[p.file], ...p.desktop, alt: p.alt }));
  await writeFile(`assets/projects/${p.file}-mobile.svg`, mobile({ motif: p.mobileMotif ?? motifs[p.file], crop: p.crop, alt: p.alt }));
}
console.log(`Built hero and ${projects.length} project illustrations`);
