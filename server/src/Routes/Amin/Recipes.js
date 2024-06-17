const express = require("express");

const router = express.Router();

const RecipesController = require("../../Controllers/Admin/RecipesController");

router.post("/", RecipesController.addRecipe);
router.use("/detail/:slug", RecipesController.getRecipeById);
router.use("/:slug", RecipesController.getRecipeByIngre);
router.delete("/:slug", RecipesController.deleteRecipe);
router.use("/", RecipesController.getRecipe);

module.exports = router;
