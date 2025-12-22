# Memory Bank Quick Start Guide

Quick reference for using the memory bank system.

## 📁 Structure at a Glance

```
memory-bank/
├── README.md              # Full documentation
├── FEATURES-INDEX.md      # Master feature list (START HERE)
├── QUICK-START.md         # This file
├── templates/
│   └── feature-template.md
├── architecture/
│   ├── tech-stack.md
│   └── system-overview.md
└── features/
    ├── theme-system/
    ├── sanity-integration/
    └── ui-components/
```

## 🚀 Common Tasks

### I want to understand the codebase

1. Start with [FEATURES-INDEX.md](./FEATURES-INDEX.md) - see all features
2. Read [system-overview.md](./architecture/system-overview.md) - understand architecture
3. Check [tech-stack.md](./architecture/tech-stack.md) - see technologies used

### I want to add a new feature

⚠️ **IMPORTANT**: Features must be developed in phases. See [WORKFLOW.md](./WORKFLOW.md)

1. **Check existing features**: Read [FEATURES-INDEX.md](./FEATURES-INDEX.md)
2. **Create folder**: `memory-bank/features/[feature-name]/`
3. **Copy template**: `cp templates/feature-template.md features/[feature-name]/README.md`
4. **Plan ALL phases** (3-5 phases):
   - Phase 1: Core functionality
   - Phase 2: UI components
   - Phase 3: Integration
   - Phase 4: Testing
   - Phase 5: Documentation
5. **Document plan** in feature README.md
6. **Update index**: Add to [FEATURES-INDEX.md](./FEATURES-INDEX.md) with status 🚧
7. **Implement phase by phase**:
   - Implement Phase 1
   - 🛑 **STOP** - Update memory bank
   - Commit
   - Continue to next phase
8. **Mark complete**: Update status to ✅ in FEATURES-INDEX.md

**Example:**
```bash
# Adding "newsletter" feature

# 1. Check if it exists
cat memory-bank/FEATURES-INDEX.md

# 2. Create folder
mkdir -p memory-bank/features/newsletter

# 3. Copy template
cp memory-bank/templates/feature-template.md memory-bank/features/newsletter/README.md

# 4. Create changelog
touch memory-bank/features/newsletter/CHANGELOG.md

# 5. Edit README.md - plan phases FIRST
# 6. Update FEATURES-INDEX.md
# 7. Implement Phase 1 → Update docs → Commit
# 8. Implement Phase 2 → Update docs → Commit
# ... continue for all phases
```

**See [WORKFLOW.md](./WORKFLOW.md) for visual workflow diagram.**

### I want to modify an existing feature

1. **Find feature**: Check [FEATURES-INDEX.md](./FEATURES-INDEX.md)
2. **Read docs**: Open `features/[feature-name]/README.md`
3. **Make changes** to code
4. **Update docs**:
   - Update README.md with changes
   - Add entry to CHANGELOG.md
   - Update "Last Modified" date

### I want to find how X works

**Method 1 - Use Features Index:**
1. Open [FEATURES-INDEX.md](./FEATURES-INDEX.md)
2. Search for keyword or browse categories
3. Click through to feature documentation

**Method 2 - Use Quick Reference Table:**
```
Theme System          → memory-bank/features/theme-system/
Sanity CMS           → memory-bank/features/sanity-integration/
UI Components        → memory-bank/features/ui-components/
Development Patterns  → memory-bank/architecture/patterns.md
Architecture         → memory-bank/architecture/system-overview.md
Tech Stack           → memory-bank/architecture/tech-stack.md
```

### I want to document a decision

Add to the feature's README.md in the "Decision Log" section:

```markdown
### Decision N: [Title]

**Date**: YYYY-MM-DD
**Context**: Why this decision was needed
**Decision**: What was decided
**Rationale**: Why this approach was chosen
**Alternatives**: What else was considered
**Consequences**: Impact of this decision
```

## 📋 Templates

### Feature Documentation Template

Location: `memory-bank/templates/feature-template.md`

**Sections:**
- Overview & use cases
- Technical implementation
- Configuration
- API reference
- Testing
- Decision log
- Troubleshooting

**Copy and customize for each new feature**

## 🔍 Quick Search

Looking for...

**Environment setup?**
→ `architecture/tech-stack.md` → Environment Variables

**How to run tests?**
→ Feature docs → Testing section

**Architecture decisions?**
→ Feature docs → Decision Log

**Tech stack info?**
→ `architecture/tech-stack.md`

**Available components?**
→ `features/ui-components/README.md`

**CMS schemas?**
→ `features/sanity-integration/README.md` → Content Schemas

**Theme configuration?**
→ `features/theme-system/README.md`

**Development patterns?**
→ `architecture/patterns.md` → Server components, data loading

**How to structure pages?**
→ `architecture/patterns.md` → Page Structure pattern

**Data fetching best practices?**
→ `architecture/patterns.md` → Server Data Component pattern

## 🏷️ Status Indicators

- ✅ **Completed** - Fully implemented
- 🚧 **In Development** - Active work
- 📋 **Planned** - Not started yet
- 🔄 **Refactoring** - Being improved
- ⚠️ **Deprecated** - Being phased out
- 🗃️ **Archived** - No longer used

## 📊 Current Features

| Feature | Status | Folder |
|---------|--------|--------|
| Theme System | ✅ | `features/theme-system/` |
| Sanity CMS | ✅ | `features/sanity-integration/` |
| UI Components | 🚧 | `features/ui-components/` |

## 💡 Best Practices

### When Creating Documentation

✅ **DO:**
- Use the template
- Include code examples
- Document decisions and why
- Keep it updated
- Reference file paths
- Add to FEATURES-INDEX.md

❌ **DON'T:**
- Skip the template
- Write generic docs
- Forget to update changelog
- Leave TODOs in docs
- Make up information

### When Naming Features

✅ **Good Names:**
- `theme-system`
- `sanity-integration`
- `user-authentication`
- `email-notifications`

❌ **Bad Names:**
- `stuff`
- `components` (too broad)
- `fix-bug` (not a feature)
- `misc`

## 🔗 Essential Links

| Document | Purpose |
|----------|---------|
| [FEATURES-INDEX.md](./FEATURES-INDEX.md) | Master feature list - START HERE |
| [README.md](./README.md) | Full documentation on memory bank |
| [system-overview.md](./architecture/system-overview.md) | Architecture and structure |
| [tech-stack.md](./architecture/tech-stack.md) | Technologies used |
| [feature-template.md](./templates/feature-template.md) | Template for new features |

## ❓ FAQ

**Q: Where do I start?**
A: [FEATURES-INDEX.md](./FEATURES-INDEX.md)

**Q: How do I document a new feature?**
A: Copy `templates/feature-template.md` to `features/[name]/README.md` and fill it in

**Q: Do I need to update the memory bank every time?**
A: Update when you add/modify features. Small bug fixes don't need doc updates.

**Q: What if a feature doesn't fit the template?**
A: Customize the template to fit your needs, but keep the important sections

**Q: How detailed should documentation be?**
A: Detailed enough that someone unfamiliar can understand and use the feature

**Q: Should I document third-party libraries?**
A: Document how YOU use them, not what they are. Link to their docs.

## 🎯 Next Steps

1. **Browse Features**: Check [FEATURES-INDEX.md](./FEATURES-INDEX.md)
2. **Understand Architecture**: Read [system-overview.md](./architecture/system-overview.md)
3. **Start Building**: When adding features, document in memory bank
4. **Keep Updated**: Update docs when code changes

---

**Need help?** Check the full [README.md](./README.md) or ask the team!
