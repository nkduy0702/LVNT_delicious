const Db = require("../db/mySql");

class DiscountController {
  check(req, res) {
    const code = req.params.slug;
    // console.log(code);

    Db.query(
      "SELECT percent FROM discount WHERE code = ?",
      [code],
      (err, result) => {
        if (err) {
          console.log("Lỗi lấy mã giảm giá!");
        } else {
          if (result.length > 0) {
            const percent = result[0].percent;

            res.status(200).json(percent);
          } else {
            res.status(201).json("NOT OK");
          }
        }
      }
    );
  }
}

module.exports = new DiscountController();
