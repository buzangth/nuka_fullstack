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

router.post(`/`,(req,res)=>{

    const category = new Category({
        name: req.body.name,
       
    })

    category.save().then((createdCategory => {
        res.status(201).json(createdCategory);
    }))
    if(!category)
     return res.status(404).send('category not created');
    

    res.send(category);

});

module.exports = router;