const mongoose = require('mongoose');
//Schema design
const transectionSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: [true, 'amount is required'],
    },
    type: {
        type: String,
        required: [true, 'type is required'],
    },
    category: {
        type: String,
        required: [true, 'cat is required']
    },
    reference: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'desc is required']
    },
    date: {
        type: Date,
        reuqired: [true, 'data is required']
    }
}, { timestamps: true });

//export
const transectionModel = mongoose.model('transections', transectionSchema)
module.exports = transectionModel