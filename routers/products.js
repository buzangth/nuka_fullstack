const {Product }= require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

router.get(`/`, async (req,res)=>{

    const productList = await Product.find();
    if(!productList){
        res.status(500).json({success:true});
    }
    res.send(productList);
});

router.post(`/`,async(req,res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('invalid category');
    const product = new Product({
        name: req.body.name,
        description:req.body.description,
        detailedDescripyion:req.body.detailedDescripyion,
        image:req.body.image,
        images:req.body.images,
        brand: req.body.brand,
        price:req.body.price,
        category: req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
        isFeatured: req.body.isFeatured

    })

     product = await product.save().then((createdProduct => {
        res.status(201).json(createdProduct);
    }))

     if(!product) 
     return res.status(500).send('product not created');
    
     res.send(category);
});


router.put(`/:id`,async(req,res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name
        },{new:true}
    )

 
    if(!product){
     return res.status(404).send('category not created');
    }else{
     res.send(product);
    }
})

router.delete(`/:id`,async (req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            return res.status(201).json({success:true,message:'product deleted'});
        }
        else{
            return res.status(404).json({success:false,message:'product id not found'});
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err});
    })

    
})

router.get(`/:id`, async (req,res)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(500).json({success:true});
    }
    res.send(product);
}) 


module.exports = router;