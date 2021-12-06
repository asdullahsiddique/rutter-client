/**
 *
 * @typedef {Object} ProductVariantInventoryLocation
 * @property {string} id
 * @property {string} name
 * @property {string} address1
 * @property {string} address2
 * @property {string} city
 * @property {string} postal_code
 * @property {string} region
 * @property {string} country
 * @property {string} updated_at
 * @property {number} available
 */

/**
 *
 * @typedef {Object} ProductVariantInventory
 * @property {number} total_count
 * @property {Array<ProductVariantInventoryLocation>} locations
 */

/**
 *
 * @typedef {Object} ProductVariant
 * @property {string} id
 * @property {string} product_id
 * @property {string} barcode
 * @property {string} title
 * @property {number} price
 * @property {number} unit_cost
 * @property {string} iso_currency_code
 * @property {string} sku
 * @property {string} fulfillment_service
 * @property {string} inventory_management
 * @property {boolean} requires_shipping
 * @property {object} inventory
 * @property {object} weight
 * @property {number} weight.value
 * @property {string} weight.unit
 *
 */

/**
 *
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} platform_id
 * @property {string} type
 * @property {string} name
 * @property {string} description
 * @property {object[]} images
 * @property {"active" | "archived" | "inactive" | "draft"} status
 * @property {Array<ProductVariant>} variants
 * @property {string[]} tags
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} product_url
 */

/**
 *
 * @param {import('..').RutterClient} client
 */
export default function ProductClient(client) {
  this.client = client;
}
