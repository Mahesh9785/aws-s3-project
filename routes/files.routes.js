const express = require("express");
const router = express();
const { authorize, authenticate } = require("../middleware/auth");
const fs = require("fs-extra");
const multer = require("multer");
const fileOperations = require("../controller/fileController");

router.use(authenticate);

const uploadFolder = "./uploads/";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const upload = multer({ dest: uploadFolder });

router.post(
  "/:bucketId/files",
  authorize(["admin", "user"]),
  upload.single("file"),
  fileOperations.putObject,
);
router.get(
  "/:bucketId/files",
  authorize(["admin", "user"]),
  fileOperations.listObjects,
);
router.get(
  "/:bucketId/files/:fileId",
  authorize(["admin", "user"]),
  fileOperations.getObject,
);
router.delete(
  "/:bucketId/files/:fileId",
  authorize(["admin"]),
  fileOperations.deleteObject,
);

module.exports = router;
