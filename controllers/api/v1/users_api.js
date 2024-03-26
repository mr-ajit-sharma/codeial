// in these we will learn how to decrypt the encrypted data
const User = require('../../../models/users')
const jwt = require('jsonwebtoken')
const env=require('../../../config/enviornment')

module.exports.createSession = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user || user.password!=req.body.password) {
            return res.json(422, {
                message: "invalid username and password "
            })
        }
        return res.json(200, {
            message: "sign in successfully,here is your token please keep your token safe",
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret,{expiresIn:10000})
                // here we have given the security key for encrypting data because every data will be encrypt
                 
            }
        })
    } catch (error) {
        console.log("******", error)
        return res.json(500, {
            message: "internak server error"
        })
    }
}