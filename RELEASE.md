# Releasing Encore

This repo is a maintained fork of Theatre.js, renamed to the `@encore/*` npm
scope and updated for React 19. This document covers what was changed and the
exact steps to publish to npm.

## What changed in the fork

- **Scope rename** `@theatre/* → @encore/*` across ~486 files (2,220 import +
  package-name references). The unscoped `theatric` package became
  `@encore/tweak`.
- **Attribution** preserved and added: every package keeps its original
  `author` fields; root [`NOTICE`](./NOTICE) and [`AUTHORS`](./AUTHORS) credit
  Aria Minaei, Andrew Prifer, TheaterJS Oy and all upstream contributors, as
  required by Apache-2.0 / AGPL-3.0.
- **Licenses unchanged** (and legally must stay so): runtime packages are
  Apache-2.0; `@encore/studio` is AGPL-3.0-only.
- **No phone-home.** The hosted update checker (`updates.theatrejs.com`) is now
  a no-op, and the studio backend defaults to `localhost` instead of
  `app.theatrejs.com`. See [`packages/studio/src/checkForUpdates.ts`](./packages/studio/src/checkForUpdates.ts)
  and [`packages/core/devEnv/definedGlobals.ts`](./packages/core/devEnv/definedGlobals.ts).
- **Build-tooling fixes** (these were pre-existing bugs, not caused by the
  rename — they only surfaced on Windows + Node 24):
  - Bumped `tsx` to `^4.20` (resolution) so the CommonJS build scripts load
    correctly on Node 20+/24.
  - `packages/core/devEnv/definedGlobals.ts` uses `createRequire` (ESM-safe).
  - `packages/react/devEnv/build.ts` skips externalizing the entry point (the
    old regex matched Windows `C:\...` paths).
  - Fixed the broken insiders CI step (`yarn cli prerelease ci`).

## Verified

All 8 publishable packages build on Windows + Node 24:
`@encore/dataverse`, `@encore/core`, `@encore/react`, `@encore/r3f`,
`@encore/saaz`, `@encore/tweak`, `@encore/studio`, `@encore/browser-bundles`.

## Prerequisites (one-time, you must do these — they need your accounts)

1. **Claim the npm scope.** Create the `@encore` org/scope on npmjs.com.
   - If `@encore` is already taken, do a global find/replace of `@encore/` to a
     free scope (e.g. `@encorejs/`) and re-run `yarn install`.
2. **Create the GitHub repo** (the package metadata points at
   `https://github.com/Kanishak/encore` — change it if you use a different
   URL), then push this `encore` branch.
3. **npm auth.** Run `npm login` locally (the account must have publish rights
   to the `@encore` scope). For CI, set the `NPM_TOKEN` repo secret.

## Publish

```bash
# 1. Install (Node 20 LTS recommended; Node 24 also works with the tsx bump)
yarn install

# 2. Build everything (optional — release does this too)
yarn cli build

# 3. Release. Picks the npm dist-tag automatically:
#    plain x.y.z -> "latest";  x.y.z-rc.N -> "rc", etc.
yarn cli release 1.0.0
```

`yarn cli release`:
- requires a **clean git tree** and a version **different** from the current
  one (currently `0.7.0`, so `1.0.0` is fine) with **no pre-existing git tag**;
- runs typecheck + lint (skip with `--skip-lint`), builds all 8 packages,
  commits, tags, and `npm publish --access public` each one;
- sets the `THEATRE_IS_PUBLISHING` gate for you — so do **not** run
  `npm publish` directly on a package.

After publishing, sanity-check:

```bash
npm view @encore/core
# in a fresh app:
npm install @encore/core @encore/r3f @encore/studio
```

## Known limitations / optional follow-ups

- **Studio ships without generated `.d.ts`.** Type generation for studio is
  disabled *upstream too* (`bundleTypes()` is commented out in
  `packages/studio/devEnv/cli.ts`) — studio is consumed as
  `import studio from '@encore/studio'`, so this rarely matters. Re-enabling it
  is a future improvement.
- **Deep de-cloud not done (by design).** Studio still contains the cloud
  auth / sync-server transport code. It no longer contacts third-party servers
  (backend defaults to localhost; update checker removed), and the editor works
  fully offline for local editing — but a boot-time request to `localhost:3000`
  fails harmlessly and logs a console error. Fully removing the auth/sync
  transport (delete `Auth.ts`, `SyncStore/*`, and rewrite
  `StudioStore.ts` to always use a local saaz backend) is a clean follow-up.
  Note: `@encore/sync-server` cannot simply be deleted — studio imports its
  state schema (`stateEditors`, `schema`, `graphEditorColors`) for local
  editing.
- **Cloud packages** `@encore/app` and `@encore/sync-server` are kept in the
  workspace (private, not published) because studio type-depends on them. They
  are not shipped to consumers.
- **Node version.** Build/publish on Node 20 LTS for the smoothest experience;
  Node 24 works with the `tsx` bump already applied.
