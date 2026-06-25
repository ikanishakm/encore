import type Project from '@encorejs/core/projects/Project'
import SheetObjectTemplate from '@encorejs/core/sheetObjects/SheetObjectTemplate'
import type {
  SheetAddress,
  WithoutSheetInstance,
} from '@encorejs/core/types/public'
import {Atom} from '@encorejs/dataverse'
import type {Pointer} from '@encorejs/dataverse'
import Sheet from './Sheet'
import type {ObjectNativeObject} from './Sheet'

import type {
  ObjectAddressKey,
  SheetId,
  SheetInstanceId,
} from '@encorejs/core/types/public'
import type {StrictRecord} from '@encorejs/core/types/public'
import type {
  SheetObjectActionsConfig,
  SheetObjectPropTypeConfig,
} from '@encorejs/core/types/public'

type SheetTemplateObjectTemplateMap = StrictRecord<
  ObjectAddressKey,
  SheetObjectTemplate
>

export default class SheetTemplate {
  readonly type: 'Theatre_SheetTemplate' = 'Theatre_SheetTemplate'
  readonly address: WithoutSheetInstance<SheetAddress>
  private _instances = new Atom<Record<SheetInstanceId, Sheet>>({})
  readonly instancesP: Pointer<Record<SheetInstanceId, Sheet>> =
    this._instances.pointer

  private _objectTemplates = new Atom<SheetTemplateObjectTemplateMap>({})
  readonly objectTemplatesP = this._objectTemplates.pointer

  constructor(
    readonly project: Project,
    sheetId: SheetId,
  ) {
    this.address = {...project.address, sheetId}
  }

  getInstance(instanceId: SheetInstanceId): Sheet {
    let inst = this._instances.get()[instanceId]

    if (!inst) {
      inst = new Sheet(this, instanceId)
      this._instances.setByPointer((p) => p[instanceId], inst)
    }

    return inst
  }

  getObjectTemplate(
    objectKey: ObjectAddressKey,
    nativeObject: ObjectNativeObject,
    config: SheetObjectPropTypeConfig,
    actions: SheetObjectActionsConfig,
  ): SheetObjectTemplate {
    let template = this._objectTemplates.get()[objectKey]

    if (!template) {
      template = new SheetObjectTemplate(
        this,
        objectKey,
        nativeObject,
        config,
        actions,
      )
      this._objectTemplates.setByPointer((p) => p[objectKey], template)
    }

    return template
  }
}
