const Bucket = require("../models/buckets.model");

exports.createBucket = async (req, res) => {
  const { name } = req.body;
  const bucket = new Bucket({ name, user: req.user._id });
  try {
    await bucket.save();
    res.status(201).send(bucket);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.listBuckets = async (req, res) => {
  try {
    const buckets = await Bucket.find({ user: req.user._id }).exec();
    res.send(buckets);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getBucketsInfo = async (req, res) => {
  const { bucketId } = req.params;
  try {
    const bucket = await Bucket.findOne({
      bucketId,
      user: req.user._id,
    }).exec();
    if (!bucket) {
      res.status(404).send({ message: "Bucket not found" });
    } else {
      res.send(bucket);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteBucket = async (req, res) => {
  const { bucketId } = req.params;
  try {
    const result = await Bucket.deleteOne({
      _id: bucketId,
      user: req.user._id,
    }).exec();
    if (result.deletedCount == 1) {
      res.status(200).json({ message: "Bucket removed" });
    } else {
      res.status(404).json({ message: "Bucket not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
