const mongoose=require('mongoose');
// comment belongs to user
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:"true"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }]
});
mongoose.set('strictPopulate',false)

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment; 