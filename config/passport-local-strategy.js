const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/users')

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true, // Passes the request object as the first argument
    failureFlash: true, // Enables flash messages on authentication failure
  },
  function(req, username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        req.flash('error', 'Invalid username '); // Flash error message
        return done(null, false);
      }
      if (user.password !== password) {
        req.flash('error', 'Invalid  password'); // Flash error message
        return done(null, false);
      }
  
      return done(null, user);
    });
  }));
// passport.use(new LocalStrategy({
//     usernameField:'email'
// },
//     function(req,username, password, done) {
//       User.findOne({ email: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (user.password!==password) {
//             req.flash('error',"invalid username and password")
//             return done(null, false)}

//         return done(null, user);
//       });
//     }
//   ));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding the user=> passport")
            return done(err);
        }
        return done(null,user);
    })
})

// check if the user is authenticated or not
passport.checkAuthentication=function(req,res,next){
    // if the user signed in then it moves on to the controller action
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in')
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in from session cookie and we are just sending to the locals for the views
        res.locals.user=req.user;
    }   
    return next()
}

module.exports=passport;