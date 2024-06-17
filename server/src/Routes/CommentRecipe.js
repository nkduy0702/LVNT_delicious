const express = require("express");

const router = express.Router();

const CommentRecipeController = require("../Controllers/CommentRecipeController");

router.post("/", CommentRecipeController.post);
router.delete("/:slug", CommentRecipeController.deleteCmt);
router.put("/", CommentRecipeController.editCmt);
router.use("/", CommentRecipeController.comments);

module.exports = router;
