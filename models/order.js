const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    shippingAddress1:{
        type: String,
        required: true,
    },

    shippingAddress2:{
        type: String,
        
    },

    city:{
        type: String,
        required: true,
    },

    zip:{
        type: String,
        required: true,
    },

    country:{
        type: String,
        default: 'South Africa',

    },

    phone:{
        type: String,
        required: true,
    },

    status:{
        type: String,
        default:'pending',
    },

    totalPrice:{
        type: Number,

    },

    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    dateOrdered:{
        type: Date,
        default: Date.now
    }


})

exports.Order = mongoose.model('Order',orderSchema);