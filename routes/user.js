const express = require('express');
const { handleGetAllUsers ,handleGetUserById , handleUpdateUserById , handleDeleteUserById , handleCreateNewUser } = require("../controllers/user");
const router = express.Router(); //When we are working on the router(user) level we use router instead of app 

//REST API points
router.route('/')
.get( handleGetAllUsers )
.post( handleCreateNewUser );

router
.route('/:id')
.get( handleGetUserById )
.patch( handleUpdateUserById )
.delete( handleDeleteUserById );

module.exports = router;