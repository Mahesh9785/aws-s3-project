const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

bucketSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.bucketId = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

bucketSchema.set('toObject', {
    transform: (doc, ret, options) => {
        delete ret.__v;
        ret.bucketId = ret._id;
        delete ret._id;
        return ret;
    }
});

module.exports = mongoose.model('Bucket', bucketSchema);