const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/likes')

// module.exports.create=function(req,res){
//     Post.create({
//             content:req.body.content,
//             user:req.user.id
//         },function(err,post){
//                 if(err){
//                         console.log("error in creating the post");  3
//                         return;
//                     }
//                     return res.redirect('back');
//                 }
//                 )
//             }    

// here now we are going to create by async await method
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user.id
        })
        if (req.xhr) {//here we have uses a ajax
            post = await post.populate(["user"])
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "post created"
            })
        }
        req.flash('success', "post has created")
        // here in these we cannot put the callback function
        return res.redirect('back')
    } catch (err) {
        req.flash('error', err)
        console.log("error in creating the post", err)
        return res.redirect('back');
    }
}


module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            // CHANGE:delete the likes of every post and comments which is associated with it
            await Like.deleteMany({ likeable: post, onModel: 'post' })
            await Like.deleteMany({ _id: { $in: post.comments} })
            post.remove();
        }
        await Comment.deleteMany({ post: req.params.id })
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "post has been deleted"
            })
        }
        req.flash('error', "post has been deleted")
        return res.redirect('back')
    } catch (err) {
        console.log("error in deleting the post", err)
        return;
    }
}