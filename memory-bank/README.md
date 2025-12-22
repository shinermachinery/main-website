# Memory Bank

This memory bank system tracks all features, decisions, and architectural changes in the project. Each feature has its own dedicated folder with comprehensive documentation.

## Purpose

- Document features as they are developed
- Track technical decisions and rationale
- Maintain a historical record of changes
- Enable quick onboarding for new developers or AI assistants
- Provide context for future modifications

## Structure

```
memory-bank/
├── README.md                    # This file
├── FEATURES-INDEX.md           # Master index of all features
├── templates/                  # Templates for documentation
│   └── feature-template.md
├── architecture/               # High-level architecture docs
│   ├── tech-stack.md
│   ├── system-overview.md
│   └── patterns.md             # Development patterns & best practices
└── features/                   # Individual feature documentation
    ├── theme-system/
    ├── sanity-integration/
    └── [feature-name]/
```

## How to Use

### Starting a New Feature

1. Create a new folder in `memory-bank/features/[feature-name]/`
2. Copy the template from `memory-bank/templates/feature-template.md`
3. Fill in the template with feature details
4. Update `FEATURES-INDEX.md` with the new feature

### Documenting Changes

When modifying an existing feature:
1. Navigate to the feature's folder
2. Update the relevant documentation
3. Add entries to `CHANGELOG.md` within the feature folder
4. Update the "Last Modified" date in the feature's main README

### Feature Folder Structure

Each feature folder should contain:
```
feature-name/
├── README.md           # Main feature documentation
├── CHANGELOG.md        # History of changes
├── technical-specs.md  # Technical implementation details
├── decisions.md        # Key decisions and rationale
└── assets/            # Screenshots, diagrams, etc. (optional)
```

## Guidelines

### Documentation Standards

- **Be Specific**: Include file paths, component names, and code references
- **Explain Why**: Document the reasoning behind decisions
- **Keep Updated**: Update docs when code changes
- **Use Examples**: Include code snippets and usage examples
- **Track Dependencies**: Note related features and dependencies

### When to Create a New Feature Entry

Create a new feature folder when:
- Adding a new user-facing capability
- Implementing a new integration or service
- Creating a new architectural pattern
- Building a new component system
- Adding a major technical capability

### When to Update Existing Documentation

Update existing docs when:
- Modifying feature behavior
- Fixing bugs that affect the feature
- Refactoring implementation
- Adding new configuration options
- Changing APIs or interfaces

## Maintenance

- Review and update the FEATURES-INDEX.md monthly
- Archive deprecated features to `memory-bank/archived/`
- Keep individual feature docs under 5 pages when possible
- Use cross-references to avoid duplication

## Phase-Based Development

**CRITICAL REQUIREMENT**: All features MUST be developed in phases.

- Plan features in 3-5 logical phases before starting
- Implement one phase at a time
- **Update memory bank after EVERY phase before proceeding**
- See [WORKFLOW.md](./WORKFLOW.md) for detailed workflow

**Memory Bank Update Cycle:**
```
Implement Phase → 🛑 STOP → Update Docs → Commit → Next Phase
```

**Never skip the memory bank update between phases.**

This ensures:
- Incremental, reviewable progress
- Complete historical record
- Ability to pause and resume
- Context preservation between sessions

See [CLAUDE.md](../CLAUDE.md) for complete rules and [WORKFLOW.md](./WORKFLOW.md) for visual workflow.

## Quick Reference

| Document | Purpose |
|----------|---------|
| FEATURES-INDEX.md | Find all features at a glance - START HERE |
| WORKFLOW.md | Visual guide for phase-based development |
| QUICK-START.md | Quick reference for common tasks |
| templates/ | Standardized documentation format |
| architecture/ | System-level documentation |
| architecture/patterns.md | Development patterns & best practices |
| features/[name]/ | Specific feature details |
| ../CLAUDE.md | Memory bank rules (7 critical rules) |
