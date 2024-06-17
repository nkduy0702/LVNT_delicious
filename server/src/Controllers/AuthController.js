const Db = require("../db/mySql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  // ĐĂNG NHẬP
  async signin(req, res) {
    const { email, password } = req.body; // Trích xuất email và mật khẩu từ phần thân yêu cầu
    // console.log(emailSI, password); // Ghi log email và mật khẩu cho mục đích gỡ lỗi

    const sql = "SELECT * FROM users WHERE email = ?"; // Câu truy vấn SQL để lấy người dùng bằng email
    Db.query(sql, [email], (err, rs) => {
      // Thực thi truy vấn trong cơ sở dữ liệu
      if (err) throw err; // Ném lỗi nếu có lỗi xảy ra

      if (rs[0] === undefined) {
        // Kiểm tra nếu không có người dùng nào được tìm thấy với email cung cấp
        res.send({
          // Trả về một phản hồi JSON cho biết email hoặc mật khẩu không chính xác
          status: false,
          msg: "Email hoặc Mật khẩu không đúng",
        });
      } else {
        // Nếu tìm thấy người dùng với email cung cấp
        const user = rs[0]; // Lấy người dùng từ kết quả truy vấn
        bcrypt.compare(password, user.password, (err, result) => {
          // So sánh mật khẩu cung cấp với mật khẩu trong cơ sở dữ liệu
          if (!result) {
            // Nếu mật khẩu không khớp
            return res.json({
              // Trả về một phản hồi JSON cho biết mật khẩu không đúng
              status: false,
              msg: "Mật khẩu không đúng.",
            });
          } else {
            // Nếu mật khẩu khớp
            const secretKey = "delicious";
            const token = jwt.sign(
              { userId: user.id, email: user.email, name: user.username },
              secretKey,
              {
                expiresIn: "1h",
              }
            );
            res.json({
              status: true,
              msg: "Đăng nhập thành công!",
              token: token,
            });
          }
        });
      }
    });
  }

  // ĐĂNG KÝ
  signup(req, res) {
    const { name, email, password } = req.body;

    const sql =
      "INSERT INTO users (username, email, password) VALUES ( ?, ?, ?)";
    Db.query("SELECT * FROM users WHERE email = ?", [email], (err, rs) => {
      if (err) throw err;

      if (rs.length > 0) {
        return res.json({
          status: false,
          msg: "Tài khoản đã tồn tại. Vui lòng kiểm tra lại Email!",
        });
      } else {
        // Hashing the password before insert into database
        bcrypt.hash(password, 10, function (err, hash) {
          if (!err) {
            const params = [email, hash];
            Db.query(sql, [name, email, hash], (err, result) => {
              if (err) throw err;

              console.log("Đã thêm tài khoản thành công!");

              res.json({
                status: true,
                msg: "Đăng ký thành công! Vui lòng đăng nhập ngay bây giờ.",
              });
            });
          } else {
            return console.log(err);
          }
        });
      }
    });
  }
}

module.exports = new AuthController();
