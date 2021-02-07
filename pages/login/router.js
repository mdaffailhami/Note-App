const mod = {
  express: require("express"),
  query: require("querystring"),
  bcrypt: require("bcrypt"),
};
const database = require("../../database/note-app");

const router = mod.express.Router();

router.get("/login", (req, res) => {
  res.render(`${__dirname}/login.ejs`);
});

router.post("/login", (req, res) => {
  req.on("data", (chunk) => {
    const data = mod.query.parse(String(chunk));

    database.collections.Account.findOne({ username: data.username }, (err, doc) => {
      if (err) throw err;
      // Cek jika username salah
      if (doc == null) {
        res.send(
          `<script>
            alert("username tidak terdaftar!!!");
            window.location.href = "/login";
          </script>`
        );
        return;
      }

      // Cek jika password salah
      if (!mod.bcrypt.compareSync(data.password, doc.password)) {
        res.send(
          `<script>
            alert("password salah!!!");
            window.location.href = "/login";
          </script>`
        );
        return;
      }

      // Jika username dan password sudah benar
      database.collections.Account.findOne({ username: data.username }, (err, doc) => {
        if (err) throw err;

        req.session.user__id = doc._id;
        res.send(
          `<script>
          window.location.href = "/";
          </script>`
        );
        console.log("\nLOGIN:\n", doc);
      });
    });
  });
});

module.exports = router;
