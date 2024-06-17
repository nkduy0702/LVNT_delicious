const Db = require("../../db/mySql");
const fs = require("fs");

class RecipesController {
  addRecipe(req, res) {
    const { ingredient_id, other_ingredients, recipe_name, detail, image } =
      req.body;

    // console.log(ingredient_id, other_ingredients, recipe_name, detail);
    // Chuyển đổi base64 thành buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(base64Data, "base64");

    // Lưu hình ảnh vào thư mục
    const imagePath = `src/public/images/recipes/${Date.now()}.png`;
    fs.writeFile(imagePath, buf, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving image");
      }

      // Thêm thông tin nguyên liệu vào cơ sở dữ liệu
      const sql = `INSERT INTO recipes (recipe_name, ingredient_id, other_ingredients, recipe_img, detail) VALUES (?, ?, ?, ?, ?)`;
      Db.query(
        sql,
        [recipe_name, ingredient_id, other_ingredients, imagePath, detail],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Server error");
          } else {
            res.status(200).send("Recipes added successfully");
          }
        }
      );
    });
  }

  getRecipe(req, res) {
    Db.query(
      `SELECT ingredients.name, recipes.* FROM ingredients JOIN recipes ON recipes.ingredient_id = ingredients.id`,
      (err, recipes) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server error");
        }

        res.status(200).json(recipes);
      }
    );
  }

  deleteRecipe(req, res) {
    const id = req.params.slug; // Lấy ID từ URL
    // console.log(id);

    const deleteRelatedDataQueries = [
      `DELETE FROM recipes WHERE recipe_id = ${id}`,
      `DELETE FROM commentsRecipes WHERE recipe_id = ${id}`,
      // Thêm các truy vấn xóa dữ liệu từ các bảng khác nếu cần
    ];

    // Thực hiện lần lượt các truy vấn để xóa dữ liệu từ các bảng có ràng buộc khóa ngoại
    deleteRelatedDataQueries.forEach((query) => {
      Db.query(query, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to delete recipe" });
        }
        res.status(200).send(`Recipe with Id = ${id} deleted successfully`);
      });
    });
  }

  getRecipeByIngre(req, res) {
    const ingredient_id = req.params.slug;
    // console.log(ingredient_id);
    Db.query(
      `SELECT ingredients.name, recipes.* FROM ingredients JOIN recipes ON recipes.ingredient_id = ingredients.id WHERE ingredient_id = ${ingredient_id}`,
      (err, rs) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server error");
        }
        res.status(200).json(rs);
      }
    );
  }
  getRecipeById(req, res) {
    const id = req.params.slug;
    console.log(id);
    Db.query(
      `SELECT ingredients.name, recipes.* FROM ingredients JOIN recipes ON recipes.ingredient_id = ingredients.id WHERE recipe_id = ${id}`,
      (err, recipe) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server error");
        }
        res.status(200).json(recipe);
      }
    );
  }
}

module.exports = new RecipesController();
