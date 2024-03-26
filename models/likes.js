const mongoose=require('mongoose');
const likeSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
    },
    // this defines the object of the liked object
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        refPath:'onModel'
    },
    // this field is used for definning the type of the liked object since this is dynamic reference
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comment'],
        
    }
},
{
    timestamps:true
})
mongoose.set('strictPopulate',false)
const Like=mongoose.model('Like',likeSchema);
module.exports=Like