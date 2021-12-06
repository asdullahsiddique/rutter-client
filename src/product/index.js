import { stringify as stringifyQuery } from 'query-string';

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

/**
 *
 * @typedef {Object} FetchAllProductsResponse
 * @property {Array<Product>} products
 * @property {Object} connection
 * @property {string} connection.platform
 * @property {string} connection.id
 * @property {string} request_id
 * @property {string} next_cursor
 */

/**
 * @typedef {Object} FetchAllProductsOptions
 * @property {string} access_token
 * @property {number} [limit]
 * @property {string} [cursor]
 * @property {string} [status]
 * @property {string} [name]
 * @property {number} [created_at_min]
 * @property {number} [created_at_max]
 * @property {Array<string>} [ids]
 */

/**
 *
 * @param {FetchAllProductsOptions} options
 * @returns {FetchAllProductsResponse}
 * @throws {Error}
 * @throws {import("../RutterError").RutterError}
 */
ProductClient.prototype.fetchAll = async function fetchAll(options) {
  const { data } = await this.client.request({
    method: 'get',
    url: `/products?${stringifyQuery(options, {
      skipNull: true,
      skipEmptyString: true,
    })}`,
  });
  return data;
};
