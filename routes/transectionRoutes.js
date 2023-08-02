const express=require('express');
// const { loginController, registerController, } = require("../controllers/userController");
const { addTransection } = require('../controllers/transectionCtrl');
const { editTransection } = require('../controllers/transectionCtrl');
const { deleteTransection } = require('../controllers/transectionCtrl');

const { getAllTransection } = require('../controllers/transectionCtrl');

//router object
const router=express.Router();
//Edit transection
router.post('/edit-transection',editTransection);
//delete
router.post('/delete-transection',deleteTransection);
//add trans

router.post('/add-transection',addTransection);

//get tran
router.post('/get-transection',getAllTransection)

module.exports=router;