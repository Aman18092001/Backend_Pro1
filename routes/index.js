const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_controllers');

console.log('router loaded');
router.get('/',homeController.home);
//middleware
router.use('/users',require('./users'));
router.use('/post',require('./post'));


module.exports=router;