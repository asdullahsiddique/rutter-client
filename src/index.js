// eslint-disable-next-line no-unused-vars
import axios, { AxiosRequestConfig } from 'axios';
import base64 from 'base-64';
import {
  prop, flip, not, all,
} from 'ramda';
import ConfigurationError from './ConfigurationError';
import RutterError from './RutterError';
import defaults from './defaults';
import TokenClient from './token';
import ConnectionClient from './connection';
import OrderClient from './order';
import FulfillmentClient from './fulfillment';

/**
 *
 * @typedef {Object} RutterClientConfigurations
 * @property {string} clientId - client id
 * @property {string} secretId - secret id
 * @property {string} [baseApiEndpoint] - base api endpoint
 */

/**
 *
 * @param {RutterClientConfigurations} configs
 */
function RutterClient({ configs }) {
  const getConfigProp = flip(prop)(configs);
  if (not(all(getConfigProp)(['clientId', 'secretId']))) {
    throw new ConfigurationError('Missing required params');
  }
  this.configs = configs;
  this.httpClient = axios.create({
    baseURL: getConfigProp('baseApiEndpoint') || defaults.API_ENDPOINT,
    headers: {
      Authorization: `Basic ${base64.encode(
        `${getConfigProp('clientId')}:${getConfigProp('secretId')}`,
      )}`,
    },
  });
  this.token = new TokenClient(this);
  this.connection = new ConnectionClient(this);
  this.order = new OrderClient(this);
  this.fulfillment = new FulfillmentClient(this);
}

/**
 *
 * @param {AxiosRequestConfig} config - axios args
 */
RutterClient.prototype.request = async function request(config) {
  try {
    const response = await this.httpClient.request(config);
    return response;
  } catch (e) {
    const rutterErrorCode = e.response?.data?.error_code;
    if (rutterErrorCode) {
      const {
        response: { data },
      } = e;
      throw new RutterError(
        data.error_message,
        data.error_type,
        rutterErrorCode,
      );
    }
    throw e;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { RutterClient };
