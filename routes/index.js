const express=require('express');
const router=express.Router();//here the express is fetching the data of the routes by using the parent index.js
const homeController=require('../controllers/home_controller')//here we are trying to fetching the data of the router by controllers 
console.log("router is loaded")//
router.get('/',homeController.home);
router.use('/users',require('./users'))
router.use('/posts',require('./posts'))
router.use('/comments',require('./comments'))
router.use('/likes',require('./likes'))
router.use('/freinds',require('./freinds'))

router.use('/api',require('./api'))
// further for any othere router use then we use
// router.use("router name",require(router file))
module.exports=router;


// const express=require('express');
// const Router=express.Router();
// const homeController=require('../controllers/home_controller')
// router.get('/',homeController.home)
// router.use('/users',require('./users'))
// router.use('/family',require('./family'))
// module.exports=router;