# [Feature Name]

> **Status**: [Planning / In Development / Completed / Deprecated]
> **Created**: YYYY-MM-DD
> **Last Modified**: YYYY-MM-DD
> **Owner/Lead**: [Name or "Team"]

## Overview

Brief description of what this feature does and why it exists.

## User Story / Use Case

**As a** [user type]
**I want** [goal/desire]
**So that** [benefit/value]

### Example Scenarios
- Scenario 1: [Describe specific use case]
- Scenario 2: [Describe another use case]

## Technical Implementation

### Architecture

High-level overview of how the feature is implemented.

```
[Optional: Architecture diagram or ASCII art]
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Component1 | `src/path/to/file.ts` | Description |
| Component2 | `src/path/to/file.ts` | Description |

### Tech Stack

- **Framework/Library**: [e.g., React, Next.js]
- **Dependencies**:
  - `package-name@version` - Purpose
  - `another-package@version` - Purpose
- **APIs/Services**: [External services used]

### Data Flow

1. Step 1: [Describe what happens]
2. Step 2: [Next step]
3. Step 3: [Final step]

### Code Examples

**Basic Usage:**
```typescript
// Example of how to use this feature
import { Component } from '@/path/to/component'

const example = () => {
  // Implementation
}
```

**Advanced Usage:**
```typescript
// More complex example
```

## Configuration

### Environment Variables

```bash
# Required
VARIABLE_NAME=value          # Description

# Optional
OPTIONAL_VAR=default_value   # Description
```

### Config Files

- **File**: `path/to/config.ts`
  - Option 1: Description
  - Option 2: Description

## Dependencies

### Internal Dependencies

- **Feature**: [Related feature name]
  - **Why**: [Explanation of dependency]
  - **Location**: `memory-bank/features/[feature-name]/`

### External Dependencies

- **Package**: `package-name`
  - **Version**: ^x.x.x
  - **Purpose**: [Why this dependency is needed]
  - **Alternatives Considered**: [If any]

## API Reference

### Functions/Hooks

#### `functionName(params)`

**Description**: What this function does

**Parameters**:
- `param1` (type): Description
- `param2` (type, optional): Description

**Returns**: Return type and description

**Example**:
```typescript
const result = functionName({ param1: 'value' })
```

### Components

#### `<ComponentName />`

**Props**:
```typescript
interface ComponentProps {
  prop1: string      // Description
  prop2?: number     // Optional - Description
}
```

**Usage**:
```tsx
<ComponentName prop1="value" />
```

## Testing

### Test Coverage

- **Unit Tests**: `path/to/test.test.ts`
- **Integration Tests**: `path/to/integration.test.ts`
- **E2E Tests**: `path/to/e2e.spec.ts`

### How to Test

```bash
# Run tests for this feature
npm test path/to/tests

# Run specific test
npm test -- feature-name
```

### Test Scenarios

- [ ] Scenario 1: Description
- [ ] Scenario 2: Description
- [ ] Edge case: Description

## Known Issues / Limitations

- **Issue 1**: Description and potential workaround
- **Limitation 1**: What the feature doesn't do and why

## Future Enhancements

- [ ] **Enhancement 1**: Description and priority
- [ ] **Enhancement 2**: Description and priority

## Decision Log

### Decision 1: [Decision Title]

**Date**: YYYY-MM-DD
**Context**: Why this decision was needed
**Decision**: What was decided
**Rationale**: Why this approach was chosen
**Alternatives**: What else was considered
**Consequences**: Impact of this decision

### Decision 2: [Another Decision]

[Same format as above]

## Migration Guide

### From Previous Version (if applicable)

**Breaking Changes**:
- Change 1: Description and migration path
- Change 2: Description and migration path

**Migration Steps**:
1. Step 1
2. Step 2
3. Step 3

## Performance Considerations

- **Optimization 1**: Description
- **Bottleneck**: Known performance issues and mitigations
- **Benchmarks**: [If available]

## Security Considerations

- **Security aspect 1**: How it's handled
- **Vulnerabilities**: Known issues and mitigations
- **Best Practices**: Security recommendations

## Troubleshooting

### Common Problems

**Problem 1: [Error message or symptom]**
- **Cause**: Why this happens
- **Solution**: How to fix it

**Problem 2: [Another issue]**
- **Cause**: Explanation
- **Solution**: Fix steps

### Debug Mode

```bash
# How to enable debugging for this feature
DEBUG=feature-name npm run dev
```

## Resources

### Documentation
- [Official Docs](https://example.com)
- [Tutorial](https://example.com)

### Related Files
- `src/path/to/file1.ts`
- `src/path/to/file2.ts`

### External References
- [Article or blog post](https://example.com)
- [Related GitHub issue](https://github.com/...)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed history.

### Recent Changes

- **YYYY-MM-DD**: Brief description of change
- **YYYY-MM-DD**: Another change

---

**Last Reviewed**: YYYY-MM-DD
**Review Schedule**: [Monthly / Quarterly / As needed]
