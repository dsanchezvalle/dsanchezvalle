// Renders the contribution calendar as SVGs that mirror GitHub's native graph in light and dark.
import { mkdir, readFile, writeFile } from "node:fs/promises";

const USER = process.env.GH_USER;
const TOKEN = process.env.GH_TOKEN;
const OUT_DIR = process.env.OUT_DIR ?? "dist";
const MOCK = process.env.MOCK_FILE;

const STYLE = `<style>
svg { --l0: #eff2f5; --l1: #aceebb; --l2: #4ac26b; --l3: #2da44e; --l4: #116329; --text: #1f2328; --muted: #59636e; --border: #d1d9e0; --cell: rgba(31,35,40,0.05); }
@media (prefers-color-scheme: dark) {
  svg { --l0: #151b23; --l1: #033a16; --l2: #196c2e; --l3: #2ea043; --l4: #56d364; --text: #f0f6fc; --muted: #9198a1; --border: #3d444d; --cell: rgba(240,246,252,0.05); }
}
text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif; }
.title { font-size: 16px; fill: var(--text); }
.label { font-size: 12px; fill: var(--muted); }
.box { fill: none; stroke: var(--border); }
.c { stroke: var(--cell); }
.l0 { fill: var(--l0); } .l1 { fill: var(--l1); } .l2 { fill: var(--l2); } .l3 { fill: var(--l3); } .l4 { fill: var(--l4); }
</style>`;

const LEVEL = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CELL = 10;
const STEP = 13;
const PAD = 16;
const LABEL_W = 30;
const TITLE_H = 30;
const MONTH_H = 18;

async function fetchCalendar() {
  if (MOCK) return JSON.parse(await readFile(MOCK, "utf8"));
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: USER } }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? json));
  return json.data.user.contributionsCollection.contributionCalendar;
}

function monthLabels(weeks) {
  const labels = [];
  let last = -1;
  weeks.forEach((week, i) => {
    const first = week.contributionDays.find((d) => Number(d.date.slice(8, 10)) <= 7);
    if (!first) return;
    const month = Number(first.date.slice(5, 7)) - 1;
    if (month !== last) {
      labels.push({ i, text: MONTHS[month] });
      last = month;
    }
  });
  // GitHub hides a month label that would collide with the next one.
  return labels.filter((l, k) => (labels[k + 1]?.i ?? weeks.length) - l.i >= 3);
}

function render({ totalContributions, weeks }, caption = "in the last year") {
  const gridW = weeks.length * STEP - (STEP - CELL);
  const gridH = 7 * STEP - (STEP - CELL);
  const boxW = PAD * 2 + LABEL_W + gridW;
  const boxH = PAD + MONTH_H + gridH + 34;
  const width = boxW + 2;
  const height = TITLE_H + boxH + 1;
  const gx = 1 + PAD + LABEL_W;
  const gy = TITLE_H + PAD + MONTH_H;

  const cells = weeks
    .flatMap((week, wi) =>
      week.contributionDays.map((d) => {
        const row = new Date(`${d.date}T00:00:00Z`).getUTCDay();
        const level = LEVEL[d.contributionLevel] ?? 0;
        const n = d.contributionCount;
        const tip = `${n === 0 ? "No" : n} contribution${n === 1 ? "" : "s"} on ${d.date}`;
        return `<rect x="${gx + wi * STEP}" y="${gy + row * STEP}" width="${CELL}" height="${CELL}" rx="2" class="c l${level}"><title>${tip}</title></rect>`;
      }),
    )
    .join("");

  const months = monthLabels(weeks)
    .map((m) => `<text x="${gx + m.i * STEP}" y="${gy - 7}">${m.text}</text>`)
    .join("");

  const days = [
    [1, "Mon"],
    [3, "Wed"],
    [5, "Fri"],
  ]
    .map(([r, d]) => `<text x="${1 + PAD}" y="${gy + r * STEP + 9}">${d}</text>`)
    .join("");

  const legendY = gy + gridH + 16;
  const legendRight = gx + gridW;
  const legendCells = [0, 1, 2, 3, 4]
    .map((k) => {
      const x = legendRight - (5 - k) * STEP - 34 + (STEP - CELL);
      return `<rect x="${x}" y="${legendY}" width="${CELL}" height="${CELL}" rx="2" class="c l${k}"/>`;
    })
    .join("");
  const legend = `<text x="${legendRight - 5 * STEP - 37}" y="${legendY + 9}" text-anchor="end">Less</text>${legendCells}<text x="${legendRight}" y="${legendY + 9}" text-anchor="end">More</text>`;

  const total = totalContributions.toLocaleString("en-US");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${total} contributions ${caption}">
${STYLE}
<text x="1" y="18" class="title">${total} contributions ${caption}</text>
<rect x="0.5" y="${TITLE_H + 0.5}" width="${boxW + 1}" height="${boxH}" rx="6" class="box"/>
<g class="label">${months}${days}${legend}</g>
${cells}
</svg>
`;
}

const calendar = await fetchCalendar();
await mkdir(OUT_DIR, { recursive: true });
await writeFile(`${OUT_DIR}/contributions.svg`, render(calendar));

const recent = calendar.weeks.slice(-26);
const recentTotal = recent.flatMap((w) => w.contributionDays).reduce((sum, d) => sum + d.contributionCount, 0);
await writeFile(`${OUT_DIR}/contributions-mobile.svg`, render({ totalContributions: recentTotal, weeks: recent }, "in the last 6 months"));
console.log(`Rendered ${calendar.totalContributions} contributions for ${USER ?? "mock"}`);
