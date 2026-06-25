export type {
  ILogger,
  IUtilLogger,
  ITheatreConsoleLogger,
  ITheatreLogIncludes,
  ITheatreLogSource,
  ITheatreLoggerConfig,
  ITheatreLoggingConfig,
  ITheatreInternalLogger,
} from '@encore/utils/_logger/logger'
import {
  createTheatreInternalLogger,
  TheatreLoggerLevel,
} from '@encore/utils/_logger/logger'
import type {IUtilLogger} from '@encore/utils/_logger/logger'
export {
  TheatreLoggerLevel,
  createTheatreInternalLogger,
} from '@encore/utils/_logger/logger'

/**
 * Common object interface for the context to pass in to utility functions.
 *
 * Prefer to pass this into utility function rather than an {@link IUtilLogger}.
 */
export interface IUtilContext {
  readonly logger: IUtilLogger
}

const internal = createTheatreInternalLogger(console, {
  _debug: function () {},
  _error: function () {},
})

internal.configureLogging({
  dev: true,
  min: TheatreLoggerLevel.TRACE,
})

export default internal
  .getLogger()
  .named('Encore (default logger)')
  .utilFor.dev()
