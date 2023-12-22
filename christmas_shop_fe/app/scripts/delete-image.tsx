export const DeleteImage = (name: string) => {

    var http = require("https");
    let token = localStorage.getItem("user-token");
    var options = {
        "method": "POST",
        "hostname": "api.sirv.com",
        "port": null,
        "path": `/v2/files/delete?filename=%2Fcategories%2F${name}.jpg`,
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
            console.log(body.toString());
        });
    });



    req.end();
}

export default DeleteImage;