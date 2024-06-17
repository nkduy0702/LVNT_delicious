const Db = require("../db/mySql");

class OrdersController {
  setAddress(req, res) {
    const { userId, address, orderId } = req.body;
    console.log(userId, address, orderId);
    const sql =
      "INSERT INTO orders (order_id, user_id, address) VALUES (?,?,?)";
    Db.query(sql, [orderId, userId, address], (err, result) => {
      if (err) {
        console.log("Lỗi thêm vào CSDL " + err);
      } else {
        res.status(200).json("Thêm vào CSDL thành công!");
      }
    });
  }

  getOders(req, res) {
    const { state } = req.query;
    // console.log(state);
    Db.query(
      `SELECT users.username, orders.* FROM orders JOIN users ON orders.user_id = users.id WHERE state = "${state}"`,
      (err, orders) => {
        if (err) throw err;
        res.status(200).json(orders);
      }
    );
  }

  updateOrders(req, res) {
    const { id, state } = req.body;
    console.log(id, state);

    Db.query(
      `UPDATE orders SET state ="${state}"  WHERE (order_id ="${id}" );`,
      (err, rs) => {
        if (err) throw err;

        res.status(200).json("update state successfully");
      }
    );
  }
}

module.exports = new OrdersController();
