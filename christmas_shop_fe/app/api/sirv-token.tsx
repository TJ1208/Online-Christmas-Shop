"use client"

import { request } from "https";

const GetToken = () => {

    const initToken = () => {
        
const http = require("https")
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
            const chunks: any = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                localStorage.setItem("user-token", `${body.toString().split(" ")[3].replaceAll('"', "").replace(",", "")}`);
            });
        });
        
        req.write("{\"clientId\":\"JIeMerT8N0c4r2SclF20qjoEkUl\",\"clientSecret\":\"iFPaSDs2RU3lUafz1d0NgnrH2FKtW8buVCwE/5O4iKNasHweoXO9rfG4goEDXMvLsYjFq7WEvm+nIjHgBsZxjA==\"}");
        req.end();
    }




    return (
        <>
            <button onClick={initToken}>Get Token</button>
        </>
    )
}

export default GetToken;