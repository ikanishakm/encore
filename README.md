# Encore

**Encore** is a maintained, community fork of [Theatre.js](https://www.theatrejs.com) — a JavaScript animation library and visual editor for the web, including DOM, WebGL / [react-three-fiber](https://github.com/pmndrs/react-three-fiber), and any other JS-drivable target.

> Theatre.js is no longer actively maintained and does not support React 19.
> Encore picks up where it left off: the same API and editor, updated for
> **React 19 / react-three-fiber v9**, published under the `@encorejs/*` scope,
> and free of any hosted-cloud dependency. Others are welcome to use it.

Encore is **not** affiliated with or endorsed by the original Theatre.js authors. It is an independent fork that preserves their copyright and attribution (see [`NOTICE`](./NOTICE) and [`AUTHORS`](./AUTHORS)).

## Packages

| Package | What it is | License |
| --- | --- | --- |
| `@encorejs/core` | The runtime: projects, sheets, sequences, playback | Apache-2.0 |
| `@encorejs/studio` | The visual editor (dev-time only) | **AGPL-3.0-only** |
| `@encorejs/r3f` | react-three-fiber bindings + editable scenes | Apache-2.0 |
| `@encorejs/react` | React helpers | Apache-2.0 |
| `@encorejs/dataverse` | The reactive-state core | Apache-2.0 |
| `@encorejs/tweak` | Quick tweakable controls (formerly `theatric`) | Apache-2.0 |
| `@encorejs/browser-bundles` | Standalone browser/UMD bundles | Apache-2.0 + AGPL-3.0 |

> In production you ship only the runtime (`@encorejs/core`, `@encorejs/r3f`, …),
> which is Apache-2.0. `@encorejs/studio` is a development-time editor and is
> tree-shaken out of production builds, so the AGPL license does not affect
> the apps you ship.

## Quick start

```bash
npm install @encorejs/core @encorejs/studio
```

```ts
import { getProject } from '@encorejs/core'
import studio from '@encorejs/studio'

studio.initialize()

const project = getProject('My Project')
const sheet = project.sheet('Scene')
const obj = sheet.object('box', { x: 0, opacity: 1 })

obj.onValuesChange((v) => {
  // apply v.x, v.opacity to your DOM / WebGL object
})
```

The runtime API is identical to Theatre.js, so the
[Theatre.js documentation](https://www.theatrejs.com/docs/latest) applies to
Encore as well (substitute `@theatre/*` imports with `@encorejs/*`).

## Differences from Theatre.js

- **React 19 / r3f v9** across the monorepo (the original is pinned to React 18).
- **`@encorejs/*` scope** (the unscoped `theatric` package becomes `@encorejs/tweak`).
- **No cloud, no phone-home.** The hosted update checker, the cloud login
  (OAuth), and the multiplayer sync transport were **removed** from the editor.
  `@encorejs/studio` runs fully local (state in IndexedDB + JSON export) and
  never contacts a third-party server.

## License

Encore is dual-licensed, mirroring upstream Theatre.js:

- The runtime and helper packages are **Apache-2.0**.
- `@encorejs/studio` (the editor) is **AGPL-3.0-only**.

See [`LICENSE`](./LICENSE), each package's `LICENSE`, and [`NOTICE`](./NOTICE).

## Credits

Encore exists because of the years of work the Theatre.js authors and
contributors put into the original project. Huge thanks to **Aria Minaei**,
**Andrew Prifer**, and [everyone listed in `AUTHORS`](./AUTHORS).
