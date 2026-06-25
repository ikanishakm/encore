import {createRequire} from 'module'
import type {Env} from '@encore/core/envSchema'
import type {$IntentionalAny} from '@encore/utils/types'
// This file gets imported by other packages who may ot have set up path aliases, so we should use relative imports here
// eslint-disable-next-line no-relative-imports
import {fullSchema} from '../src/envSchema'

// Use createRequire so this works whether the build helper is loaded as CJS
// (Node 18) or ESM (Node 20+), where a bare `require` is not defined.
const requireFromHere = createRequire(import.meta.url)

const env: Env = {
  THEATRE_VERSION: requireFromHere('../package.json').version,
  BUILT_FOR_PLAYGROUND: 'false',
  // Encore fork: no hosted cloud backend. Default to localhost so a bundled
  // studio never phones home to a third-party server. Self-hosters can override
  // BACKEND_URL at build time, or pass `serverUrl` to studio.initialize().
  BACKEND_URL: `http://localhost:3000`,
}

fullSchema.parse(env)

export const definedGlobals: Record<string, string> = {
  // json-touch-patch (an unmaintained package) reads this value. We patch it to just 'Set', becauce
  // this is only used in `@encore/studio`, which only supports evergreen browsers
  'global.Set': 'Set',
}

for (const entry of Object.entries(env)) {
  const [key, value] = entry as $IntentionalAny
  definedGlobals[`process.env.${key}`] = JSON.stringify(value)
}
