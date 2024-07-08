const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  path: { type: String, required: true },
  bucket: { type: mongoose.Schema.Types.ObjectId, ref: 'Bucket', required: true }
});

fileSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.fileId = ret._id;
    delete ret._id;    
    delete ret.__v;
    return ret;
  }
});

fileSchema.set('toObject', {
  transform: (doc, ret, options) => {
    ret.fileId = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('File', fileSchema);