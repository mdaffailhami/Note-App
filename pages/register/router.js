const mod = {
  express: require("express"),
  query: require("querystring"),
  bcrypt: require("bcrypt"),
};
const database = require("../../database/note-app");

const router = mod.express.Router();

router.get("/register", (req, res) => {
  res.render(`${__dirname}/register.ejs`);
});

router.post("/register", (req, res) => {
  req.on("data", (chunk) => {
    const data = mod.query.parse(String(chunk));

    // Cek jika username mengandung huruf kapital
    for (let i = 0; i < data.username.length; i++) {
      if (data.username[i] == data.username[i].toUpperCase()) {
        res.send(
          `<script>
            alert("username tidak boleh mengandung huruf kapital!!!");
            window.location.href = "/register";
          </script>`
        );
        return;
      }
    }

    database.collections.Account.find((err, accounts) => {
      if (err) throw err;

      // Cek jika username sudah terdaftar

      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].username == data.username) {
          res.send(
            `<script>
              alert("username sudah terdaftar!!!");
              window.location.href = "/register";
            </script>`
          );
          return;
        }
      }

      // Cek jika confirm_password salah
      if (data.password != data.confirm_password) {
        res.send(
          `<script>
            alert("Confirm password salah!!!");
            window.location.href = "/register";
          </script>`
        );
        return;
      }

      //* Jika sudah memenuhi semua persyaratan di atas

      // mengenkripsi password
      mod.bcrypt.hash(data.password, 10, (err, encrypted) => {
        if (err) throw err;

        // Memasukkan account ke Database
        database.collections.Account.create(
          {
            username: data.username,
            password: encrypted,
          },
          (err, doc) => {
            if (err) throw err;
            console.log("\nREGISTER:\n", doc);

            res.send(
              `<script>
                alert("Akun berhasil dibuat!!!");
                window.location.href = "/login";
              </script>`
            );
          }
        );
      });
    });
  });
});

module.exports = router;
