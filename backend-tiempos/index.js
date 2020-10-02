const sdbaddon = require('./siridb-nodejs-addon/build/Release/siridb');

var siridb = new sdbaddon.SiriDBClient(
    "iris", "siri", "iot", "localhost", 9000);

siridb.connect(err => {
    if (err) {
        console.error(`Connection error: ${err}`);
    } else {
        console.log('VER');
        siridb.query("show version", (resp, status) => {
            console.log(`Query Status: ${status}`);
            console.log(resp);
            if (!--ntest) siridb.close();
        });
        siridb.close();
    }
});