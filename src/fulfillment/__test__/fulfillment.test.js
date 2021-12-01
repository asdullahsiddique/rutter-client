import nock from 'nock';
import axios from 'axios';
import defaults from '../../defaults';
import { RutterClient } from '../..';

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Fulfillment APIs', () => {
  it('consumes create API', async () => {
    const client = new RutterClient({
      configs: {
        secretId: '123',
        clientId: '123',
      },
    });
    const access_token = '123';
    const order_id = '123';
    const scope = nock(defaults.API_ENDPOINT)
      .post(`/orders/${order_id}/fulfillments?access_token=${access_token}`)
      .reply(200, {});
    await client.fulfillment.create({
      access_token,
      order_id,
      fulfillment: {},
    });
    expect(scope.isDone()).toBeTruthy();
  });
});
