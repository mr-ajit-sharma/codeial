const nodemailer = require('../config/nodemailer')
// this is another way to exports the method

exports.newComment=(comment)=>{
    console.log("inside  new comment mailer",comment)
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    nodemailer.transporter.sendMail({
        from:"sharmaajit9096@gmail.com",
        to:'sajit1020@gmail.com',
        subject:"new comment published",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log("error insendinmg the mail",err)
            return ;
        }
        console.log("message sent",info)
        return ; 
    })
}

// wsrilqrqrjbvqlhe