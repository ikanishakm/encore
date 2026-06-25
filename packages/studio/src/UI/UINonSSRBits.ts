import UIRoot from '@encore/studio/UIRoot/UIRoot'
import type {$IntentionalAny} from '@encore/core/types/public'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {getMounter} from '@encore/studio/utils/renderInPortalInContext'
import {withStyledShadow} from '@encore/studio/css'
import ExtensionToolbar from '@encore/studio/toolbars/ExtensionToolbar/ExtensionToolbar'

export default class UINonSSRBits {
  readonly containerEl = document.createElement('div')
  private _renderTimeout: NodeJS.Timer | undefined = undefined
  private _documentBodyUIIsRenderedIn: HTMLElement | undefined = undefined
  readonly containerShadow: ShadowRoot & HTMLElement

  constructor() {
    // @todo we can't bootstrap Encore (as in, to design Encore using theatre), if we rely on IDed elements
    this.containerEl.id = 'theatrejs-studio-root'

    this.containerEl.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      z-index: 100;
    `

    const createShadowRoot = (): ShadowRoot & HTMLElement => {
      if (window.__IS_VISUAL_REGRESSION_TESTING === true) {
        const fauxRoot = document.createElement('div')
        fauxRoot.id = 'theatrejs-faux-shadow-root'
        document.body.appendChild(fauxRoot)
        return fauxRoot as $IntentionalAny
      } else {
        return this.containerEl.attachShadow({
          mode: 'open',
          // To see why I had to cast this value to HTMLElement, take a look at its
          // references of this prop. There are a few functions that actually work
          // with a ShadowRoot but are typed to accept HTMLElement
        }) as $IntentionalAny
      }
    }

    this.containerShadow = createShadowRoot()
  }

  render() {
    const renderCallback = () => {
      if (!document.body) {
        this._renderTimeout = setTimeout(renderCallback, 5)
        return
      }
      this._renderTimeout = undefined
      this._documentBodyUIIsRenderedIn = document.body
      this._documentBodyUIIsRenderedIn.appendChild(this.containerEl)
      ReactDOM.createRoot(this.containerShadow).render(
        React.createElement(UIRoot, {containerShadow: this.containerShadow}),
      )
    }
    this._renderTimeout = setTimeout(renderCallback, 10)
  }

  renderToolset(toolsetId: string, htmlNode: HTMLElement) {
    const s = getMounter()

    s.mountOrRender(
      withStyledShadow(ExtensionToolbar),
      {toolbarId: toolsetId},
      htmlNode,
    )

    return s.unmount
  }
}
