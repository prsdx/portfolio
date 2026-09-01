# Task: [TASK NAME]

## Session start checklist
```bash
# 1. Read project context
cat CLAUDE.md

# 2. Build / refresh Graphify graph
graphify

# 3. Check active branch
git status
git checkout feat/[branch-name]   # or create: git checkout -b feat/[branch-name]

# 4. Discover skills
find /mnt/skills -name "SKILL.md" | sort
# Read descriptions, open any that apply to this task
```

---

## Context
<!-- What exists already. Query Graphify rather than reading files. -->
- Current state: [what's done so far]
- This task builds on: [previous task or branch]
- Design variation in use: see `docs/decisions.md` ADR-001
- Visual references: `docs/references.md`

---

## Goal
<!-- One sentence. What does "done" look like? -->

---

## Scope — build only this
<!-- Explicit list. If it's not here, don't build it. -->
- [ ] Item 1
- [ ] Item 2

## Out of scope — do not build
<!-- Explicit list to prevent drift. -->
- Not this
- Not this either

---

## References
<!-- Inline links Cline should check for this specific task. -->
- Design: `docs/references.md`
- Architecture: `docs/architecture.md`
- Related decisions: `docs/decisions.md`

---

## Technical notes
<!-- Constraints, patterns, gotchas specific to this task. -->

---

## Ask Shubham if
<!-- Cline must stop and ask — do not assume or skip. -->
- [ ] Missing env var or API key
- [ ] Design decision not covered in docs/decisions.md
- [ ] Need a VS Code extension, tool, or plugin installed
- [ ] Something in scope conflicts with something already built
- [ ] Ambiguous requirement

---

## Done when
<!-- Concrete checklist Cline verifies before closing the task. -->
- [ ] `astro build` passes with zero errors
- [ ] Looks correct at 375px and 1440px
- [ ] No console errors in browser
- [ ] Branch pushed: `git push origin feat/[branch-name]`
- [ ] Specific acceptance criteria listed here

---

## Notes for next task
<!-- Cline writes this section after finishing. What the next session needs to know. -->
