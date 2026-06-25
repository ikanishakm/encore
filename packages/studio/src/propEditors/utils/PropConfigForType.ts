import type {PropTypeConfig} from '@encorejs/core/types/public'

export type PropConfigForType<K extends PropTypeConfig['type']> = Extract<
  PropTypeConfig,
  {type: K}
>
