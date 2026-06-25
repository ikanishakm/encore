import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import type {ToolsetConfig} from '@encorejs/core'
import theatre from '@encorejs/core'
import extension from '@encorejs/r3f/dist/extension'
import {Atom, prism, val} from '@encorejs/dataverse'
import {onChange} from '@encorejs/core'

/**
 * Let's take a look at how we can use `prism`, `Ticker`, and `val` from Encore's Dataverse library
 * to create a switch with state that is updated automatically,
 * and is even stored in a Encore object.
 *
 * Without going into the details of `prism`, `Ticker`, and `val`, note that by wrapping our `ToolsetConfig` in a prism, our
 * ```ts
 * ... .onChange(Ticker.raf, (toolset) => {
 *       set(toolset)
 *     }, true)
 * ```
 * code will be called whenever `val(obj.props.exampleProp)` changes (whenever the user clicks the switch and the `onChange` callback is called).
 * This will ensure that our switch's value matches its state and is reflected in the UI via `set(toolset)`.
 */

void theatre.getStudio().then((studio) => {
  studio.extend(extension)
  studio.extend({
    id: '@encorejs/hello-world-extension',
    toolbars: {
      global(set, studio) {
        const exampleBox = new Atom('mobile')

        const untapFn = onChange(
          prism<ToolsetConfig>(() => [
            {
              type: 'Switch',
              value: val(exampleBox.prism),
              onChange: (value) => exampleBox.set(value),
              options: [
                {
                  value: 'mobile',
                  label: 'view mobile version',
                  svgSource: '😀',
                },
                {
                  value: 'desktop',
                  label: 'view desktop version',
                  svgSource: '🪢',
                },
              ],
            },
            {
              type: 'Icon',
              title: 'Example Icon',
              svgSource: '👁‍🗨',
              onClick: () => {
                console.log('hello')
              },
            },
          ]),
          (value) => {
            set(value)
          },
        )
        // listen to changes to this prism using the requestAnimationFrame shared ticker

        return untapFn
      },
    },
    panes: [],
  })
})
void theatre.init({studio: true})

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
