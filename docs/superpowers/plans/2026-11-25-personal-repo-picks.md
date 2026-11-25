# Personal Repo Picks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the static site as the author's manually curated GitHub repository picks, with useful, evidence-grounded introductions.

**Architecture:** Keep the existing static ES modules, data-driven cards, filters, and responsive layout. Rename catalog APIs that describe skills, add a per-repository factual pick reason based on known project capabilities, and rewrite the site's identity and copy without GitHub synchronization or additional dependencies.

**Tech Stack:** HTML, CSS, browser-native ES modules, Node.js `node:test`.

**Spec:** `docs/superpowers/specs/2026-11-25-personal-repo-picks-design.md`

## Global Constraints

- Keep the current ten manually maintained repository entries; do not sync GitHub pinned repositories or call the GitHub API.
- Preserve search, category filtering, sorting, GitHub links, and responsive behavior.
- Do not claim personal experience or invent a recommendation rationale unsupported by the current repository data.
- Keep the implementation dependency-free and use DOM `textContent` for catalog content.

## Review Focus

- Missing or unsupported per-repository pick reasons could turn curation into fabricated endorsement; test that every entry has a non-empty reason, and review each reason against its existing factual description (Task 1).
- Stale skills-oriented identity or labels could contradict the new purpose; check page metadata and visible shared copy for the new curated-repository framing (Task 1).
- API renames could break filtering or sorting; run the existing catalog tests after updating all references (Task 1).
- Empty search results and category combinations could regress; retain the existing filter behavior and test suite unchanged beyond the API rename (Task 1).
- Cards remain navigable and legible at narrow viewports; inspect the actual page and responsive layout in a browser (Task 1).

---

### Task 1: Reframe catalog and website as personal repo picks

**Files:**
- Modify: `assets/catalog.mjs`
- Modify: `assets/app.mjs`
- Modify: `index.html`
- Modify: `assets/site.css`
- Modify: `tests/catalog.test.mjs`

**Interfaces:**
- Replace exported `skills`, `filterSkills()`, and `sortSkills()` with `repositories`, `filterRepositories()`, and `sortRepositories()`; migrate every in-repository caller, with no compatibility aliases.
- Add a required `pickReason` string to each repository record. It states a concise, specific reason the project's documented capability makes it worth a look, without claiming firsthand experience.

- [ ] Inspect LSP references for the three exported catalog symbols before renaming; update all callers and tests.
- [ ] Add/adjust catalog tests to assert all ten repository records have non-empty `pickReason` values, preserve their repository URLs and dated Stars snapshots, and retain search, category, and sorting behavior using the renamed APIs.
- [ ] Write a brief Traditional Chinese `pickReason` for each record, grounded in its existing project description; retain capability descriptions, categories, tags, and the ten-entry scope.
- [ ] Render the reason distinctly on each card, preserve the repository link and Stars snapshot, and update browser-facing selectors/variables to repository terminology.
- [ ] Rewrite page metadata and visible identity/copy: describe an author's manually curated set of good GitHub repositories, not an AI-agent/skills-only directory. Keep category controls useful for the existing ten entries, and label Stars as popularity context rather than a quality or selection signal.
- [ ] Update the stylesheet only as needed for the new card text and heading lengths; preserve keyboard focus, reduced-motion, and responsive rules.
- [ ] Run `node --test tests/catalog.test.mjs`; expect all tests to pass.
- [ ] Serve the site over HTTP and inspect desktop and narrow/mobile views; verify the new identity, pick reasons, filters, cards, GitHub navigation, and Stars note in the rendered page.

**Implementation ruling:** Rename the AI grouping to 「AI 代理、寫作與研究」 and assign ChartDB to 「資料庫與資料設計」. The former combines the existing agent collaboration, Chinese writing, cross-platform research, and coding-agent projects; the latter gives the existing database schema/ER-diagram project a usable filter. Each visible category now matches its data category and has at least one repository.
