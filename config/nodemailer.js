const nodeMailer=require('nodemailer') 
const ejs=require('ejs')
const path=require('path')
const env=require('./enviornment')
// here we have define the code from the sender point of view
let transporter=nodeMailer.createTransport(env.smtp)

// here we have define which file and in which type of formate  it has to render 
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("error in rendering the template")
                return;
            }
            mailHTML=template
        }
        )
        return mailHTML;

}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}