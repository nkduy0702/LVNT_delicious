const Db = require("../db/mySql");

class HomeController {
  index(req, res) {
    res.json({
      id: req.userId,
      email: req.email,
      name: req.name,
    });
  }
  getIngredients(req, res) {
    const id = req.params.slug;
    console.log(id);
    const sql = `SELECT * FROM ingredients  where kind_id=?`;
    Db.query(sql, [id], (err, data) => {
      if (err) throw err;
      console.log(data);
      res.status(200).send(data);
    });
  }
}

module.exports = new HomeController();
