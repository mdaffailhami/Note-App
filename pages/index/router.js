const express = require("express");
const database = require("../../database/note-app");
const router = express.Router();

router.get("/", (req, res) => {
  // Cek jika session login tidak ada
  if (typeof req.session.user__id == "undefined") {
    res.redirect("/login");
    return;
  }

  // Cari tau siapa user yg login
  database.collections.Account.findById(req.session.user__id, (err, user) => {
    if (err) throw err;

    // Cari semua notes-nya si user
    database.collections.Note.find({ user__id: req.session.user__id }, (err, notes) => {
      if (err) throw err;

      res.render(`${__dirname}/index.ejs`, {
        user,
        notes,
      });
    });
  });
});

router.get("/logout", (req, res) => {
  console.log("\nLOGOUT\n");
  req.session.destroy();
  res.redirect("/login");
});

router.get("/delete/:_id", (req, res) => {
  // Cari catatan yg ingin user hapus
  database.collections.Note.findByIdAndDelete(req.params._id, (err, note) => {
    if (err) throw err;
    res.redirect("/");
    console.log("\nDELETE:\n", note);
  });
});

router.get("/style.css", (req, res) => {
  res.sendFile(`${__dirname}/style.css`);
});

router.get("/script.js", (req, res) => {
  res.sendFile(`${__dirname}/script.js`);
});
module.exports = router;
