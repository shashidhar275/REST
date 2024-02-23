const express = require('express');
const app = express();
const PORT = 8000;
const userRouter = require('./routes/user');
const {connectMongoDb} = require('./connection');
const { logReqRes } = require('./middlewares') //Here there is no need for giving ./middleware/index (if given also no problem) index will be default

//Connection
connectMongoDb("mongodb://127.0.0.1:27017/PrimaryDB")
.then(()=>{
    console.log('MongoDb connected');
})

//Middleware - Plugin
app.use(express.urlencoded({extended: false}));  //Whenever URL Encoded form data is sent to the server ...then this middleware will help to add the content(Object) in the body ...middleware always runs for every middleware

//Custom middleware (Below is a practical use case of a middleware)
app.use( logReqRes('log.txt') );

app.use('/api/users',userRouter); //Router  registration

app.listen(PORT,()=>{console.log(`Server started listening at PORT-${PORT}`)});