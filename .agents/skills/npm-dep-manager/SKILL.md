---
name: npm-dep-manager
description: >
  Manages npm dependencies for a Node.js project. Use this skill whenever the user wants to update npm packages, check for outdated dependencies, upgrade to latest minor/patch versions within the same major, or identify packages with new major versions available. Triggers on phrases like "update my npm dependencies", "upgrade packages", "check for outdated npm packages", "update node modules", "bump dependencies", or any request to manage, audit, or update package.json dependencies. Always use this skill when npm, node_modules, package.json, or package-lock.json are involved in an update/upgrade workflow — even if the user says "just update my packages" without mentioning npm explicitly.
---

# npm Dependency Manager Skill

Safely updates all npm dependencies to the **latest version within the same major version** (i.e., respects semver), and reports any packages where a **new major version** is available.

---

## Workflow

### Step 1 — Locate `package.json`

```bash
# If the user provides a path, use it. Otherwise, search:
find . -name "package.json" -not -path "*/node_modules/*" -maxdepth 4
```

Ask the user to confirm the correct `package.json` if multiple are found.

---

### Step 2 — Check currently installed + available versions

Run `npm outdated --json` to get a full picture. This returns JSON with:
- `current` — installed version
- `wanted` — latest satisfying current semver range (same major)
- `latest` — absolute latest on npm

```bash
cd <project-dir>
npm outdated --json 2>/dev/null || true
```

> Note: `npm outdated` exits with code 1 when outdated packages exist — always append `|| true` so it doesn't abort.

---

### Step 3 — Identify major version bumps

Parse the JSON output and compare `current` vs `latest`:

```bash
node -e "
const { execSync } = require('child_process');
const raw = execSync('npm outdated --json 2>/dev/null || true', { encoding: 'utf8' });
let data = {};
try { data = JSON.parse(raw || '{}'); } catch {}

const majorBumps = [];
const updateable = [];

for (const [pkg, info] of Object.entries(data)) {
  const cur = info.current?.split('.')[0];
  const latest = info.latest?.split('.')[0];
  const wanted = info.wanted;

  if (cur && latest && cur !== latest) {
    majorBumps.push({ pkg, current: info.current, latest: info.latest });
  }
  if (info.current !== wanted && wanted) {
    updateable.push({ pkg, current: info.current, wanted });
  }
}

console.log('=== MAJOR VERSION BUMPS AVAILABLE (NOT auto-updated) ===');
if (majorBumps.length === 0) {
  console.log('None.');
} else {
  majorBumps.forEach(({ pkg, current, latest }) =>
    console.log(\`  \${pkg}: \${current}  →  \${latest} (NEW MAJOR)\`)
  );
}

console.log('');
console.log('=== WILL BE UPDATED (same major, minor/patch) ===');
if (updateable.length === 0) {
  console.log('All packages already up to date.');
} else {
  updateable.forEach(({ pkg, current, wanted }) =>
    console.log(\`  \${pkg}: \${current}  →  \${wanted}\`)
  );
}
"
```

**Always show this summary to the user before proceeding.** Ask for confirmation unless the user already said "just do it" or similar.

---

### Step 4 — Update within same major

```bash
npm update
```

`npm update` already respects semver ranges in `package.json` — it updates to the highest version that satisfies the declared range (never crossing a major boundary).

For dependencies with static versions in `package.json` and updates available within in the same major version, list them to the user, and ask if they want to also update the ranges written in `package.json` (not just the lock file). If yes, use:

```bash
npx npm-check-updates -u --target minor
npm install
```

---

### Step 5 — Report results

After updating, run `npm outdated --json` again and show:

1. ✅ **Updated packages** — list with old → new version
2. ⚠️ **Major version bumps available** — list with current version and latest major available, with a note that these require **manual review** before upgrading (breaking changes)
3. ℹ️ **Already up to date** — any packages that needed no change

---

## Reporting Format

Always present results in a clear, readable table or list. Example:

```
✅ Updated (same major):
  express        4.18.1  →  4.21.2
  lodash         4.17.20 →  4.17.21
  typescript     5.2.2   →  5.4.5

⚠️  New major version available (manual upgrade needed):
  react          17.0.2  (latest: 18.3.1) — review breaking changes before upgrading
  eslint         7.32.0  (latest: 9.5.0)  — review breaking changes before upgrading

ℹ️  Already up to date:
  axios          1.7.2
```

---

## Edge Cases

| Situation | Handling |
|---|---|
| `node_modules` missing | Run `npm install` first, then proceed |
| `package-lock.json` missing | Note it will be created; proceed normally |
| Private/scoped packages fail | Warn user, skip those packages, continue with the rest |
| No outdated packages | Report "all dependencies are up to date" and skip update step |
| User wants to upgrade a specific major | Provide the exact command: `npm install pkg@latest` and warn about breaking changes |

---

## Useful npm Commands Reference

```bash
npm outdated                    # show outdated packages (human-readable)
npm outdated --json             # same, as JSON (for scripting)
npm update                      # update to latest within semver ranges
npm install pkg@latest          # install latest (may cross major)
npx npm-check-updates           # show what ncu would change
npx npm-check-updates -u        # rewrite package.json to latest versions
npx npm-check-updates -u --target minor  # rewrite, but stay within major
npm audit                       # check for known security vulnerabilities
```