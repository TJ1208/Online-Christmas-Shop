
export const UploadImage = (name: string) => {

    var http = require("https");
    var token = localStorage.getItem("user-token");

    var options = {
        "method": "POST",
        "hostname": "api.sirv.com",
        "port": null,
        "path": `/v2/files/upload?filename=%2Fcategories%2F${name}`,
        
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
        });
    });



    req.end();
}

export default UploadImage;