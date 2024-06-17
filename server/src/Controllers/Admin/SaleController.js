const Db = require("../../db/mySql");

class OrdersController {
  sale(req, res) {
    Db.query(
      "SELECT ingredient, SUM(quantity) AS total_quantity, SUM(subtotal) AS total_price FROM order_details GROUP BY ingredient;",
      (err, rs) => {
        if (err) throw err;

        res.status(200).json(rs);
      }
    );
  }
  saleByMonth(req, res) {
    Db.query(
      "SELECT YEAR(created_at) AS year, MONTH(created_at) AS month, ingredient, SUM(quantity) AS total_quantity, SUM(subtotal) AS total_price FROM order_details GROUP BY YEAR(created_at), MONTH(created_at), ingredient ORDER BY year DESC, month DESC, ingredient;",
      (err, rs) => {
        if (err) throw err;
        // console.log(rs);
        res.status(200).json(rs);
      }
    );
  }
}

module.exports = new OrdersController();
