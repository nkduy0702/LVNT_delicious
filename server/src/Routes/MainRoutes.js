const Auth = require("./Auth");
const Home = require("./Home");
const Dashboard = require("./Amin/Dashboard");
const Admin = require("./Amin/Admin");
const Ingredients = require("./Ingredients");
const Cart = require("./Cart");
const Orders = require("./Orders");
const Discount = require("./Discount");
const Sale = require("./Amin/Sale");
const Rating = require("./Rating");
const Comment = require("./Comment");
const Recipes = require("./Amin/Recipes");
const CommentRecipe = require("./CommentRecipe");

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  // console.log(token);
  if (!token) {
    console.log("Token không được cung cấp.");
    return res.status(401).json({ message: "Token không được cung cấp." });
  }

  try {
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const decoded = jwt.verify(token, "delicious");
    req.userId = decoded.userId;
    req.email = decoded.email;
    req.name = decoded.name;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ." });
  }
};

function Route(app) {
  app.use("/auth", Auth);
  app.use("/home", verifyToken, Home);
  app.use("/dashboard", Dashboard);
  app.use("/admin", Admin);
  app.use("/ingredients", Ingredients);
  app.use("/cart", Cart);
  app.use("/orders", Orders);
  app.use("/discount", Discount);
  app.use("/sale", Sale);
  app.use("/rating", Rating);
  app.use("/comment", Comment);
  app.use("/recipes", Recipes);
  app.use("/recipe_comment", CommentRecipe);
}

module.exports = Route;
