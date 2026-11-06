<img src="assets/hero.svg" width="100%" alt="David Sánchez Valle. Frontend engineer for product, UX and design systems. I turn product intent into accessible, coherent interfaces with React and Next.js, and I write down what I decided, what I ruled out and why. Medellín, Colombia.">

<p align="center">
  <a href="https://www.linkedin.com/in/dsanchezvalle">LinkedIn</a>
</p>

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/dsanchezvalle/dsanchezvalle/output/contributions.svg" width="100%" alt="Contribution graph for the last year">
  <br>
  <sub>Most of this activity happens in private product repos. Here is what it goes into.</sub>
</p>

## Projects

<p align="center">
  <a href="#trotamundos"><img src="assets/cards/trotamundos.svg" width="98.6%" alt="Trotamundos, live and invite only: an offline travel companion built for my parents, designed for older travelers."></a>
</p>
<p align="center">
  <a href="#mistarjetasco"><img src="assets/cards/mistarjetas.svg" width="49%" alt="MisTarjetas.co, launch upcoming: transparent data on Colombian cards, every value traced to its source."></a>
  <a href="#workflow-template"><img src="assets/cards/workflow.svg" width="49%" alt="workflow-template, public release upcoming: an installable AI-assisted development workflow with three human checkpoints."></a>
</p>
<p align="center">
  <a href="#homelab-quest"><img src="assets/cards/homelab.svg" width="49%" alt="Homelab Quest, level 1 live: learn Docker by deploying a real Home Assistant, Duolingo-style."></a>
  <a href="#maringá--0211"><img src="assets/cards/maringa.svg" width="49%" alt="Maringá 02.11, published November 2026: a bilingual data story on the tornado in Maringá, Brazil."></a>
</p>

## Decisions and what's next

### Trotamundos

> For older travelers with intermediate digital skills, I chose **a written accessibility brief checked by automated tests** (48 px touch targets, 7:1 contrast, readable at 200% font size, a taps-per-task budget) over judging it by eye.

> For travelers who shouldn't have to set anything up, I chose **a "Today" screen that opens the right guide from the local time and the itinerary** over a menu of destinations. It works offline, too.

**What's next:** I built it for my parents' trip, and that was the trigger. Now I want to open it up as a travel app anyone can use, on its own domain, which I already have. The brief stays the same: older travelers first.

### MisTarjetas.co

> For people comparing cards they will pay for, I chose **to leave a field empty unless an official source backs it** over inferring it from the card's name or marketing. Nothing on the page is a guess, at the cost of slower coverage.

> For amounts written as *"desde"*, *"hasta"* or *"según"*, I chose **to flag them as ranges for review** over showing them as fixed prices. Readers don't anchor on a number the bank never promised.

**What's next:** a content strategy that complements the card data and helps people understand fees and benefits before they choose. It follows the same trust-first rules: every claim has a source, and no bank gets special treatment.

### workflow-template

> For a solo developer working with agents, I chose **exactly three human checkpoints** (plan, pull request, post-merge) over approving every step. Review effort goes where judgment matters, and the rest runs on its own.

> For safety, I chose **to deny risky git actions in config** (pushing to main, force-pushing, skipping hooks) over asking for it in the prompt. The agent can't talk its way past a rule.

**What's next:** a public release as an open template that other developers can install in their own repos.

### Homelab Quest

> For learners typing real commands, I built **a parser that accepts any valid flag order, aliases and `sudo`** over exact string matching. `-d --name ha` and `--name ha -d` are both right, as they are in a real terminal.

> For learning that sticks, I chose **to reveal the solution only after two failed attempts, for zero XP**, over a "show answer" button. Mistakes go to a review queue instead of being skipped.

**What's next:** finishing levels 2 and 3, whose preview units are already in the app. [Try level 1](https://dsanchezvalle.github.io/homelab-quest/)

### Maringá – 02.11

> For readers checking facts, I chose **a source one tap away for every figure**, with a "pending" badge on unconfirmed numbers and the site's own estimates labeled as unofficial, over a single sources page at the end.

> For mobile readers, I chose **to load the map only as it nears the viewport** and to ship satellite frames as one image per region, over loading everything up front.

**What's next:** updating the figures as official data on the reconstruction is confirmed. [Read it](https://maringa-0211.vercel.app)

<br>

Full case studies are coming to **frontendlab.dev**. Before frontend, I spent ten years designing social innovation and entrepreneurship programs, which is why I start from the people who will use the thing.
