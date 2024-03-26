// first step is to make structural directory
// second step here for creating the directory we have given a command that is (mkdir views,models,controllers,routers,config)
// third step is to install express by givin command in the terminal that is npm install express
// fourth step is to set the npm start  through json file automatically for that you have to pass the command in the json file as like "start":"nodemon index.js"
// fifth step is to set the git repository by adding ( in these u got eligibility to ignore the loads of file just by writing some commands in that file )



const express = require('express')
const env=require('./config/enviornment')
const logger=require('morgan')
const port = 7000;
const bodyParser = require('body-parser')// here we are going to addd the library of cookies which is used to store the data on the browser
const app = express();
require('./config/view-helpers')(app);
const expressLayouts = require('express-ejs-layouts')//it is used to bring the common layouts
const db = require('./config/mongoose');//here we are importing the data from the server
// const sassMiddleware=require('')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const customWare = require('./config/middleware')
const path=require('path')
app.use(express.static(path.join(__dirname+env.asset_path)))//it is use to acces the static files
app.use(session({
    name: '__node_auth_login__',
    secret: env.session_cookie_key,
    resave: false,
    saveUninitialized: false,          //set cookies if session gets created by passport
    cookie: { maxAge: 1000 * 60 * 40 }, //set expiration to 40 min
    store: new MongoStore({
        url: 'mongodb://127.0.0.1',
        // ttl: 14 * 24 * 60 * 60,      //either set cookies expiration or ttl here
        autoRemove: 'native'
    })
}))
app.use(express.urlencoded())//it is used to read the data
app.use(bodyParser.json())//now here express is going to use the cookie parser
app.use(expressLayouts)//here it used to use the common library



// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use(logger(env.morgan.mode,env.morgan.options))

// extract the styles and scripts from subpages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.set('view engine', 'ejs');//here we are setting up the which engine we are using that is ejs
app.set('views', ('./views'))//which folder ejs has to show through its engine

// mongo store is used to keep cookie in the db

// used for the session cookies
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const passportJWT=require('./config/passport-jwt-strategy')

// importing the passportGoogle
const passportGoogle=require('./config/passport-google-oauth2-stategy');

app.use(passport.initialize());

app.use(passport.session())
app.use(function(req,res,next){

    next();
})
app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(customWare.setFlash);

// set up the chatserver with the sockets.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer)
chatServer.listen(5000)
console.log("chat server is listening on the port 5000")


// setup the express router
app.use('/', require('./routes'))//it is denoting that which folder has to access first

app.listen(port, function (err) {
    if (err) {
        console.log(`the server has given the error:${err}`)
    }
    console.log(`the server is running on the port: ${port}`)
}
)