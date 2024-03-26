const mongoose=require('mongoose');
const passwordSchema=new mongoose.Schema({
    password:{
        type:String,
        require:true,
    }
},{
    timestamps:true,
    strict:false
})
const Password=mongoose.model('Password',passwordSchema)
module.exports=Password;