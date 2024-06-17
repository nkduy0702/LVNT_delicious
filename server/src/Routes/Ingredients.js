const express = require("express");

const router = express.Router();

const Ingredients = require("../Controllers/IngredientsController");

router.use("/bestSeller", Ingredients.bestSeller);
router.use("/details/:slug", Ingredients.getIngreById);
router.post("/search", Ingredients.searchTerm);
router.use("/:slug", Ingredients.getIngredients);
router.use("/", Ingredients.getAll);

module.exports = router;
