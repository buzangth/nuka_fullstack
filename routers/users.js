const{User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req,res)=>{

    const userList = await User.find();
    if(!userList){
        res.status(500).json({success:true});
    }
    res.send(userList);
});

router.post(`/`,(req,res)=>{

    const user = new User({
        name: req.body.name,
        age : req.body.age
    });

    user.save().then((createdUser => {
        res.status(201).json(createdUser);
    }))
});

module.exports = router;