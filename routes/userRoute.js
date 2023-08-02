const express=require('express');
const { loginController, registerController, } = require("../controllers/userController");

//router object
const router=express.Router();
//routers
//Post||Login
router.post("/login",loginController);
//Post||register
router.post("/register",registerController);

module.exports=router;