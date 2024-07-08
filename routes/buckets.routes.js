const express = require("express");
const router = express();
const { authorize, authenticate } = require("../middleware/auth");
const bucketOperations = require("../controller/bucketController");

router.use(authenticate);

router.post("", authorize(["admin"]), bucketOperations.createBucket);
router.get("", authorize(["admin", "user"]), bucketOperations.listBuckets);
router.get(
  "/:bucketId",
  authorize(["admin", "user"]),
  bucketOperations.getBucketsInfo,
);
router.delete(
  "/:bucketId",
  authorize(["admin"]),
  bucketOperations.deleteBucket,
);

module.exports = router;
