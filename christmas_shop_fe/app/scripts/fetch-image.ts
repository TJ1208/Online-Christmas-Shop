export const FetchImage = (url: string, filename: string) => {
    var http = require("https");


    var options = {
        "method": "POST",
        "hostname": "api.sirv.com",
        "port": null,
        "path": "/v2/files/fetch",
        "headers": {
            "content-type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("user-token")}`
        }
    };



    var req = http.request(options, function (res: any) {
        var chunks: any = [];



        res.on("data", function (chunk: any) {
            chunks.push(chunk);
        });



        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });


    req.write(`[{\"url\":\"${url}\",\"filename\":\"/categories/${filename}.jpg\"}]`)
    req.end();

}

