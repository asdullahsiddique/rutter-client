/**
 *
 * @typedef {Object} FulfillmentLineItem
 * @property {string} id
 * @property {number} quantity
 */

/**
 *
 * @typedef {Object} Fulfillment
 * @property {FulfillmentLineItem[]} line_items
 * @property {string} tracking_number
 * @property {string} carrier
 * @property {string} [id]
 * @property {string} [order_id]
 * @property {string} [service]
 * @property {string} [tracking_url]
 * @property {string} [location_id]
 *
 */

/**
 *
 * @param {import('..').RutterClient} client
 */
export default function FulfillmentClient(client) {
  this.client = client;
}

/**
 *
 * @typedef {Object} CreateFulfillmenteResponse
 * @property {Fulfillment} fulfillment
 * @property {Object} connection
 * @property {string} connection.id
 * @property {string} connection.platform
 * @property {string} request_id
 */

/**
 * @typedef {Object} CreateFulfillmenteOptions
 * @property {string} access_token
 * @property {string} order_id
 * @property {Fulfillment} fulfillment
 */

/**
 *
 * @param {CreateFulfillmenteOptions} options
 * @returns {CreateFulfillmenteResponse}
 * @throws {Error}
 * @throws {import("../RutterError").RutterError}
 */
FulfillmentClient.prototype.create = async function create(options) {
  const { access_token, order_id, fulfillment } = options;
  const { data } = await this.client.request({
    method: 'post',
    url: `/orders/${order_id}/fulfillments?access_token=${access_token}`,
    data: {
      fulfillment,
    },
  });
  return data;
};
