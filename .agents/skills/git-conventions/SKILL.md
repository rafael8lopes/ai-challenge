---
name: git-conventions
description: "Git workflow conventions for this repository. ALWAYS load this skill for any git-related work — writing commit messages, naming branches, creating or updating PRs, staging files, grouping commits, or validating any git convention. Do NOT write a commit message, or create a branch. Covers commit message format, branch naming rules, commit grouping heuristics, and protected branch rules."
---

# Git Conventions

## Commit Message Format

```
<type>(<scope>): <lowercase short description>
```

**Types**: `feat`, `fix`, `chore`, `refactor`, `docs`, `bug`  
**Scope**: Jira ticket number (`PROJ-1234`, `PROJ-5678`) OR `no-jira` for non-ticketed work  
**Description**: lowercase, imperative, concise

Examples:

- `feat(PROJ-1234): implement dashboard filter panel`
- `chore(PROJ-2345): add scroll lock to sidebar flyout`
- `fix(PROJ-3456): dropdown not updating from initial loading state`
- `chore(no-jira): update README getting-started guide`
- `refactor(PROJ-4567): migrate stores to composition api`

**Deriving scope from a branch name**: extract the ticket segment.  
Example: `feat/PROJ-1234-grid-view` → scope is `PROJ-1234`  
If the branch contains `no-jira`, use `no-jira` as the scope.

## Branch Naming Format

```
<type>/<TICKET-kebab-case-description>
```

For non-ticketed work:

```
<type>/no-jira-<kebab-case-description>
```

**Types**: `feat/`, `fix/`, `bug/`, `chore/`  
All lowercase. Words separated by hyphens.

Examples:

- `feat/PROJ-1234-improve-logging`
- `fix/PROJ-3456-dropdown-loading-state`
- `chore/no-jira-update-readme-getting-started`

## Protected Branches

- `develop` — integration branch. Never commit feature work directly to it.
- `main` — release branch. Never create feature branches from it.

All feature branches must be created from `develop`.

## Commit Grouping Heuristics

Never commit all changed files in a single dump. Group by semantic meaning:

| File type                                                                      | Commit group                           |
| ------------------------------------------------------------------------------ | -------------------------------------- |
| `*.spec.ts`, `*.test.ts`                                                       | Separate commit from implementation    |
| `translations/*.json`, `i18n.json`                                             | One commit for all translation changes |
| `package.json`, `vite.config.ts`, `eslint.config.mjs`, and other tooling files | One commit for config/tooling          |
| Feature or component files that belong together                                | One commit per logical unit            |
| CSS/style-only changes                                                         | Separate commit                        |

If there are 5+ changed files, always split into at least 2 commits.
