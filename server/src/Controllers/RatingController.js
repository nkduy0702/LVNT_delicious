const Db = require("../db/mySql");

class RatingController {
  rate(req, res) {
    const { userid, rating, id } = req.body;
    // console.log(userid, id, rating);
    Db.query(
      `INSERT INTO ratings (user_id, ingredient_id, rating) VALUES (${userid}, ${id}, ${rating})`,
      (err, rs) => {
        if (err) throw err;
        Db.query(
          `SELECT rating FROM ratings WHERE ingredient_id=${id}`,
          (err, rating) => {
            if (err) throw err;
            let total = 0;
            rating.map((data) => {
              total += data.rating;
            });
            const avgRating = total / rating.length;
            Db.query(
              `UPDATE ingredients SET rating = ${avgRating} WHERE id =${id}`,
              (err, rs) => {
                if (err) throw err;
                res.status(200).json("Rating Successfully!");
              }
            );
          }
        );
      }
    );
  }

  getRate(req, res) {
    const { userid, ingredientid } = req.query;

    // console.log(userid, ingredientid);

    Db.query(
      `SELECT * FROM ratings WHERE user_id =${parseInt(
        userid
      )} and ingredient_id = ${parseInt(ingredientid)}`,
      (err, rs) => {
        if (err) throw err;

        if (rs.length > 0) {
          res.status(200).json(rs[0].rating);
        } else {
          res.status(200).json(null); // return null if no data found
        }
      }
    );
  }
}

module.exports = new RatingController();
