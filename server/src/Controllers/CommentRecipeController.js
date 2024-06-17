const Db = require("../db/mySql");

class CommentRecipeController {
  comments(req, res) {
    const { recipeid } = req.query;
    // console.log(ingredientid);

    Db.query(
      `SELECT commentsRecipe.id, users.id as userid, username, content, commentsRecipe.created_at FROM commentsRecipe JOIN users ON commentsRecipe.user_id = users.id WHERE recipe_id=${recipeid}`,
      (err, comments) => {
        if (err) throw err;
        res.status(200).json(comments);
      }
    );
  }

  post(req, res) {
    const { userid, recipeid, commenttext } = req.body;
    // console.log(userid, ingredientid, commenttext);
    Db.query(
      `INSERT INTO commentsRecipe ( recipe_id, user_id, content) VALUES ( ${recipeid}, ${userid}, "${commenttext}")`,
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
      `UPDATE commentsRecipe SET content ="${comment}"  WHERE id =${id} `,
      (err, rs) => {
        if (err) throw err;

        res.status(200).json("The comment has been edited.");
      }
    );
  }

  deleteCmt(req, res) {
    const id = req.params.slug;
    // console.log(id);

    Db.query(`DELETE FROM commentsRecipe WHERE id=${id}`, (err, rs) => {
      if (err) throw err;

      res.status(200).json("The comment has been deleted.");
    });
  }
}

module.exports = new CommentRecipeController();
