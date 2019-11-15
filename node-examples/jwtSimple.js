// Load modules needed
var jwt = require('jsonwebtoken');
var fs = require('fs');
var https = require('https');
var path = require('path');
var _ = require("lodash");

//get the private key for signing a jwt token.  Signing means to encrypt the token we are generating.

//**********************************************************/
//CONFIG SECTION                                            /
//**********************************************************/

var jwtEncryptionKey = fs.readFileSync("ruhanwin/server_key.pem");

var jwtDecryptionCert = fs.readFileSync("ruhanwin/server.pem");

var hostname = "ruhanwin";
var prefix = "jwt";

var token = jwt.sign({
    "userId": "ruhan-jwt-js",
    "userDirectory": "JWT",
    // "email": "boz@example.com",
    // "Group": ["sales", "finance", "marketing"]
}, jwtEncryptionKey, {
    "algorithm": "RS256"
})

//**********************************************************/
//CONFIG SECTION                                            /
//**********************************************************/

console.log("My Token");
console.log(token);

//decrypt the token for fun.
console.log("Decrypted Token");


var decrypted = jwt.verify(token, jwtDecryptionCert);
console.log(decrypted);

var options = {
    hostname: hostname,
    port: 443,
    path: "/" + prefix + "/qrs/about?xrfkey=ABCDEFG123456789",
    method: 'GET',
    headers: {
        'X-Qlik-Xrfkey': 'ABCDEFG123456789',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    'rejectUnauthorized': false
}

var request = https.request(options, function(res) {
    console.log("response headers");
    console.log("statusCode: " + res.statusCode);
    console.log("headers: " + JSON.stringify(res.headers))

    res.on("data", function(data) {
        console.log("response");
        console.log(JSON.stringify(JSON.parse(data)));
    })

})

request.on("error", function(err) {
    console.log(err);
})

request.end();