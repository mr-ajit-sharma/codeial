const Post = require('../models/post')
const Comment = require('../models/comment')
const commentMailer=require('../mailers/comment_mailer')
const commentEmailWorker=require('../workers/comment_email_worker')
const queue = require('../config/kue')
const Like=require('../models/likes')


module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post)
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            post.comments.push(comment);
            post.save();
            comment=await comment.populate(["user"])
            // commentMailer.newComment(comment)
            let job=queue.create('emails',comment).save(function(err){
                if(err){
                    console.log("error in creating the queue",err)
                    return;
                }
                console.log('job enqueued',job.id)
            })
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment:comment,
                        },
          
                    message: "comment has been created"
                })
            }
            req.flash('success', "comment has been created")
            res.redirect('/')
        }

    } catch (err) {
        console.log("error in creating the comments")
        return;
    }
}


module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id)
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } })
            // CHANGE: delete the associated likes which is associated with the comment
            await Like.deleteMany({likeable:comment._id,onModel:'comment'})
            // send the comment id which was deleted back to views
            if(req.xhr){
                return res.status({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"the comment has been deleted"

                })
            }
            req.flash('error', "comment has been deleted")

            return res.redirect('back')
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log("error in deleting the commemt", error)
        return;
    }
}