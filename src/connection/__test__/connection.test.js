import nock from 'nock';
import axios from 'axios';
import defaults from '../../defaults';
import { RutterClient } from '../..';

axios.defaults.adapter = require('axios/lib/adapters/http');

const client = new RutterClient({
  configs: {
    secretId: '123',
    clientId: '123',
  },
});

describe('Connection APIs', () => {
  it('consumes fetch API', async () => {
    const accessToken = '123';
    const scope = nock(defaults.API_ENDPOINT)
      .get(`/connections/access_token?access_token=${accessToken}`)
      .reply(200, {});
    await client.connection.fetch({ accessToken });
    expect(scope.isDone()).toBeTruthy();
  });

  it('consumes fetch active API', async () => {
    const scope = nock(defaults.API_ENDPOINT)
      .get('/connections')
      .reply(200, {});
    await client.connection.fetchActive();
    expect(scope.isDone()).toBeTruthy();
  });

  it('consumes fetch credentials API', async () => {
    const accessToken = '123';
    const scope = nock(defaults.API_ENDPOINT)
      .get(`/connections/credentials?access_token=${accessToken}`)
      .reply(200, {});
    await client.connection.fetchCredentials({ accessToken });
    expect(scope.isDone()).toBeTruthy();
  });

  it('consumes create connection API', async () => {
    const scope = nock(defaults.API_ENDPOINT)
      .post('/connections/create')
      .reply(200, {});
    await client.connection.create({});
    expect(scope.isDone()).toBeTruthy();
  });

  it('consumes delete connection API', async () => {
    const connectionId = '123';
    const scope = nock(defaults.API_ENDPOINT)
      .delete(`/connections/${connectionId}`)
      .reply(200, {});
    await client.connection.create({});
    expect(scope.isDone()).toBeTruthy();
  });
});
