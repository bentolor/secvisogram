import '@reach/combobox/styles.css'
import React from 'react'
import EnumAttribute from '../../shared/EnumAttribute'
import ObjectContainer from '../../shared/ObjectContainer'
import TextAttribute from '../../shared/TextAttribute'

/**
 * @param {{
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate(dataPath: string, update: {}): void
 * }} props
 */
export default function Tlp({
  value: distribution,
  validationErrors,
  dataPath,
  onUpdate,
}) {
  return (
    <ObjectContainer
      label="Traffic Light Protocol (TLP)"
      description="Provides details about the TLP classification of the document."
      validationErrors={validationErrors}
      dataPath={dataPath}
      value={distribution}
      defaultValue={() => ({
        label: '',
      })}
      onUpdate={onUpdate}
    >
      {(tlpProps) => (
        <>
          <EnumAttribute
            {...tlpProps('label')}
            label="Label of TLP"
            description="Provides the TLP label of the document."
            options={['RED', 'AMBER', 'GREEN', 'WHITE']}
          />
          <TextAttribute
            {...tlpProps('url')}
            label="URL of TLP version"
            description="Provides a URL where to find the textual description of the TLP version which is used in this document. Default is the URL to the definition by FIRST."
            defaultValue={() => 'https://www.first.org/tlp/'}
            type="url"
            placeholder="https://www.us-cert.gov/tlp"
          />
        </>
      )}
    </ObjectContainer>
  )
}
