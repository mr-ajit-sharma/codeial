// here we are trying to create the controllers
const Post = require('../models/post')
const User = require('../models/users')
// module.exports.home=async function(req,res){


//     // how to populate the user for the each post
//    let post=await Post.find({})
//    .populate('user')
//    .populate({
//     path:'comments',
//     populate:{
//         path:"user"
//     }
//    })
//     User.find({},function(err,users){
//         return res.render('home',{
//             title:"codeial | home",
//             posts:post,
//             all_users:users
//         });
//     })
// }


module.exports.home = async function (req, res) {
    try {
        // CHANGE:here we have populate the likes for each post and comment
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate:{
                    path:'likes'
                }
            }).populate('likes');
        let users = await User.find({})
        return res.render('home', {
            title: "codeial | home",
            posts: posts,
            all_users: users
        })
    } catch (err) {
        console.log("error", err)
    }
}