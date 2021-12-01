import nock from 'nock';
import axios from 'axios';
import { stringify } from 'query-string';
import defaults from '../../defaults';
import { RutterClient } from '../../client';

axios.defaults.adapter = require('axios/lib/adapters/http');

const client = new RutterClient({
  configs: {
    secretId: '123',
    clientId: '123',
  },
});

describe('Order APIs', () => {
  it('consumes fetch all API', async () => {
    const options = {
      access_token: 'access_token',
      fulfillment_status: 'any',
    };
    const scope = nock(defaults.API_ENDPOINT)
      .get(`/orders?${stringify(options)}`)
      .reply(200, {});
    await client.order.fetchAll(options);
    expect(scope.isDone()).toBeTruthy();
  });

  it('consumes fetch by id API', async () => {
    const options = {
      access_token: '123',
      order_id: '1234',
    };
    const scope = nock(defaults.API_ENDPOINT)
      .get('/orders/1234?access_token=123')
      .reply(200, {});
    await client.order.fetchById(options);
    expect(scope.isDone()).toBeTruthy();
  });

  it('consumes create API', async () => {
    const options = {
      access_token: '123',
      order: {},
    };
    const scope = nock(defaults.API_ENDPOINT)
      .post('/orders?access_token=123')
      .reply(200, {});
    await client.order.create(options);
    expect(scope.isDone()).toBeTruthy();
  });
});
