const mongoose = require('mongoose');

async function connectMongoDb(url){  
    return mongoose.connect(url);            // I think there is a problem in this line of code (it can be of not using await)
} //above will return pending status if promise gets rejected then instantly app will crash otherwise no output => means mongoDb connected

module.exports = { connectMongoDb };