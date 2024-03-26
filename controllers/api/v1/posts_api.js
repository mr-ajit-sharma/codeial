const Post = require('../../../models/post')
const Comment = require('../../../models/comment')
// const { post } = require('../../../routes/api')
module.exports.index = async function (req, res) {
    try {

        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user', {
                password: 0//here we are trying to exclude the password from bringing all the data from the user
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })

        return res.json(200, {
            message: "lists of posts",
            posts: posts
        })
    } catch (error) {
        return res.json(500, {
            message: "error in internal server"
        })
    }
}


module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        post.remove();

        if (post.user == req.user.id) {
            post.remove()
            await Comment.deleteMany({ post: req.params.id })


            return res.json(200, {
                message: "post and its assosciated comment has been deleted successfully"
            })
        } else {
            return res.json(401, {
                message: "you cannot delete these post "
            })
        }
    } catch (err) {
           return res.json(500, {
            message: "error in the internal server"
        });
    }
}