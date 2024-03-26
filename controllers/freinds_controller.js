
const Freindship = require('../models/freindship');

// to see the list of freinds
module.exports.getAllFreinds=async function(req,res){
    try {
        let freinds=await Freindship.find().populate('from_user to_user')
       return  res.render('_freinds',{freinds})
    } catch (error) {
        if(error){
        return res.status(500).json({error:"server error in creating freindship"})    
        }
    }
}

// for adding the feinds
module.exports.addFreinds=async function(req,res){
    try {
        const {from_user,to_user}=req.body
        console.log(req.body)
        const freindship=await Freindship.create({from_user,to_user})
        return  res.status(200).json({
            message:"made freinds successfully"
        }) 
    } catch (error) {
        return res.status(500).json({error:"server error in adding the freinds"})
    }
}

// to remove the freinds
module.exports.removeFreinds=async function(req,res){
    try {
        let freindsId=req.params.id
        await Freindship.findByIdAndRemove(freindsId)
       return  res.redirect('_freinds',)
    } catch (error) {
        return res.status(500).json({error:"server error in deleting the freinds"})
    }
}