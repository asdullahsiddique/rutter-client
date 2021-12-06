import nock from "nock";
import axios from "axios";
import { stringify as stringifyQuery } from "query-string";
import defaults from "../../defaults";
import { RutterClient } from "../..";

axios.defaults.adapter = require("axios/lib/adapters/http");
const client = new RutterClient({
  configs: {
    secretId: "123",
    clientId: "123",
  },
});

describe("Product APIs", () => {
  it("consumes fetch all API", async () => {
    const options = { 
      access_token: "123",
      limit: 20,
      status: "active",
    }
    const scope = nock(defaults.API_ENDPOINT)
      .get(`/products?${stringifyQuery(options, {
        skipNull: true,
        skipEmptyString: true,
      })}`)
      .reply(200, {});
    await client.product.fetchAll(options);
    expect(scope.isDone()).toBeTruthy();
  });
});