const {Order}= require('../models/order');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req,res)=>{

    const orderList = await Order.find();
    if(!orderList){
        res.status(500).json({success:true});
    }
    res.send(orderList);
});

router.post(`/`,(req,res)=>{

    const order = new Order({
        name: req.body.name,
        age : req.body.age
    })

    order.save().then((createdOrder => {
        res.status(201).json(createdOrder);
    }))
});

module.exports = router;