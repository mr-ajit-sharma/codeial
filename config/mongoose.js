const mongoose=require('mongoose')
const env=require('./enviornment')
mongoose.connect(`mongodb://127.0.0.1/${env.db}`)
const db =mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to the mongodb"));
db.once('open',function(){
    
    console.log("connecting to the database::mongoDB")
})
module.exports=db;
