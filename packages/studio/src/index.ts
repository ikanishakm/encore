/**
 * The library providing the editor components of Encore.
 *
 * @packageDocumentation
 */

import {setStudio} from '@encore/studio/getStudio'
import {Studio} from '@encore/studio/Studio'

import type {GlobalVariableNames} from '@encore/core/globals'
import type {$FixMe} from '@encore/core/types/public'
import StudioBundle from './StudioBundle'
import type CoreBundle from '@encore/core/CoreBundle'
import type {IStudio} from '@encore/core/types/public'

const globalVariableNames: GlobalVariableNames = {
  StudioBundle: '__Encore_StudioBundle',
  coreBundle: '__Encore_CoreBundle',
  notifications: '__Encore_Notifications',
}

const studioPrivateAPI = new Studio()
setStudio(studioPrivateAPI)

/**
 * The main instance of Studio. Read more at {@link IStudio}
 */
const studio: IStudio = studioPrivateAPI.publicApi

export {}

registerStudioBundle()

function registerStudioBundle() {
  if (
    typeof window == 'undefined' &&
    global.__THEATREJS__FORCE_CONNECT_CORE_AND_STUDIO !== true
  )
    return

  const globalContext = typeof window !== 'undefined' ? window : global

  const existingStudioBundle = (globalContext as $FixMe)[
    globalVariableNames.StudioBundle
  ]

  if (typeof existingStudioBundle !== 'undefined') {
    if (
      typeof existingStudioBundle === 'object' &&
      existingStudioBundle &&
      typeof existingStudioBundle.version === 'string'
    ) {
      throw new Error(
        `It seems that the module '@encore/studio' is loaded more than once. This could have two possible causes:\n` +
          `1. You might have two separate versions of Encore in node_modules.\n` +
          `2. Or this might be a bundling misconfiguration, in case you're using a bundler like Webpack/ESBuild/Rollup.\n\n` +
          `Note that it **is okay** to import '@encore/studio' multiple times. But those imports should point to the same module.`,
      )
    } else {
      throw new Error(
        `The variable window.${globalVariableNames.StudioBundle} seems to be already set by a module other than @encore/core.`,
      )
    }
  }

  const studioBundle = new StudioBundle(studioPrivateAPI)

  // @ts-ignore ignore
  globalContext[globalVariableNames.StudioBundle] = studioBundle

  const possibleCoreBundle: undefined | CoreBundle =
    // @ts-ignore ignore
    globalContext[globalVariableNames.coreBundle]

  if (
    possibleCoreBundle &&
    possibleCoreBundle !== null &&
    possibleCoreBundle.type === 'Theatre_CoreBundle'
  ) {
    studioBundle.registerCoreBundle(possibleCoreBundle)
  }
}

import {notify} from '@encore/studio/notify'

if (typeof window !== 'undefined') {
  // @ts-ignore
  window[globalVariableNames.notifications] = {
    notify,
  }
}
