export const FetchImage = (url: string, name: string, fileName: string) => {
    var http = require("https");
    let newUrl = "";
    var token = localStorage.getItem("user-token");
    var options = {
        "method": "POST",
        "hostname": "api.sirv.com",
        "port": null,
        "path": "/v2/files/fetch",
        "headers": {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        }
    };



    var req = http.request(options, function (res: any) {
        var chunks: any = [];



        res.on("data", function (chunk: any) {
            chunks.push(chunk);
        });



        res.on("end", function () {
            var body = Buffer.concat(chunks);
            newUrl = body.toString();
        });
    });

    req.write(`[{\"url\":\"${url}\",\"filename\":\"/${fileName}/${name}.jpg\"}]`);
    req.end();

}

export default FetchImage;