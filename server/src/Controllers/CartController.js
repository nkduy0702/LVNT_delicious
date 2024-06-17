const Db = require("../db/mySql");

class CartController {
  addToCart(req, res) {
    const { userId, ingredient } = req.body;
    const sqlsub = "SELECT *FROM cart where  user_id=?  and ingredient_id= ?";
    const sql1 =
      "INSERT INTO cart (user_id, ingredient_id, quantity, total) VALUES (?,?,?,?)";
    const sql2 =
      "UPDATE cart SET quantity = ?, total = ? WHERE user_id =? AND ingredient_id =? ";

    Db.query(sqlsub, [userId, ingredient.id], (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        Db.query(
          sql1,
          [userId, ingredient.id, 1, ingredient.price],
          (err, rs) => {
            if (err) throw err;
            console.log("Thêm thành công vào giỏ hàng!");
            res.status(200).send("Added to cart!");
          }
        );
      } else {
        const updateQuantity = result[0].quantity + 1;
        const updatedTotal = parseFloat(result[0].total) + ingredient.price;
        console.log(updatedTotal);
        Db.query(
          sql2,
          [updateQuantity, updatedTotal, userId, ingredient.id],
          (e, r) => {
            if (e) throw e;
            console.log("Thêm thành công vào giỏ hàng!");
            res.status(200).send("Update cart successfully!");
          }
        );
      }
    });
  }

  getCart(req, res) {
    const userId = req.params.slug;
    const sql = `
    SELECT *
    FROM cart
    INNER JOIN ingredients ON cart.ingredient_id = ingredients.id
    WHERE cart.user_id = ?`;
    Db.query(sql, userId, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      // console.log(result);
      res.status(200).json(result);
    });
  }

  deleteItems(req, res) {
    const { cart_id } = req.body;
    const sql = "DELETE FROM cart WHERE cart_id=?";
    Db.query(sql, cart_id, (err, result) => {
      if (err) throw err;

      res.status(200).send("Delete success");
    });
  }

  modifierQuantity(req, res) {
    const { cart_id, newQuantity, newTotal } = req.body;
    // console.log(cart_id, newQuantity, newTotal);

    if (newQuantity == 0) {
      Db.query("DELETE FROM cart WHERE cart_id=?", cart_id, (err, result) => {
        if (err) throw err;
        res.status(201).send("Delete successfully");
      });
    } else {
      const updateQuery = `UPDATE cart SET quantity = ${newQuantity}, total= ${newTotal} WHERE cart_id=${cart_id}`;
      Db.query(updateQuery, (err, result) => {
        if (err) throw err;
        res.status(201).json("Update Qualitity Successfully!");
      });
    }
  }
}

module.exports = new CartController();
