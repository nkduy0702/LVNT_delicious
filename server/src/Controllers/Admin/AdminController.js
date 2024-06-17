const Db = require("../../db/mySql");
const fs = require("fs");

class AdminController {
  add(req, res) {
    const { kind_id, name, descriptions, price, image } = req.body;

    // console.log(kind_id, name, descriptions, price, image);
    // Chuyển đổi base64 thành buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(base64Data, "base64");

    // Lưu hình ảnh vào thư mục
    const imagePath = `src/public/images/ingredients/${Date.now()}.png`;
    fs.writeFile(imagePath, buf, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving image");
      }

      // Thêm thông tin nguyên liệu vào cơ sở dữ liệu
      const sql = `INSERT INTO ingredients (kind_id, name, descriptions, price, image) VALUES (?, ?, ?, ?, ?)`;
      Db.query(
        sql,
        [kind_id, name, descriptions, price, imagePath],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Server error");
          } else {
            res.status(200).send("Ingredient added successfully");
          }
        }
      );
    });
  }

  get(req, res) {
    const sql = "SELECT *  FROM ingredients JOIN kind ON kind_id = kind.kindId";
    Db.query(sql, (err, result) => {
      // console.log(result);
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      } else {
        res.status(200).json(result);
      }
    });
  }

  delete(req, res) {
    const id = req.params.slug; // Lấy ID nguyên liệu từ URL

    // Xóa dữ liệu từ các bảng có ràng buộc khóa ngoại trước
    const deleteRelatedDataQueries = [
      `DELETE FROM comments WHERE ingredient_id = ?`,
      `DELETE FROM ratings WHERE ingredient_id = ?`,
      `DELETE FROM cart WHERE ingredient_id = ?`,
      `DELETE FROM recipes WHERE ingredient_id = ?`,

      // Thêm các truy vấn xóa dữ liệu từ các bảng khác nếu cần
    ];

    // Thực hiện lần lượt các truy vấn để xóa dữ liệu từ các bảng có ràng buộc khóa ngoại
    deleteRelatedDataQueries.forEach((query) => {
      Db.query(query, [id], (err, result) => {
        if (err) {
          console.error("Lỗi");
        }
      });
    });

    // Sau khi xóa dữ liệu từ các bảng có ràng buộc khóa ngoại, tiến hành xóa nguyên liệu từ bảng "ingredients"
    const sql = `DELETE FROM ingredients WHERE id = ${id}`;

    Db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete ingredient" });
      }
      res.status(200).send(`Ingredient with ID ${id} deleted successfully`);
    });
  }
}

module.exports = new AdminController();
