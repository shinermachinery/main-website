# Memory Bank System Integration

Documentation of how the memory bank system integrates with CLAUDE.md and the development workflow.

**Last Updated**: 2026-02-17

## Overview

The memory bank system is now fully integrated into the development workflow through CLAUDE.md. Future Claude Code instances will automatically follow the phase-based development process with mandatory memory bank updates.

## Integration Points

### 1. CLAUDE.md Integration

The memory bank system is documented in `CLAUDE.md` under the "Memory Bank System" section with:

- **7 Critical Rules** that must be followed
- **Phase-based development workflow** requirement
- **Mandatory checkpoints** between phases
- **Complete examples** of correct and incorrect workflows
- **Quick reference tables** for common tasks

**Location in CLAUDE.md**: "Memory Bank System" section (compact format, references memory-bank/ for details)

### 2. File Structure

```
Project Root
│
├── CLAUDE.md                           # Slim reference with essential rules
│   └── Memory Bank System section      # Compact rules + links to memory-bank/
│
└── memory-bank/
    ├── README.md                        # System documentation
    ├── FEATURES-INDEX.md                # Master feature list
    ├── QUICK-START.md                   # Quick reference
    ├── WORKFLOW.md                      # Visual workflow guide
    ├── SYSTEM-INTEGRATION.md            # This file
    │
    ├── templates/
    │   └── feature-template.md          # Feature documentation template
    │
    ├── architecture/
    │   ├── tech-stack.md                # Technology documentation
    │   ├── system-overview.md           # Architecture documentation
    │   ├── patterns.md                  # Development patterns
    │   └── development-guide.md         # Commands, config, MCP, shadcn/ui
    │
    └── features/
        ├── theme-system/                # Example feature
        ├── sanity-integration/          # Example feature
        └── ui-components/               # Example feature
```

## The 7 Critical Rules

As documented in CLAUDE.md:

1. **Always Check Memory Bank First** - Review FEATURES-INDEX.md before starting work
2. **Phase-Based Development is REQUIRED** - Break features into 3-5 phases
3. **Update Memory Bank After EVERY Phase** - Mandatory checkpoint before next phase
4. **New Feature Workflow** - Follow standardized process
5. **Modifying Existing Features** - Read docs first, update after changes
6. **Documentation Standards** - Include file paths, examples, and rationale
7. **Cross-Feature Dependencies** - Document in both features

## Automatic Workflow Enforcement

When Claude Code is initialized in this repository:

1. **Reads CLAUDE.md** - Gets all memory bank rules
2. **Understands phase requirement** - Must plan features in phases
3. **Enforces checkpoints** - Cannot proceed to next phase without updating memory bank
4. **Follows workflow** - Uses the documented process automatically

## Phase-Based Development Flow

```
Start Feature
    ↓
Check FEATURES-INDEX.md
    ↓
Create Feature Folder
    ↓
Plan ALL Phases (3-5)
    ↓
Document in README.md
    ↓
Add to FEATURES-INDEX.md (🚧 In Development)
    ↓
╔═══════════════════════════════════╗
║     FOR EACH PHASE:               ║
║                                   ║
║  1. Implement Phase               ║
║  2. 🛑 STOP                       ║
║  3. Update README.md              ║
║  4. Update CHANGELOG.md           ║
║  5. Commit Memory Bank            ║
║  6. Proceed to Next Phase         ║
╚═══════════════════════════════════╝
    ↓
All Phases Complete
    ↓
Mark as ✅ Completed in FEATURES-INDEX.md
    ↓
Feature Complete
```

## Documentation Hierarchy

Understanding which document serves which purpose:

### For Future Claude Instances

**Primary**: `CLAUDE.md`
- First file read when starting work
- Contains all mandatory rules
- References memory bank system
- Provides workflow examples

**Secondary**: `memory-bank/FEATURES-INDEX.md`
- Master list of all features
- Current status of each feature
- Quick navigation to feature docs

### For Developers

**Primary**: `memory-bank/QUICK-START.md`
- Quick reference for common tasks
- Fast lookup guide

**Secondary**: `memory-bank/WORKFLOW.md`
- Visual workflow diagrams
- Detailed process explanation
- Examples and anti-patterns

### For Feature Documentation

**Template**: `memory-bank/templates/feature-template.md`
- Standardized structure
- All required sections
- Copy for each new feature

**Individual Features**: `memory-bank/features/[name]/`
- Complete feature documentation
- Implementation details
- Decision logs
- Changelogs

## How It Works in Practice

### Scenario: User Asks to Add New Feature

```
User: "Add user authentication"

Claude's Automatic Process:
1. ✓ Reads CLAUDE.md rules (already knows them)
2. ✓ Checks memory-bank/FEATURES-INDEX.md
3. ✓ Sees no auth feature exists
4. ✓ Creates memory-bank/features/user-authentication/
5. ✓ Copies template to README.md
6. ✓ Plans phases:
     - Phase 1: Auth provider setup
     - Phase 2: Login/logout UI
     - Phase 3: Protected routes
     - Phase 4: Session management
7. ✓ Documents plan in README.md
8. ✓ Adds to FEATURES-INDEX.md (status: 🚧)
9. ✓ Implements Phase 1
10. 🛑 STOPS - Updates memory bank
11. ✓ Commits changes
12. ✓ Implements Phase 2
13. 🛑 STOPS - Updates memory bank
14. ... continues for all phases
15. ✓ Marks as ✅ Completed
```

### Scenario: User Asks to Modify Existing Feature

```
User: "Update the theme system to add custom colors"

Claude's Automatic Process:
1. ✓ Checks FEATURES-INDEX.md
2. ✓ Finds theme-system feature
3. ✓ Reads memory-bank/features/theme-system/README.md
4. ✓ Reviews CHANGELOG.md
5. ✓ Understands current implementation
6. ✓ Plans modification as phases if needed
7. ✓ Makes changes
8. ✓ Updates README.md with changes
9. ✓ Adds entry to CHANGELOG.md
10. ✓ Updates "Last Modified" date
11. ✓ Commits memory bank updates
```

## Benefits of Integration

### For Continuity
- Every session has complete context
- No information loss between sessions
- Can pause and resume at any point

### For Quality
- Incremental, reviewable progress
- Clear decision history
- Documented rationale for choices

### For Collaboration
- New developers understand system quickly
- Clear feature boundaries
- Easy to see what exists and why

### For Maintenance
- Easy to understand past decisions
- Clear history of changes
- Documented dependencies

## Verification Checklist

To verify the system is properly integrated:

- [x] CLAUDE.md contains Memory Bank System section
- [x] 7 Critical Rules documented in CLAUDE.md
- [x] Phase-based workflow documented in CLAUDE.md
- [x] Examples provided in CLAUDE.md
- [x] memory-bank/ directory exists with all files
- [x] FEATURES-INDEX.md lists current features
- [x] WORKFLOW.md provides visual guide
- [x] Feature template exists
- [x] Architecture docs exist
- [x] Existing features documented (3 features)
- [x] All cross-references working

## Maintenance

### Monthly Review
- Review FEATURES-INDEX.md
- Archive deprecated features
- Update status indicators
- Verify links still work

### Per Feature
- Update README.md when modified
- Add CHANGELOG.md entries
- Keep "Last Modified" current
- Update FEATURES-INDEX.md if status changes

### Per Phase
- Update feature README.md
- Add CHANGELOG.md entry
- Commit changes
- Verify completeness

## Future Claude Instances

When a future Claude Code instance initializes:

1. **Automatically reads CLAUDE.md**
2. **Sees Memory Bank System section**
3. **Understands the 7 rules**
4. **Follows phase-based workflow**
5. **Updates memory bank after each phase**
6. **References existing documentation**

**No additional instruction needed** - the system is self-documenting and self-enforcing through CLAUDE.md.

## Quick Reference Links

| What | Where |
|------|-------|
| Rules for Claude | [CLAUDE.md](../CLAUDE.md) - Essential rules + memory bank references |
| Feature list | [FEATURES-INDEX.md](./FEATURES-INDEX.md) |
| Quick start | [QUICK-START.md](./QUICK-START.md) |
| Visual workflow | [WORKFLOW.md](./WORKFLOW.md) |
| Dev guide | [architecture/development-guide.md](./architecture/development-guide.md) |
| Feature template | [templates/feature-template.md](./templates/feature-template.md) |
| Architecture | [architecture/system-overview.md](./architecture/system-overview.md) |
| Tech stack | [architecture/tech-stack.md](./architecture/tech-stack.md) |

---

**System Status**: ✅ Fully Integrated
**Last Verified**: 2026-02-17
**Next Review**: As needed
