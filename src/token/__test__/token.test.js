import nock from "nock";
import axios from "axios";
import defaults from "../../defaults";
import { RutterClient } from "../..";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("Token APIs", () => {
  it("consumes exchange token API", async () => {
    const client = new RutterClient({
      configs: {
        secretId: "123",
        clientId: "123",
      },
    });
    const scope = nock(defaults.API_ENDPOINT)
      .post("/item/public_token/exchange")
      .reply(200, {});
    await client.token.exchange({ publicToken: "123" });
    expect(scope.isDone()).toBeTruthy();
  });
});
