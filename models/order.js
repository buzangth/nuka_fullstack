const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: String,
    age: Number

})

exports.Order = mongoose.model('Order',orderSchema);