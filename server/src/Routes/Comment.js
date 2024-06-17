const express = require("express");

const router = express.Router();

const CommentController = require("../Controllers/CommentController");

router.post("/", CommentController.post);
router.delete("/:slug", CommentController.deleteCmt);

router.put("/", CommentController.editCmt);
router.use("/", CommentController.comments);

module.exports = router;
