import '@reach/combobox/styles.css'
import React from 'react'
import Object from './shared/Object'

/**
 * @param {{
 *  value?: {
 *  }
 *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
 *  onUpdate({}): void
 * }} props
 */
export default function ProductTree({
  value: productTree,
  validationErrors,
  dataPath,
  objectName,
  onUpdate,
}) {
  return (
    <Object
      label="Product tree"
      description="Is a container for all fully qualified product names that can be referenced elsewhere in the document."
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={productTree}
      doAdd={() => {
        onUpdate({ $set: {} })
      }}
      doDelete={() => {
        onUpdate({ $set: undefined })
      }}
    >
      {productTree ? <></> : null}
    </Object>
  )
}