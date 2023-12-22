import { request } from "https";

const options = {
  "method": "POST",
  "hostname": "api.sirv.com",
  "port": null,
  "path": "/v2/token",
  "headers": {
    "content-type": "application/json",
    "authorization": "Bearer BEARER_TOKEN_HERE"
  }
};

const req = request(options, function (res) {
  const chunks = [];

res.on("data", function (chunk) {
    chunks.push(chunk);
  });

res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});
localStorage.setItem("user-token", `${body.token.toString()}`)
req.write("{\"clientId\":\"JIeMerT8N0c4r2SclF20qjoEkUl\",\"clientSecret\":\"iFPaSDs2RU3lUafz1d0NgnrH2FKtW8buVCwE/5O4iKNasHweoXO9rfG4goEDXMvLsYjFq7WEvm+nIjHgBsZxjA==\"}");
req.end();