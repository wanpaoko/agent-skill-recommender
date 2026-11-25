# Elephant-Goldfish Model Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Google’s Elephant-Goldfish Model as the eleventh manually curated repository.

**Architecture:** Keep `assets/catalog.mjs` as the single catalog source and use the existing card, category, search, and sort behavior. Preserve the existing ten Nov. 24 Stars values; store the new rounded 22,800 snapshot with its Nov. 25 date, and make the site explain that dates are per card.

**Tech Stack:** HTML, browser-native ES modules, Node.js `node:test`.

**Spec:** `docs/superpowers/specs/2026-11-25-elephant-goldfish-model-design.md`

## Global Constraints

- Keep the catalog manual; do not call GitHub at runtime.
- Put the new repo in the existing 「AI 代理、寫作與研究」 category.
- Do not alter the existing ten repo records, their Stars counts, or Nov. 24 snapshot dates.
- Treat 22,800 as the rounded snapshot shown by GitHub on Nov. 25, not an exact live count.

## Review Focus

- The new repo must have a working canonical GitHub URL, its own date, and a non-empty factual description and pick reason; assert these in the catalog test.
- Search and category filters must find the new repo without changing existing results; assert both cases.
- Stars sort must include the new value in correct order and leave the catalog unmutated; update expected sort IDs and retain existing immutability coverage.
- Page copy must not present a single snapshot date for repositories recorded on different dates; update and inspect the Stars note and closing copy.
- Visible collection totals must match the data-driven 11 entries; keep count markup dynamically populated and update the two fixed hero labels.

---

### Task 1: Add the repository and align dated Stars copy

**Files:**
- Modify: `assets/catalog.mjs`
- Modify: `tests/catalog.test.mjs`
- Modify: `index.html`
- Modify: `README.md`

**Interfaces:**
- Keep `repositories`, `filterRepositories()`, and `sortRepositories()` unchanged.
- Add `elephant-goldfish-model` with owner `google`, repository `elephant-goldfish-model`, category `AI 代理、寫作與研究`, Stars `22_800`, and `starsCheckedAt: '2026-11-25'`.
- Change the internal Stars snapshot representation only as needed to express per-repository dates. Existing entries stay at `2026-11-24`.

- [ ] Extend catalog tests for 11 IDs, exact new record identity/URL, non-empty text, the new date and 22,800 snapshot; update expected sort orders and category/search assertions.
- [ ] Run `node --test tests/catalog.test.mjs`; confirm failure is due to the missing repository/updated expectations.
- [ ] Add the new record, factual description and pick reason based on the GitHub README; implement dated Stars data without changing the existing ten snapshots.
- [ ] Update the hero’s fixed collection labels to 11. Replace the single-date Stars notes with copy that says each card shows its own snapshot date; update README maintenance instructions to match per-repository dates.
- [ ] Run `node --test tests/catalog.test.mjs` and confirm all tests pass.
- [ ] Serve over HTTP and inspect the rendered page, verifying 11 counts, the new card/link/category/search, and accurate per-card snapshot dates.
