import React from 'react'
import ArrayContainer from '../ArrayContainer'
import EnumAttribute from '../EnumAttribute'
import ObjectContainer from '../ObjectContainer'
import TextAttribute from '../TextAttribute'
import validationErrorShallowEqual from '../validationErrorShallowEqual'
import FullProductName from './FullProductName'

export default React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
   *  dataPath: string
   *  onUpdate(dataPath: string, update: {}): void
   *  productName?: string
   * }} props
   */
  function Branches({ productName = '', ...props }) {
    return (
      <ArrayContainer
        {...props}
        label="List of branches"
        description="Contains branch elements as children of the current element."
        defaultItemValue={() => ({
          name: '',
          type: '',
        })}
      >
        {(branchesProps) => (
          <ObjectContainer
            {...branchesProps}
            label="Branch"
            description="Is a part of the hierarchical structure of the product tree."
          >
            {(branchProps) => {
              const name = branchProps('name').value ?? ''
              const fullProductName =
                productName.length == 0 ? `${name}` : `${productName} ${name}`
              return (
                <>
                  <TextAttribute
                    {...branchProps('name')}
                    label="Name of the branch"
                    description="Contains the canonical descriptor or 'friendly name' of the branch."
                    placeholder="Microsoft ..."
                  />
                  <EnumAttribute
                    {...branchProps('type')}
                    label="Type of the branch"
                    description="Describes the characteristics of the labeled branch."
                    options={[
                      'architecture',
                      'host_name',
                      'language',
                      'legacy',
                      'patch_level',
                      'product_family',
                      'product_name',
                      'product_version',
                      'service_pack',
                      'specification',
                      'vendor',
                    ]}
                  />
                  <Branches
                    productName={fullProductName}
                    {...branchProps('branches')}
                  />
                  <FullProductName
                    productName={fullProductName}
                    {...branchProps('product')}
                  />
                </>
              )
            }}
          </ObjectContainer>
        )}
      </ArrayContainer>
    )
  },
  validationErrorShallowEqual
)
