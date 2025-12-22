# Memory Bank Workflow

Visual guide for the phase-based development workflow with memory bank updates.

## 🚨 CRITICAL RULE

**NEVER proceed to the next phase without updating the memory bank.**

This is not optional - it's a mandatory checkpoint between every phase.

## 📊 Phase-Based Development Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    NEW FEATURE REQUEST                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Check Memory Bank                                  │
│  ✓ Read memory-bank/FEATURES-INDEX.md                       │
│  ✓ Check if feature already exists                          │
│  ✓ Review related features                                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Create Feature Documentation                       │
│  ✓ mkdir memory-bank/features/[feature-name]                │
│  ✓ Copy feature template                                    │
│  ✓ Create CHANGELOG.md                                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Plan ALL Phases                                    │
│  ✓ Break feature into 3-5 logical phases                    │
│  ✓ Document each phase's objectives                         │
│  ✓ Identify dependencies                                    │
│  ✓ Add to FEATURES-INDEX.md (status: 📋 Planned)            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Get User Approval                                  │
│  ✓ Present phase breakdown                                  │
│  ✓ Confirm approach                                         │
│  ✓ Clarify ambiguities                                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
         ┌────────────────────────────┐
         │  Update Status: 🚧 In Dev  │
         └────────────┬───────────────┘
                      │
         ╔════════════▼════════════════════════════════════╗
         ║           PHASE IMPLEMENTATION LOOP             ║
         ║                                                 ║
         ║  ┌───────────────────────────────────────────┐ ║
         ║  │  Implement Phase N                        │ ║
         ║  │  - Write code                             │ ║
         ║  │  - Create components                      │ ║
         ║  │  - Add tests                              │ ║
         ║  └─────────────────┬─────────────────────────┘ ║
         ║                    │                           ║
         ║                    ▼                           ║
         ║  ┌───────────────────────────────────────────┐ ║
         ║  │  🛑 MANDATORY CHECKPOINT 🛑                │ ║
         ║  │                                            │ ║
         ║  │  STOP - Update Memory Bank:                │ ║
         ║  │  1. Update feature README.md               │ ║
         ║  │     - Mark phase completed                 │ ║
         ║  │     - Document implementation              │ ║
         ║  │     - Add code examples                    │ ║
         ║  │  2. Update CHANGELOG.md                    │ ║
         ║  │     - Add dated entry for this phase       │ ║
         ║  │     - List all changes                     │ ║
         ║  │  3. Update FEATURES-INDEX.md if needed     │ ║
         ║  │  4. Commit memory bank changes             │ ║
         ║  └─────────────────┬─────────────────────────┘ ║
         ║                    │                           ║
         ║                    ▼                           ║
         ║  ┌───────────────────────────────────────────┐ ║
         ║  │  Verify Memory Bank Updated               │ ║
         ║  │  ✓ README.md has phase details            │ ║
         ║  │  ✓ CHANGELOG.md has entry                 │ ║
         ║  │  ✓ Changes committed                      │ ║
         ║  └─────────────────┬─────────────────────────┘ ║
         ║                    │                           ║
         ║                    ▼                           ║
         ║           ┌─────────────────┐                  ║
         ║           │ More Phases?    │                  ║
         ║           └────┬────────┬───┘                  ║
         ║                │ YES    │ NO                   ║
         ║                └────┐   └──────────────┐       ║
         ║                     │                  │       ║
         ║    ┌────────────────┘                  │       ║
         ║    │ Next Phase                        │       ║
         ║    └──────────────────────┐            │       ║
         ╚═══════════════════════════│════════════│═══════╝
                                     └───────┐    │
                                             │    │
                                             └────┘
                                                  │
                                                  ▼
                      ┌─────────────────────────────────────┐
                      │  ALL PHASES COMPLETE                │
                      └─────────────────┬───────────────────┘
                                        │
                                        ▼
                      ┌─────────────────────────────────────┐
                      │  Final Memory Bank Update           │
                      │  ✓ Mark status: ✅ Completed        │
                      │  ✓ Review all documentation         │
                      │  ✓ Ensure changelog complete        │
                      │  ✓ Update FEATURES-INDEX.md         │
                      └─────────────────┬───────────────────┘
                                        │
                                        ▼
                      ┌─────────────────────────────────────┐
                      │  FEATURE COMPLETE ✅                │
                      └─────────────────────────────────────┘
```

## ⚠️ Common Mistakes to Avoid

### ❌ WRONG: Implementing All Phases at Once

```
User: "Add user authentication"

❌ BAD APPROACH:
1. Implement entire auth system
2. Create all components
3. Add all routes
4. Update docs at the end
```

**Why this is wrong:**
- No intermediate checkpoints
- Hard to review progress
- Risk of losing context
- Can't pause and resume easily
- Documentation becomes an afterthought

### ✅ CORRECT: Phase-by-Phase with Memory Updates

```
User: "Add user authentication"

✅ GOOD APPROACH:
1. Plan 4 phases:
   - Phase 1: Auth provider setup
   - Phase 2: Login UI
   - Phase 3: Protected routes
   - Phase 4: Session management

2. Implement Phase 1
   → 🛑 STOP
   → Update memory bank
   → Commit

3. Implement Phase 2
   → 🛑 STOP
   → Update memory bank
   → Commit

4. Continue for each phase...
```

**Why this is correct:**
- ✅ Incremental progress
- ✅ Reviewable at each step
- ✅ Can pause/resume anytime
- ✅ Documentation stays current
- ✅ Clear history in memory bank

## 📝 Memory Bank Update Checklist

After completing EACH phase, check off these items:

```markdown
Phase [N] Completion Checklist:

□ Updated feature README.md:
  □ Marked phase as completed
  □ Documented what was implemented
  □ Added/updated code examples
  □ Updated configuration section if needed
  □ Added any new API references

□ Updated CHANGELOG.md:
  □ Added dated entry for this phase
  □ Listed all changes made
  □ Noted any breaking changes
  □ Included file paths affected

□ Updated FEATURES-INDEX.md (if needed):
  □ Changed status if applicable
  □ Updated dependencies if changed

□ Committed changes:
  □ All memory bank files committed
  □ Clear commit message

□ Verified completeness:
  □ Future Claude could understand what was done
  □ No missing information
  □ Examples are clear and accurate
```

**Only proceed to next phase when ALL items are checked.**

## 🔄 Example: Multi-Phase Feature

### Feature: Blog Post Display

**Phase Breakdown:**

```
Phase 1: Data fetching and Sanity queries
  ├─ Implement
  ├─ 🛑 STOP - Update memory bank
  └─ Commit

Phase 2: Blog listing page
  ├─ Implement
  ├─ 🛑 STOP - Update memory bank
  └─ Commit

Phase 3: Individual post page
  ├─ Implement
  ├─ 🛑 STOP - Update memory bank
  └─ Commit

Phase 4: Pagination and filtering
  ├─ Implement
  ├─ 🛑 STOP - Update memory bank
  └─ Commit

Phase 5: SEO and metadata
  ├─ Implement
  ├─ 🛑 STOP - Update memory bank
  ├─ Commit
  └─ Mark feature as ✅ Completed
```

### Memory Bank Updates Per Phase

**Phase 1 Update (Data Fetching):**
```markdown
# In memory-bank/features/blog-display/README.md

## Implementation Progress

### ✅ Phase 1: Data Fetching (Completed 2025-12-23)
- Created `src/lib/sanity/queries/posts.ts` with GROQ queries
- Implemented `getAllPosts()` function
- Implemented `getPostBySlug()` function
- Added TypeScript types for Post data
- Configured Sanity client for blog queries

# In memory-bank/features/blog-display/CHANGELOG.md

## [0.1.0] - 2025-12-23 - Phase 1

### Added
- GROQ queries for fetching posts
- TypeScript interfaces for Post type
- getAllPosts() and getPostBySlug() functions
```

**Phase 2 Update (Listing Page):**
```markdown
# In memory-bank/features/blog-display/README.md

## Implementation Progress

### ✅ Phase 1: Data Fetching (Completed 2025-12-23)
[Previous content...]

### ✅ Phase 2: Blog Listing Page (Completed 2025-12-23)
- Created `src/app/blog/page.tsx` listing page
- Implemented BlogCard component
- Added grid layout with Tailwind
- Integrated getAllPosts() query
- Added loading states

# In memory-bank/features/blog-display/CHANGELOG.md

## [0.2.0] - 2025-12-23 - Phase 2

### Added
- Blog listing page at /blog
- BlogCard component for post previews
- Responsive grid layout
```

*Continue for remaining phases...*

## 🎯 Quick Decision Tree

```
About to start implementing?
    │
    ▼
Have you checked FEATURES-INDEX.md?
    │
    ├─ No → ❌ STOP - Check it first
    │
    └─ Yes
        │
        ▼
    Have you planned all phases?
        │
        ├─ No → ❌ STOP - Plan phases first
        │
        └─ Yes
            │
            ▼
        About to finish a phase?
            │
            ▼
        Have you updated memory bank?
            │
            ├─ No → ❌ STOP - Update now
            │
            └─ Yes → ✅ Proceed to next phase
```

## 💡 Tips for Effective Phase Planning

### Good Phase Boundaries

✅ **Each phase should:**
- Have a clear, singular objective
- Be completable in reasonable time
- Build upon previous phase
- Produce reviewable output
- Be independently documentable

### Example of Good Phases

```
Feature: User Profile System

Phase 1: Data Models & Database
  → Clear objective: Set up data structure
  → Output: Schema and types

Phase 2: Profile View UI
  → Clear objective: Display profile
  → Output: Working view component

Phase 3: Profile Edit UI
  → Clear objective: Enable editing
  → Output: Edit form and save

Phase 4: Avatar Upload
  → Clear objective: Image handling
  → Output: Upload functionality

Phase 5: Validation & Error Handling
  → Clear objective: Robustness
  → Output: Complete, tested feature
```

### Example of Bad Phases

```
❌ Phase 1: "Do some stuff"
   → Not clear what "stuff" means

❌ Phase 2: "Frontend and backend and tests"
   → Too much in one phase, should split

❌ Phase 3: "Finish everything"
   → Not specific, unclear scope
```

## 📚 Related Documents

- [CLAUDE.md](../CLAUDE.md) - Full memory bank rules
- [FEATURES-INDEX.md](./FEATURES-INDEX.md) - All features
- [QUICK-START.md](./QUICK-START.md) - Quick reference
- [Feature Template](./templates/feature-template.md) - Documentation template

---

**Remember: Memory bank updates are NOT optional. They are mandatory checkpoints that ensure project continuity and context preservation.**
