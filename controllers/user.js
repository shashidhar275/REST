//Controller only contain the functions
const User = require("../models/user");

//Controller is doing manipulation on models

//Below are isolated functions
const handleGetAllUsers = async (req,res)=>{
    const allDbUsers = await User.find({});  //Get all the users
    return res.json(allDbUsers);
};

const handleGetUserById = async (req,res)=>{       //Dynamic path parameters 
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({'Status': 'Id not found'});
    }else{
        return res.json(user);       //It's good practise to use return   
    }
}

const handleUpdateUserById = async (req,res)=>{
    //Edit the user with id
    await User.findByIdAndUpdate(req.params.id,{first_name: req.body.first_name})
    return res.json({'Status': 'Success'});
};

const handleDeleteUserById = async (req,res)=>{
    //Delete the user with id
   await User.findByIdAndDelete(req.params.id);
   res.json({'Status': "Successs"});
};

const handleCreateNewUser = async (req,res)=>{
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

    return res.status(201).json({'msg': 'Success', 'id': result._id });
}

module.exports = { handleGetAllUsers ,handleGetUserById , handleUpdateUserById , handleDeleteUserById , handleCreateNewUser };