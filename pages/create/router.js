const mod = {
  express: require("express"),
  query: require("querystring"),
};
const database = require("../../database/note-app");

const router = mod.express.Router();

router.get("/create", (req, res) => {
  res.render(`${__dirname}/create.ejs`);
});

router.post("/create", (req, res) => {
  req.on("data", (chunk) => {
    const data = mod.query.parse(String(chunk));

    // Memasukkan ke Database
    database.collections.Note.create(
      {
        user__id: req.session.user__id,
        title: data.title,
        content: data.content,
      },
      (err, note) => {
        if (err) throw err;
        res.send(
          `<script>
          alert("Catatan berhasil dibuat!!!");
          document.location.href = "/";
        </script>`
        );
      }
    );
  });
});

router.get("/create/style.css", (req, res) => {
  res.sendFile(`${__dirname}/style.css`);
});

module.exports = router;
