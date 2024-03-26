// now here we are going to create the production enviornnment and development enviornment
const fs=require('fs')
const rfs=require('rotating-file-stream')
const path=require('path')

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory 
})

const development={
name:'development',
asset_path:'/assets',
session_cookie_key:"blah blah sommething",
db:'codeial_development',
smtp:{
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'sharmaajit9096@gmail.com',
        pass:'gteldgupvljvtbbk'
    }
},
google_client_id: "70372922418-64h2i1oi3r5i5ggdb0kkdm81mfb7t7l6.apps.googleusercontent.com",
google_client_secret_key: "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",
google_callback_URL: "http://localhost:8001/users/auth/google/callback",
jwt_secret:"codeial",
morgan:{
    mode:'dev',
    options:{stream:accessLogStream}
}
}

// now here we are going on one site thats name is randomkeygen to generate the new random key
// these all are work on the production level
const production={
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret_key: process.env.CODEIAL_GOOGLE_CLIENT_SECRET_KEY,
    google_callback_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}
module.exports=eval(process.env.CODEIAL_ENVIORNMENT)==undefined ? development:eval(process.env.CODEIAL_ENVIORNMENT)
// module.exports=development
