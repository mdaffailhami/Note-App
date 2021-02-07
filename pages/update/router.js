const query = require("querystring");
const express = require("express");
const database = require("../../database/note-app");

const router = express.Router();

router.get("/update/:_id", (req, res) => {
  database.collections.Note.findById(req.params._id, (err, note) => {
    if (err) throw err;
    res.render(`${__dirname}/update.ejs`, {
      note,
    });
  });
});

router.post("/update/:_id", (req, res) => {
  req.on("data", (chunk) => {
    const data = query.parse(String(chunk));
    database.collections.Note.findByIdAndUpdate(
      req.params._id,
      {
        title: data.title,
        content: data.content,
      },
      (err, note) => {
        if (err) throw err;
        res.send(
          `<script>
            alert("Catatan berhasil diedit!!!");
            document.location.href = "/";
          </script>`
        );
        console.log("\nUPDATE:\n", note);
      }
    );
  });
});

module.exports = router;
