const Db = require("../db/mySql");

class CommentController {
  comments(req, res) {
    const { ingredientid } = req.query;
    // console.log(ingredientid);

    Db.query(
      `SELECT comments.id, users.id as userid, username, content, comments.created_at FROM comments JOIN users ON comments.user_id = users.id WHERE ingredient_id=${ingredientid}`,
      (err, comments) => {
        if (err) throw err;
        res.status(200).json(comments);
      }
    );
  }

  post(req, res) {
    const { userid, ingredientid, commenttext } = req.body;
    // console.log(userid, ingredientid, commenttext);
    Db.query(
      `INSERT INTO comments ( ingredient_id, user_id, content) VALUES ( ${ingredientid}, ${userid}, "${commenttext}")`,
      (err, rs) => {
        if (err) throw err;
        res.status(200).json("Comment added successfully!");
      }
    );
  }

  editCmt(req, res) {
    const { id, comment } = req.body;
    // console.log(id, comment);

    Db.query(
      `UPDATE comments SET content ="${comment}"  WHERE id =${id} `,
      (err, rs) => {
        if (err) throw err;

        res.status(200).json("The comment has been edited.");
      }
    );
  }

  deleteCmt(req, res) {
    const id = req.params.slug;
    // console.log(id);

    Db.query(`DELETE FROM comments WHERE id=${id}`, (err, rs) => {
      if (err) throw err;

      res.status(200).json("The comment has been deleted.");
    });
  }
}

module.exports = new CommentController();
