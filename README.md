<picture>
  <source media="(max-width: 767px)" srcset="assets/hero-mobile.svg">
  <img src="assets/hero.svg" width="100%" alt="David Sánchez Valle. Frontend engineer for product, UX and design systems. I turn product intent into accessible, coherent interfaces with React and Next.js, and I write down what I decided, what I ruled out and why. Medellín, Colombia.">
</picture>

<picture>
  <source media="(max-width: 767px)" srcset="https://raw.githubusercontent.com/dsanchezvalle/dsanchezvalle/output/contributions-mobile.svg">
  <img src="https://raw.githubusercontent.com/dsanchezvalle/dsanchezvalle/output/contributions.svg" width="100%" alt="Contribution graph">
</picture>

Most of this activity happens in private product repos. Here is what it goes into.

## Projects

### Trotamundos

`Live, invite only` &nbsp;JavaScript, PWA

An offline travel companion I built for my parents' trip, designed for older travelers.

<picture>
  <source media="(max-width: 767px)" srcset="assets/projects/trotamundos-mobile.svg">
  <img src="assets/projects/trotamundos.svg" width="100%" alt="Trotamundos Today screen: offline badge, large Show address button annotated with a 48 px touch target.">
</picture>

- **Tested for older travelers.** I wrote an accessibility brief (48 px touch targets, 7:1 contrast, readable at 200% font size, a taps-per-task budget) and check it with automated tests instead of judging it by eye.
- **Nothing to set up.** A "Today" screen opens the right guide from the local time and the itinerary, offline too, instead of a menu of destinations.

**What's next:** my parents' trip was the trigger. Now I want to open it up as a travel app anyone can use, on its own domain, which I already have. The brief stays the same: older travelers first.

### MisTarjetas.co

`In progress, launch upcoming` &nbsp;Next.js, React, Supabase

Transparent data on Colombian credit and debit cards, with every value traced to its source.

<picture>
  <source media="(max-width: 767px)" srcset="assets/projects/mistarjetas-mobile.svg">
  <img src="assets/projects/mistarjetas.svg" width="100%" alt="A card next to its details table: annual fee sourced from a PDF, cashback from the T&C, lounge access empty with no source.">
</picture>

- **No source, no value.** A field stays empty unless an official document backs it, instead of being inferred from the card's name or marketing. Coverage grows slower, but nothing on the page is a guess.
- **Ranges stay ranges.** Amounts written as *"desde"*, *"hasta"* or *"según"* are flagged for review instead of being shown as fixed prices, so readers don't anchor on a number the bank never promised.

**What's next:** a content strategy that complements the card data and helps people understand fees and benefits before they choose, with the same trust-first rules: every claim has a source, and no bank gets special treatment.

### workflow-template

`In progress, public release upcoming` &nbsp;Claude Code, Codex, GitHub Actions

An installable AI-assisted development workflow, from issue to merge.

<picture>
  <source media="(max-width: 767px)" srcset="assets/projects/workflow-mobile.svg">
  <img src="assets/projects/workflow.svg" width="100%" alt="Workflow from issue to validation, with plan, merge and validation as human checkpoints and a review loop back to build.">
</picture>

- **Three human checkpoints.** I review the plan, the pull request and the result after merging. Everything in between runs on its own, so my attention goes where judgment matters.
- **Rules the agent can't argue with.** Pushing to main, force-pushing and skipping hooks are blocked in config, not just discouraged in the prompt.

**What's next:** a public release as an open template that other developers can install in their own repos.

### Homelab Quest

`Live, level 1` &nbsp;React, Vite

A Duolingo-style course (in Spanish) that teaches Docker while you set up a real Home Assistant. [Try it](https://dsanchezvalle.github.io/homelab-quest/)

<picture>
  <source media="(max-width: 767px)" srcset="assets/projects/homelab-mobile.svg">
  <img src="assets/projects/homelab.svg" width="100%" alt="A lesson path next to a terminal: docker run --name ha -d is graded correct because flag order doesn't matter.">
</picture>

- **Graded like a real terminal.** Any valid flag order, alias or `sudo` counts as correct, so `-d --name ha` and `--name ha -d` both pass.
- **Mistakes are part of the lesson.** The solution only appears after two failed attempts and gives no XP, and missed questions come back in a review queue.

**What's next:** finishing levels 2 and 3, whose preview units are already in the app.

### Maringá – 02.11

`Published, Nov 2026` &nbsp;Next.js, React

A bilingual (Portuguese/Spanish) data story on the November 2026 tornado in Maringá, Brazil. [Read it](https://maringa-0211.vercel.app)

<picture>
  <source media="(max-width: 767px)" srcset="assets/projects/maringa-mobile.svg">
  <img src="assets/projects/maringa.svg" width="100%" alt="Map with damage points along an estimated track, and a source sheet with publisher and date.">
</picture>

- **Every figure has its source one tap away.** Unconfirmed numbers carry a "pending" badge, and the site's own estimates are labeled as unofficial.
- **Fast on a phone.** The map loads only when you scroll near it, and satellite frames ship as one image per region.

**What's next:** updating the figures as official data on the reconstruction is confirmed.

---

Full case studies are coming to **frontendlab.dev**. Before frontend, I spent ten years designing social innovation and entrepreneurship programs, which is why I start from the people who will use the thing.
