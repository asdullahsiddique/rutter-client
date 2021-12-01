import nock from 'nock';
import axios from 'axios';
import ConfigurationError from '../ConfigurationError';
import RutterError from '../RutterError';
import defaults from '../defaults';
import { RutterClient } from '../client';

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Rutter client', () => {
  it('can create a new client', () => {
    const client = new RutterClient({
      configs: {
        secretId: '123',
        clientId: '123',
      },
    });
    expect(client instanceof RutterClient).toBeTruthy();
  });

  it('throws if clientId is missing', () => {
    try {
      const client = new RutterClient({
        configs: {
          secretId: '123',
        },
      });
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
    }
  });

  it('throws if secretId is missing', () => {
    try {
      const client = new RutterClient({
        configs: {
          clientId: '123',
        },
      });
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
    }
  });

  it('raises a RutterError if a rutter api error is returned', async () => {
    const endPoint = `${defaults.API_ENDPOINT}`;
    nock(endPoint).get('/').reply(400, {
      error_type: 'CONNECTION_ERROR',
      error_code: 'PRODUCT_NOT_READY',
      error_message:
        'the requested product is not yet ready. please  try the request again later',
    });
    try {
      const client = new RutterClient({
        configs: {
          clientId: '123',
          secretId: '123',
        },
      });
      await client.request({ method: 'get', url: endPoint });
    } catch (err) {
      expect(err).toBeInstanceOf(RutterError);
    }
  });

  it("bubles the error if it is not a rutter's one", async () => {
    const endPoint = `${defaults.API_ENDPOINT}`;
    nock(endPoint).get('/').reply(200, {});
    try {
      const client = new RutterClient({
        configs: {
          clientId: '123',
          secretId: '123',
        },
      });
      await client.request({ method: 'error', url: endPoint });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
