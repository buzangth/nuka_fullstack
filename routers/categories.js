const {Category}= require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req,res)=>{

    const categoryList = await Category.find();
    if(!categoryList){
        res.status(500).json({success:true});
    }
    res.send(categoryList);
});

router.post(`/`,async (req,res)=>{

    const category = new Category({
        name: req.body.name
       
    })

     category = await category.save().then((createdCategory => {
        res.status(201).json(createdCategory);
    }))
 
    if(!category)
    return res.status(500).send('category not created');
    
    return res.send(category);


});

router.put(`/:id`,async(req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name
        },{new:true}
    )

    // category = await category.save().then((updatedCategory => {
    //     res.status(201).json(updatedCategory);
    // }))
 
    if(!category){
     return res.status(404).send('category not created');
    }else{
     res.send(category);
    }
})

router.delete(`/:id`,async (req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            return res.status(201).json({success:true,message:'category deleted'});
        }
        else{
            return res.status(404).json({success:false,message:'category id not found'});
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err});
    })

    
})

router.get(`/:id`, async (req,res)=>{

    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({success:true});
    }
    res.send(category);
}) 

module.exports = router;