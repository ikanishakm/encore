import type {Env} from '@encorejs/core/envSchema'
import type {$IntentionalAny} from '@encorejs/utils/types'

// process.env is guaranteed to be of type Env, because we validate it in `devEnv/cli`
export const env = process.env as $IntentionalAny as Env
