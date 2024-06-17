const Db = require("../db/mySql");

class IngredientsController {
  getIngredients(req, res) {
    const id = req.params.slug;
    // console.log(id);
    const sql = `SELECT * FROM ingredients  where kind_id=?`;
    Db.query(sql, [id], (err, data) => {
      if (err) throw err;
      //   console.log(data);
      res.status(200).send(data);
    });
  }

  bestSeller(req, res) {
    Db.query(
      "SELECT * FROM ingredients WHERE selled >= 10 ORDER BY selled DESC",
      (err, datas) => {
        if (err) throw err;
        // console.log(data);
        const data = datas.slice(0, 5);
        res.status(200).json(data);
      }
    );
  }

  getIngreById(req, res) {
    const id = req.params.slug;
    const sql = `SELECT * FROM ingredients WHERE id = ${id}`;
    Db.query(sql, (err, ingredient) => {
      if (err) throw err;
      // console.log(ingredient);
      res.status(200).send(ingredient[0]);
    });
  }

  getAll(req, res) {
    Db.query(`SELECT * FROM ingredients`, (err, ingredients) => {
      if (err) throw err;

      res.status(200).json(ingredients);
    });
  }

  searchTerm(req, res) {
    const { searchTerm } = req.body;
    const keySearch = searchTerm.toLowerCase();
    console.log(keySearch);

    Db.query(
      `SELECT * FROM ingredients
    WHERE LOWER(name) LIKE '%${keySearch}%'
       OR kind_id IN (SELECT kindId FROM kind WHERE LOWER(kindName) LIKE '%${keySearch}%');
    `,
      (err, rs) => {
        if (err) throw err;
        console.log(rs);
        res.status(200).json(rs);
      }
    );
  }
}

module.exports = new IngredientsController();
