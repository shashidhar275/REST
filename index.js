const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 8000;
const mongoose = require('mongoose');
const { timeStamp } = require('console');

//Connection
mongoose.connect("mongodb://127.0.0.1:27017/PrimaryDB")
    .then(()=> console.log("MongoDB connected"))
    .catch((err)=>{console.log('Mongo Error',err)});

//Schema 
const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true //Validates for duplicacy of email 
    },
    job_title:{
        type: String
    },
    gender:{
        type: String
    }
},{timestamps:true});

const User = mongoose.model('user',userSchema);


//Middleware - Plugin
app.use(express.urlencoded({extended: false}));  //Whenever URL Encoded form data is sent to the server ...then this middleware will help to add the content(Object) in the body ...middleware always runs for every middleware

//Custom middleware (Below is a practical use case of a middleware)
app.use((req,res,next)=>{
    fs.appendFile('log.txt',`\n${Date.now()}: ${req.method}: ${req.ip}: ${req.path}`,(err,data)=>{
        next();
    });
});

// app.use((req,res,next)=>{
//     console.log("Hello from middleware");
//     /* Practical use case of a middleware
//     //db query
//     //Credit card information
//     req.creditCardNumber = "123";
//     next();
//     */
// })

//Routes
app.get('/users',async (req,res)=>{
    const allDbUsers = await User.find({});
    const html =                            //This is called SERVER SIDE RENDERING
    `<ul>
        ${allDbUsers.map(user=>{ return `<li>${user.first_name} ${user.email}</li>`}).join("")}
    </ul>`;
    return res.send(html);
});

//REST API points
app.get('/api/users',async (req,res)=>{
    const allDbUsers = await User.find({});
    console.log(req.headers);
    res.setHeader('X-myName','Shashidhar');
    //Always add X to custom header
    return res.json(allDbUsers);
});

app
.route('/api/users/:id')
.get(async (req,res)=>{       //Dynamic path parameters 
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({'Status': 'Id not found'});
    }else{
        return res.json(user);       //It's good practise to use return   
    }
})
.patch(async (req,res)=>{
    //Edit the user with id
    await User.findByIdAndUpdate(req.params.id,{first_name: req.body.first_name})
    return res.json({'Status': 'Success'});
})
.delete(async (req,res)=>{
    //Delete the user with id
   await User.findByIdAndDelete(req.params.id);
   res.json({'Status': "Successs"});
});

app.post('/api/users',async (req,res)=>{
    //Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title)
    {
        return res.status(400).json({'Msg': "All fields are required..."});
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    });

    console.log(result);

    return res.status(201).json({'msg': 'Success'});
});

app.listen(PORT,()=>{console.log(`Server started listening at PORT-${PORT}`)});