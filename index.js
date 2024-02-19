const express = require('express');
const app = express();
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const PORT = 8000;

//Middleware - Plugin
app.use(express.urlencoded({extended: false}));  //Whenever URL Encoded form data is sent to the server ...then this middleware will help to add the content in the body ...middleware always runs for every middleware

//Custom middleware (Below is a practical use case of a middleware)
app.use((req,res,next)=>{
    fs.appendFile('log.txt',`\n${Date.now()}: ${req.method}: ${req.ip}: ${req.path}`,(err,data)=>{
        next();
    });
});

//Routes
app.get('/users',(req,res)=>{
    const html =                            //This is called SERVER SIDE RENDERING
    `<ul>
        ${users.map(user=>{ return `<li>${user.first_name}</li>`}).join("")}
    </ul>`;
    return res.send(html);
});

//REST API points
app.get('/api/users',(req,res)=>{
    console.log(req.headers);
    res.setHeader('X-myName','Shashidhar');
    //Always add X to custom header
    return res.json(users);
});

app
.route('/api/users/:id')
.get((req,res)=>{       //Dynamic path parameters 
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if(!user){
        return res.status(404).json({'Status': 'Id not found'});
    }else{
        return res.json(user);       //It's good practise to use return   
    }
})
.patch((req,res)=>{
    //Edit the user with id
    const id = Number(req.params.id);
    let stat=0;
    users.forEach(user =>{
        if(user.id===id)
        {
            stat=1;
            user.first_name = req.body.first_name;
            return ;
        }
    });
    if(stat===0)
    {
        return res.json({'Status': 'Id not found'});
    }else{
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
            return res.json({'Status': 'Success'});
        })
    }
})
.delete((req,res)=>{
    //Delete the user with id
    const id = Number(req.params.id);
    let i=-1;
    users.forEach((user,index) =>{
        if(user.id===id)
        {
            i=index;
            return ;
        }
    });
    if(i === -1){
        return res.json({'Status': 'Id not found'});
    }else{
        users.splice(i,1);
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
            return res.json({'Status': 'Successful'});
        });
    }
});

app.post('/api/users',(req,res)=>{
    //Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title)
    {
        return res.status(400).json({'Msg': "All fields are required..."});
    }
    users.push({...body, id : users.length + 1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
        return res.status(201).json({'Status': 'Success',id: users.length});
    });
});

app.listen(PORT,()=>{console.log(`Server started listening at PORT-${PORT}`)});