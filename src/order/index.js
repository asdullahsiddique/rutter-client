import { stringify as stringifyQuery } from 'query-string';

/**
 *
 * @typedef {Object} Customer
 * @property {string} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} orders_count
 * @property {boolean} verified_email
 * @property {string} phone
 */

/**
 *
 * @typedef {Object} LineItem
 * @property {string} [product_id]
 * @property {string} [variant_id]
 * @property {string} title
 * @property {number} price
 * @property {number} unit_cost
 * @property {string} iso_currency_code
 * @property {string} sku
 * @property {number} quantity
 */

/**
 *
 * @typedef {Object} Address
 * @property {string} address1
 * @property {string} address2
 * @property {string} city
 * @property {string} postal_code
 * @property {string} region
 * @property {string} country_code
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} [phone]
 */

/**
 *
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} platform_id
 * @property {string} order_number
 * @property {"active" | "cancelled"} status
 * @property {"pending" | "paid" | "refunded"} payment_status
 * @property {"fulfilled" | "partial" | "unfulfilled"} fulfillment_status
 * @property {Array<import("../fulfillment/index").Fulfillment>} fulfillments
 * @property {Array<LineItem>} line_items
 * @property {Address} [billing_address]
 * @property {Address} [shipping_address]
 * @property {Customer} [customer]
 * @property {number} [total_shipping]
 * @property {number} total_discount
 * @property {number} [total_tax]
 * @property {number} total_price
 * @property {string} iso_currency_code
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 *
 * @param {import('..').RutterClient} client
 */
export default function OrderClient(client) {
  this.client = client;
}

/**
 *
 * @typedef {object} FetchAllResponse
 * @property {Array<Order>} orders
 * @property {string} next_cursor
 * @property {string} request_id
 * @property {Object} connection
 * @property {string} connection.id
 * @property {string} connection.platform
 */

/**
 *
 * @typedef {Object} FetchAllOptions
 * @property {string} access_token
 * @property {number} [limit]
 * @property {string} [cursor]
 * @property {"fulfilled" | "unfulfilled" | "partial" | "any"} [fulfillment_status]
 * @property {"paid" | "pending" | "refunded"} [payment_status]
 * @property {number} [created_at_min]
 * @property {number} [created_at_max]
 * @property {number} [updated_at_min]
 * @property {number} [updated_at_max]
 * @property {number} [order_number]
 * @property {string} [properties]
 * @property {"transactions"} [expand]
 */

/**
 *
 * @param {FetchAllOptions} options
 * @returns {FetchAllResponse}
 * @throws {Error}
 * @throws {import("../RutterError").RutterError}
 */
OrderClient.prototype.fetchAll = async function fetchAll(options) {
  const { data } = await this.client.request({
    method: 'get',
    url: `/orders?${stringifyQuery(options, {
      skipNull: true,
      skipEmptyString: true,
    })}`,
  });
  return data;
};

/**
 *
 * @typedef {object} FetchByIdResponse
 * @property {Order} order
 * @property {string} request_id
 * @property {Object} connection
 * @property {string} connection.id
 * @property {string} connection.platform
 */

/**
 *
 * @typedef {object} FetchByIdOptions
 * @property {string} order_id
 * @property {string} access_token
 */

/**
 *
 * @param {FetchByIdOptions} options
 * @returns {FetchByIdResponse}
 * @throws {Error}
 * @throws {import("../RutterError").RutterError}
 */
OrderClient.prototype.fetchById = async function fetchById(options) {
  const { data } = await this.client.request({
    method: 'get',
    url: `/orders/${options.order_id}?access_token=${options.access_token}`,
  });
  return data;
};

/**
 *
 * @typedef {object} CreateOrderResponse
 * @property {Order} order
 */

/**
 *
 * @typedef {object} CreateOrderOptions
 * @property {Order} order
 * @property {string} access_token
 */

/**
 *
 * @param {CreateOrderOptions} options
 * @returns {CreateOrderResponse}
 * @throws {Error}
 * @throws {import("../RutterError").RutterError}
 */
OrderClient.prototype.create = async function create(options) {
  const { data } = await this.client.request({
    method: 'post',
    url: `/orders?access_token=${options.access_token}`,
    data: {
      order: options.order,
    },
  });
  return data;
};
