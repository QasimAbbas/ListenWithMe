const express = require("express");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const twilio = require("twilio");

const staticdir = path.join(__dirname, "static");
const port = process.env.PORT || 3000;

function init() {
    dotenv.load();

    let app = express();
    app.use( express.static(staticdir) );


    let server = http.createServer(app);
    server.listen(port, function () {
        console.log("Running on :" + port);
    });

    let client = new twilio(
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
        {accountSid: process.env.TWILIO_ACCOUNT_SID}
    );
    client.sync
        .services( process.env.TWILIO_SYNC_SERVICE_SID || 'default' )
        .fetch()
        .then( response => {
            console.log(response);
        });
}

if ( require.main  === module ) {
    init();
}
