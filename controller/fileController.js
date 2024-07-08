const express = require('express');
const router = express();
const fs = require('fs-extra');
const multer = require('multer');
const Bucket = require('../models/buckets.model');
const File = require('../models/files.model');
const { authorize, authenticate } = require('../auth');

router.use(authenticate);

const uploadFolder = './uploads/';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const upload = multer({ dest: uploadFolder });

router.post('/:bucketId/files', authorize(['admin','user']), upload.single('file'), async (req, res) => {
    try {
        const bucket = await Bucket.find({ "_id": req.params.bucketId, "user": req.user._id});
        if (!bucket || !bucket.length) {
            return res.status(404).json({ message: 'Bucket not found' });
        }
        const file = new File({
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
            bucket: req.params.bucketId
        });
        await file.save();
        res.status(201).send(file);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:bucketId/files', authorize(['admin','user']), async (req, res) => {
    try {
        const bucket = await Bucket.find({ "_id": req.params.bucketId, "user": req.user._id});
        if (!bucket || !bucket.length) {
            return res.status(404).json({ message: 'Bucket not found' });
        }
        const files = await File.find({ bucket: req.params.bucketId });
        res.json(files);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:bucketId/files/:fileId', authorize(['admin','user']), async (req, res) => {
    try {
        const bucket = await Bucket.find({ "_id": req.params.bucketId, "user": req.user._id});
        if (!bucket || !bucket.length) {
            return res.status(404).json({ message: 'Bucket not found' });
        }
        const file = await File.findById(req.params.fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.download(file.path, file.originalname);
        } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:bucketId/files/:fileId', authorize(['admin']), async (req, res) => {
    try {
        const bucket = await Bucket.find({ "_id": req.params.bucketId, "user": req.user._id});
        if (!bucket || !bucket.length) {
            return res.status(404).json({ message: 'Bucket not found' });
        }
        const file = await File.findById(req.params.fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        await fs.remove(file.path);
        await file.deleteOne();
        res.status(200).send({ message: 'File removed' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
