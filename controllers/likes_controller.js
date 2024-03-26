// here we have to imported these all file 
const Like = require('../models/likes')
const Post = require('../models/post')
const Comment = require('../models/comment');

// now here we are going to create the actions
// here we have used the async function because we are going to create the dynamically
module.exports.toggleLike = async function (req, res) {
    try {
        // likes/toggle/?id=abcde&type=Post
        let likeable;//here it will take the choice only it can like only to likeable elements
        let deleted = false;//for toggling
        // console.error()
           if (req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes')
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes')
        }
        
        // if like is already exist
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        
        // if like is already exist then delete it
        if (existingLike) {
            likeable.likes.pull(existingLike._id);
           likeable.save();
           existingLike.remove();

            deleted = true;
        } else {
            let newLike = await Like.create({
                likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            })
            likeable.likes.push(newLike._id)
            likeable.save();
        }
        
              
        return res.status(200).json({
            message:"request successfull",
            data:{
                deleted:deleted
            }
        })
    } catch (error) {
            console.log(error)
            return res.json(500, {
                message: "Internal server error"
            })
        
    }

}