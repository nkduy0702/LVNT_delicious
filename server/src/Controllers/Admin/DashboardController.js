const Db = require("../../db/mySql");

class DashboardController {
  users(req, res) {
    const sql = "SELECT * FROM users ";
    Db.query(sql, (err, rs) => {
      if (err)
        return res.send({
          status: "false",
          code: 501,
          message: err,
        });
      // console.log(rs);
      res.send({
        status: "true",
        data: rs,
      });
    });
  }
  delete(req, res) {
    const { id } = req.body;

    // Tạo một mảng chứa các câu lệnh DELETE riêng biệt
    const deleteQueries = [
      `DELETE FROM cart WHERE user_id = ${id}`,
      `DELETE FROM comments WHERE user_id = ${id}`,
      `DELETE FROM ratings WHERE user_id = ${id}`,
      `DELETE FROM orders WHERE user_id = ${id}`,
      `DELETE FROM commentsRecipes WHERE user_id = ${id}`,
      `DELETE FROM users WHERE id = ${id}`,
    ];

    // Thực hiện các câu lệnh DELETE riêng biệt
    deleteQueries.forEach((query) => {
      Db.query(query, (err, result) => {
        if (err) {
          console.log(query);
          console.error("Lôi");
        }
      });
    });

    // Trả về kết quả thành công khi tất cả các câu lệnh DELETE đã được thực thi
    res.send({
      status: "true",
      msg: "Xóa tài khoản thành công!",
    });
  }
}

module.exports = new DashboardController();
