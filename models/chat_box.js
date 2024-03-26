const mongoose=require('mongoose')
const chatSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    ts:true
})
const Chat=mongoose.model('Chat',chatSchema)
module.exports=Chat;