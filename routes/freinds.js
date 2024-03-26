const express=require('express');
const router=express.Router();
const freindssController=require('../controllers/freinds_controller')
router.get('/getAllFreinds',freindssController.getAllFreinds)
router.post('/addFreinds',freindssController.addFreinds)
router.get('/removeFreinds/:id',freindssController.removeFreinds)
module.exports=router