import '@reach/combobox/styles.css'
import React from 'react'
import ObjectContainer from '../shared/ObjectContainer'
import TextAttribute from '../shared/TextAttribute'
import validationErrorShallowEqual from '../shared/validationErrorShallowEqual'

export default React.memo(
  /**
   * @param {{
   *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
   *  dataPath: string
   *  value: unknown
   *  onUpdate(dataPath: string, update: {}): void
   * }} props
   */
  function AggregateSeverity({
    value: aggregateSeverity,
    validationErrors,
    dataPath,
    onUpdate,
  }) {
    return (
      <ObjectContainer
        label="Aggregate severity"
        description="Is a vehicle that is provided by the document producer to convey the urgency and criticality with which the one or more vulnerabilities reported should be addressed. It is a document-level metric and applied to the document as a whole — not any specific vulnerability. The range of values in this field is defined according to the document producer's policies and procedures."
        validationErrors={validationErrors}
        dataPath={dataPath}
        value={aggregateSeverity}
        defaultValue={() => ({
          text: '',
        })}
        onUpdate={onUpdate}
      >
        {(aggregateSeverityProps) => (
          <>
            <TextAttribute
              {...aggregateSeverityProps('namespace')}
              label="Namespace of aggregate severity"
              description="Points to the namespace so referenced."
              type="url"
              deletable
            />
            <TextAttribute
              {...aggregateSeverityProps('text')}
              label="Text of aggregate severity"
              description="Provides a severity which is independent of - and in addition to - any other standard metric for determining the impact or severity of a given vulnerability (such as CVSS)."
              placeholder="Moderate"
            />
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)
