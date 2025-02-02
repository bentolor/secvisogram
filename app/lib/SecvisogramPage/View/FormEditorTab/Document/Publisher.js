import '@reach/combobox/styles.css'
import React from 'react'
import EnumAttribute from '../shared/EnumAttribute'
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
  function Publisher(props) {
    return (
      <ObjectContainer
        {...props}
        label="Publisher"
        description="Provides information about the publisher of the document."
        defaultValue={() => ({
          type: '',
        })}
      >
        {(publisherProps) => (
          <>
            <TextAttribute
              {...publisherProps('contact_details')}
              label="Contact details"
              description="Information on how to contact the publisher, possibly including details such as web sites, email addresses, phone numbers, and postal mail addresses."
              placeholder="Example Company can be reached at contact_us@example.com, or via our website at https://www.example.com/contact."
              deletable
            />
            <TextAttribute
              {...publisherProps('issuing_authority')}
              label="Issuing authority"
              description="The name of the issuing party and their authority to release the document, in particular, the party's constituency and responsibilities or other obligations."
              deletable
            />
            <EnumAttribute
              {...publisherProps('type')}
              label="Type of publisher"
              description="Provides information about the type of publisher releasing the document."
              options={['coordinator', 'discoverer', 'other', 'user', 'vendor']}
            />
            <TextAttribute
              {...publisherProps('vendor_id')}
              label="Vendor releasing the document"
              description="Vendor ID is a unique identifier (OID) that a vendor uses as issued by FIRST under the auspices of IETF."
              deletable
            />
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)
