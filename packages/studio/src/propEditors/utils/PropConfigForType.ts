import type {PropTypeConfig} from '@encore/core/types/public'

export type PropConfigForType<K extends PropTypeConfig['type']> = Extract<
  PropTypeConfig,
  {type: K}
>
