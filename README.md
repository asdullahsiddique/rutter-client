RutterAPI NodeJS Client (Unofficial)
=============
![Build Status](https://github.com/asdullahsiddique/rutter-client/actions/workflows/test.yml/badge.svg)

This library provides many of the features of the official API of [RutterAPI](https://rutterapi.com). It is easy to use, and fully async. It is intended to be used on the server (it is not a client module).

Official API: [DOCS](https://docs.rutterapi.com/reference/)

TS Support
------------
Typescript definitions are dynamically generated at build time and availble in dist, or run:

 `yarn generate-types`.

Installation
------------

    yarn install rutter-client

Quick Start
-----------

```javascript
import { RutterClient } from "rutter-client";

const client = new RutterClient({
  configs: {
    clientId: 'clientId',
    secretId: 'secretId',
}});

// fetch active connections
const { connections } = await client.connection.fetchActive();

// fetch orders
const { orders } = await client.order.fetchAll({ access_token: "access_token"});
```

# Supported API(s)

Tokens
-----------
- [Exchange Tokens](https://docs.rutterapi.com/reference/exchange-tokens)

Connections
-----------
- [Create a Connection](https://docs.rutterapi.com/reference/create-a-connection)
- [Fetch a Connection](https://docs.rutterapi.com/reference/fetch-a-connection)
- [Fetch Active Connections](https://docs.rutterapi.com/reference/fetch-active-connections)
- [Fetch Connection Credentials](https://docs.rutterapi.com/reference/fetch-connection-credentials)

Orders
-----------
- [Fetch All Orders](https://docs.rutterapi.com/reference/fetch-all-orders-1)
- [Fetch an Order](https://docs.rutterapi.com/reference/fetch-an-order)
- [Create an Order](https://docs.rutterapi.com/reference/order-creation)

Fulfillments
-----------
- [Fulfill an Order](https://docs.rutterapi.com/reference/fulfill-an-order)


------
# Other API(s)
Work in progress, feel free to contribute 😄
