const {Product }= require('../models/product');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req,res)=>{

    const productList = await Product.find();
    if(!productList){
        res.status(500).json({success:true});
    }
    res.send(productList);
});

router.post(`/`,(req,res)=>{

    const product = new Product({
        name: req.body.name,
        age : req.body.age
    })

    product.save().then((createdProduct => {
        res.status(201).json(createdProduct);
    }))
});

module.exports = router;