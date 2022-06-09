/**
 *
 * @typedef {Object} Connection
 * @property {string} id
 * @property {string} platform
 * @property {string} store_domain
 * @property {string} store_name
 * @property {string} store_unique_id
 */

/**
 *
 * @typedef {Object} OAuthCredentials
 * @property {string} access_token
 * @property {string} type
 */

/**
 *
 * @typedef {Object} OAuth10aCredentials
 * @property {string} oauth_consumer_key
 * @property {string} oauth_consumer_secret
 * @property {string} oauth_token
 * @property {string} oauth_token_secret
 * @property {string} type
 */

/**
 *
 * @typedef {Object} BasicCredentials
 * @property {string} username
 * @property {string} password
 * @property {string} type
 */

/**
 *
 * @param {import('..').RutterClient} client
 */
export default function ConnectionClient(client) {
  this.client = client;
}
/**
 *
 * @typedef {Object} FetchConnectionResponse
 * @property {Connection} connection
 */

/**
 *
 * @param {object} options
 * @param {string} options.accessToken
 * @returns {FetchConnectionResponse} object
 * @throws {Error}
 * @throws {import("../RutterError").RutterError}
 */
ConnectionClient.prototype.fetch = async function fetch({ accessToken }) {
  const { data } = await this.client.request({
    method: 'get',
    url: `/connections/access_token?access_token=${accessToken}`,
  });
  return data;
};

/**
 *
 * @typedef {Object} FetchActiveConnectionsResponse
 * @property {Array<Connection>} connections
 */

/**
 *
 * @returns {FetchActiveConnectionsResponse} object
 * @throws {Error}
 * @throws {import("../RutterError").RutterError}
 */
ConnectionClient.prototype.fetchActive = async function fetchActive() {
  const { data } = await this.client.request({
    method: 'get',
    url: '/connections',
  });
  return data;
};

/**
 *
 * @typedef {Object} FetchCredentialsResponse
 * @property { OAuthCredentials | OAuth10aCredentials | BasicCredentials} credential
 * @property {Object} connection
 * @property {string} connection.id
 * @property {string} connection.platform
 */

/**
 *
 * @param {object} options
 * @param {string} options.accessToken
 * @returns {FetchCredentialsResponse} object
 * @throws {Error}
 * @throws {import("../RutterError").RutterError}
 */
ConnectionClient.prototype.fetchCredentials = async function fetchCredentials({
  accessToken,
}) {
  const { data } = await this.client.request({
    method: 'get',
    url: `/connections/credentials?access_token=${accessToken}`,
  });
  return data;
};

/**
 *
 * @typedef {object} CreateConnectionOptions
 * @property {string} store_url
 * @property {string} oauth_client_id
 * @property {string} oauth_client_secret
 * @property {string} oauth_access_token
 * @property {string} basic_username
 * @property {string} basic_password
 * @property {string} store_url
 * @property {string} oauth_refresh_token
 * @property {string} amazon_access_key_id
 * @property {string} amazon_secret_access_key
 * @property {string} amazon_selling_partner_role
 * @property {string} amazon_seller_region
 * @property {string} api_key
 */

/**
 *
 * @typedef {object} CreateConnectionResponse
 * @property {string} connection
 * @property {string} connection.access_token
 * @property {string} connection.id
 * @property {string} connection.link_url
 */

/**
 *
 * @param {CreateConnectionOptions} options
 * @returns {CreateConnectionResponse}
 * @throws {Error}
 * @throws {import("../RutterError").RutterError}
 */
ConnectionClient.prototype.create = async function create(options) {
  const { data } = await this.client.request({
    method: 'post',
    url: '/connections/create',
    data: options,
  });
  return data;
};

/**
 *
 * @param {object} options
 * @param {string} options.connectionId
 * @throws {Error}
 * @throws {import("../RutterError").RutterError}
 */
ConnectionClient.prototype.remove = async function removeß({ connectionId }) {
  return this.client.request({
    method: 'delete',
    url: `/connections/${connectionId}`,
  });
};
