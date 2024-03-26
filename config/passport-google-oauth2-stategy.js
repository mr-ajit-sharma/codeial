const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
// as we know that here to to use the google auth we have to install the passport-google-oauth through the terminal 
// then after we have to import the passport,google oauth and crypto
const crypto = require('crypto')
const User = require('../models/users')
const env=require('./enviornment')
// now here we have import the all requirements

//tell passport to use new strategy for google login  
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret_key,
    callbackURL: env.google_callback_URL,
},function(accessToken,refreshToken,profile,done){
    // find the user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error in google strategy passport",err);
            return ;
        }
            console.log(profile)
            console.log("this is access token bro "+accessToken)
            console.log("this is refresh token bro "+refreshToken)
        if(user){
            // if found the user then then set it as req.user
            return done(null,user);
        }else{
            // if not found then create the user and set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log("error in user creating google strategy passport",err)
                    return ;
                }
                return done(null,user)
            })
        }
    })
}
))
