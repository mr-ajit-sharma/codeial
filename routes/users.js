const express =require('express');
const router=express.Router();
const passport = require('passport');
const userControllers=require('../controllers/user_controllers');
// passport.checkAuthentication,
router.get('/profile/:id',passport.checkAuthentication,userControllers.profile)
router.post('/update/:id',passport.checkAuthentication,userControllers.update)
router.get('/sign-in',userControllers.signIn)//here we have created the router controll for the sign in
router.get('/sign-up',userControllers.signUp)//we have also created the router contoller for the sign up
router.post('/create',userControllers.create)
// router.get('/sign-out',userControllers.destroySession)
//use passport as the middleware to authenticate  
router.post('/create-session',passport.authenticate(//here e have added the middle-ware to execute the programme through it  
    'local',
    {failureRedirect:'/users/sign-in'},
),userControllers.createSession)
// console.log("profile is loaded");
router.get('/sign-out',userControllers.destroySession)
router.get('/reset-page',userControllers.resetPage)
router.post('/reset',userControllers.reset)

// now here we are going to create the routes for the google authentication
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userControllers.createSession)
module.exports=router;
    