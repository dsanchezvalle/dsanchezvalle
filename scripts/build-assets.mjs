// Builds the static SVG assets of the profile README (hero and project cards).
import { readFile, writeFile } from "node:fs/promises";

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
  const pad = 56;
  const frameTop = 30;
  const nameBaseline = frameTop + pad + 62;
  const capTop = nameBaseline - 50;
  const roleBaseline = nameBaseline + 24 + 26;
  const animation = `
.redline { opacity: 0; animation: reveal 600ms ease-out 500ms forwards; }
@keyframes reveal { to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .redline { opacity: 1; animation: none; } }`;

  const handles = [
    [0.5, frameTop],
    [1199.5, frameTop],
    [0.5, 379.5],
    [1199.5, 379.5],
  ]
    .map(([x, y]) => `<rect x="${x - 3.5}" y="${y - 3.5}" width="7" height="7" fill="var(--canvas)" stroke="var(--spec)"/>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 384" width="1200" height="384" role="img" aria-label="David Sánchez Valle. Frontend engineer for product, UX and design systems. Medellín, Colombia.">
${style(animation)}
<text x="0" y="18" font-size="13" class="spec">profile / david-sanchez-valle</text>
<rect x="0.5" y="${frameTop}" width="1199" height="349.5" class="hair"/>

<text x="${pad}" y="${nameBaseline}" font-size="76" class="display">David Sánchez Valle</text>
<text x="${pad}" y="${roleBaseline}" font-size="24">Frontend engineer for product, UX and design systems</text>
<text x="${pad}" y="${roleBaseline + 44}" font-size="18" class="muted">I turn product intent into accessible, coherent interfaces with React and Next.js,</text>
<text x="${pad}" y="${roleBaseline + 70}" font-size="18" class="muted">and I write down what I decided, what I ruled out and why.</text>
<text x="${pad}" y="${379 - 34}" font-size="16" class="muted">Medellín, Colombia</text>

<g class="redline">
  <rect x="0.5" y="${frameTop}" width="1199" height="349.5" class="spec-line"/>
  ${handles}
  <path d="M${pad + 120} ${frameTop + 1} V${capTop}" class="spec-line"/>
  <path d="M${pad + 114} ${frameTop + 1} H${pad + 126} M${pad + 114} ${capTop} H${pad + 126}" class="spec-line"/>
  <rect x="${pad + 130}" y="${(frameTop + capTop) / 2 - 10}" width="28" height="20" rx="3" fill="var(--spec)"/>
  <text x="${pad + 144}" y="${(frameTop + capTop) / 2 + 4.5}" font-size="12" text-anchor="middle" fill="var(--canvas)" style="fill: var(--canvas)">56</text>

  <path d="M1 ${nameBaseline + 70} H${pad - 1}" class="spec-line"/>
  <path d="M1 ${nameBaseline + 64} V${nameBaseline + 76} M${pad - 1} ${nameBaseline + 64} V${nameBaseline + 76}" class="spec-line"/>
  <rect x="${pad / 2 - 14}" y="${nameBaseline + 78}" width="28" height="20" rx="3" fill="var(--spec)"/>
  <text x="${pad / 2}" y="${nameBaseline + 92.5}" font-size="12" text-anchor="middle" style="fill: var(--canvas)">56</text>

  <path d="M${pad + 760} ${nameBaseline - 26} H${pad + 790}" class="spec-line" stroke-dasharray="3 3"/>
  <text x="${pad + 798}" y="${nameBaseline - 30}" font-size="13" class="spec">Bricolage Grotesque, 600</text>
  <text x="${pad + 798}" y="${nameBaseline - 12}" font-size="13" class="spec">76 / 84, tracking 0</text>
</g>
</svg>
`;
}

const STATUS = {
  live: { label: "Live", cls: "live" },
  published: { label: "Published", cls: "live" },
  wip: { label: "In progress", cls: "wip" },
};


const DOTS = `<pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="var(--dot)"/></pattern>`;

const pill = (right, status, statusNote) => {
  const s = STATUS[status];
  const text = statusNote ? `${s.label}, ${statusNote}` : s.label;
  const w = Math.round(text.length * 8.4) + 34;
  return `<rect x="${right - w}" y="16" width="${w}" height="30" rx="15" class="surface"/>
<circle cx="${right - w + 16}" cy="31" r="4.5" class="${s.cls}"/>
<text x="${right - w + 28}" y="36.5" font-size="16">${escape(text)}</text>`;
};

function card({ title, status, statusNote, lines, stack, motif, alt }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380" role="img" aria-label="${escape(alt)}">
${style()}
<defs>${DOTS}<clipPath id="c"><path d="M0.5 204 V12.5 A12 12 0 0 1 12.5 0.5 H587.5 A12 12 0 0 1 599.5 12.5 V204 Z"/></clipPath></defs>
<g clip-path="url(#c)">
  <rect x="0" y="0" width="600" height="204" class="canvas"/>
  <rect x="0" y="0" width="600" height="204" fill="url(#dots)"/>
  ${motif}
</g>
<path d="M0.5 204 H599.5" class="hair"/>
<rect x="0.5" y="0.5" width="599" height="379" rx="12" class="hair"/>
${pill(572, status, statusNote)}
<text x="28" y="250" font-size="30" class="display">${escape(title)}</text>
${lines.map((l, i) => `<text x="28" y="${286 + i * 26}" font-size="19" class="muted">${escape(l)}</text>`).join("\n")}
<text x="28" y="358" font-size="16" class="muted">${escape(stack)}</text>
</svg>
`;
}

function featured({ title, status, statusNote, lines, stack, motif, alt }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1216 380" width="1216" height="380" role="img" aria-label="${escape(alt)}">
${style()}
<defs>${DOTS}<clipPath id="c"><rect x="0.5" y="0.5" width="1215" height="379" rx="12"/></clipPath></defs>
<g clip-path="url(#c)">
  <rect x="0" y="0" width="600" height="380" class="canvas"/>
  <rect x="0" y="0" width="600" height="380" fill="url(#dots)"/>
  ${motif}
</g>
<path d="M600 0.5 V379.5" class="hair"/>
<rect x="0.5" y="0.5" width="1215" height="379" rx="12" class="hair"/>
${pill(1188, status, statusNote)}
<text x="640" y="150" font-size="36" class="display">${escape(title)}</text>
${lines.map((l, i) => `<text x="640" y="${194 + i * 28}" font-size="20" class="muted">${escape(l)}</text>`).join("\n")}
<text x="640" y="${194 + lines.length * 28 + 34}" font-size="16" class="muted">${escape(stack)}</text>
</svg>
`;
}

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
  <path d="M214 132 H150" class="spec-line" stroke-dasharray="2 3"/>
  <rect x="56" y="122" width="20" height="20" rx="4" fill="var(--fg)"/>
  <rect x="78" y="122" width="20" height="20" rx="4" class="surface"/>
  ${t(104, 137, "7:1", { cls: "spec" })}
  ${t(56, 162, "Text contrast", { size: 13, cls: "muted" })}
  <path d="M222 278 H150" class="spec-line" stroke-dasharray="2 3"/>
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

const trotamundos = {
  file: "trotamundos",
  title: "Trotamundos",
  status: "live",
  statusNote: "invite only",
  lines: ["An offline travel companion I built for my parents,", "designed for older travelers. Live and in daily use."],
  stack: "JavaScript, PWA",
  alt: "Trotamundos, live and invite only: an offline travel companion built for my parents, designed for older travelers.",
};

const cards = [
  {
    file: "mistarjetas",
    title: "MisTarjetas.co",
    status: "wip",
    statusNote: "launch upcoming",
    lines: ["Transparent data on Colombian credit and debit", "cards, every value traced to its source."],
    stack: "Next.js, React, Supabase",
    alt: "MisTarjetas.co, launch upcoming: transparent data on Colombian cards, every value traced to its source.",
  },
  {
    file: "workflow",
    title: "workflow-template",
    status: "wip",
    statusNote: "public release upcoming",
    lines: ["An installable AI-assisted dev workflow with", "three human checkpoints."],
    stack: "Claude Code, Codex, GitHub Actions",
    alt: "workflow-template, public release upcoming: an installable AI-assisted development workflow with three human checkpoints.",
  },
  {
    file: "homelab",
    title: "Homelab Quest",
    status: "live",
    statusNote: "level 1",
    lines: ["Learn Docker by deploying a real Home Assistant,", "one Duolingo-style lesson at a time."],
    stack: "React, Vite",
    alt: "Homelab Quest, level 1 live: learn Docker by deploying a real Home Assistant, Duolingo-style.",
  },
  {
    file: "maringa",
    title: "Maringá – 02.11",
    status: "published",
    statusNote: "Nov 2026",
    lines: ["A bilingual data story on the November 2026", "tornado in Maringá, Brazil."],
    stack: "Next.js, React",
    alt: "Maringá 02.11, published November 2026: a bilingual data story on the tornado in Maringá, Brazil.",
  },
];

await writeFile("assets/hero.svg", hero());
await writeFile("assets/cards/trotamundos.svg", featured({ ...trotamundos, motif: motifs.trotamundos }));
for (const c of cards) await writeFile(`assets/cards/${c.file}.svg`, card({ ...c, motif: motifs[c.file] }));
console.log(`Built hero and ${cards.length + 1} cards`);
