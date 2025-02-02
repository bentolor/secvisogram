import React from 'react'
import ObjectContainer from '../ObjectContainer'
import TextAttribute from '../TextAttribute'
import { uniqueProductId } from '../unique-id'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate(dataPath: string, update: {}): void
 *  productName?: string
 *  onCollectProductIds?(): Promise<void | {id: string, name: string}[]>
 *  productReference?: string
 *  relatesToProductReference?: string
 *  relationshipType?: string
 * }} props
 */
export default function FullProductName({
  productReference = '',
  relatesToProductReference = '',
  relationshipType = '',
  onCollectProductIds,
  productName,
  ...props
}) {
  const [suggestedProductName, setSuggestedProductName] = React.useState('')

  React.useEffect(() => {
    if (productName) setSuggestedProductName(productName)
    if (onCollectProductIds) {
      onCollectProductIds().then((entries) => {
        if (entries) {
          const productReferenceName =
            entries.find((e) => e.id === productReference)?.name ?? ''
          const relatesToProductReferenceName =
            entries.find((e) => e.id === relatesToProductReference)?.name ?? ''
          setSuggestedProductName(
            `${productReferenceName} ${relationshipType.replaceAll(
              '_',
              ' '
            )} ${relatesToProductReferenceName}`
          )
        }
      })
    }
  }, [
    productReference,
    onCollectProductIds,
    relatesToProductReference,
    relationshipType,
    productName,
  ])

  return (
    <ObjectContainer
      {...props}
      label="Full product name"
      description="Specifies information about the product and assigns the product_id."
      defaultValue={() => {
        return {
          product_id: uniqueProductId(),
          name: suggestedProductName,
        }
      }}
    >
      {(fullProductNameProps) => (
        <>
          <TextAttribute
            {...fullProductNameProps('product_id')}
            label="Reference token for product instance"
            description="Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document."
            placeholder="CSAFPID-0004"
          />
          <TextAttribute
            {...fullProductNameProps('name')}
            label="Textual description of the product"
            description="The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document."
            placeholder="Microsoft Host Integration Server 2006 Service Pack 1"
          />
          <TextAttribute
            {...fullProductNameProps('cpe')}
            label="Common Platform Enumeration representation"
            description="The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification."
            pattern="^cpe:(/|\\d+\\.\\d+)[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*$"
            placeholder="^cpe:(/|\\d+\\.\\d+)[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*$"
            minLength={5}
            deletable
          />
        </>
      )}
    </ObjectContainer>
  )
}
