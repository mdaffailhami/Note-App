/**
 * @author [Muhammad Daffa Ilhami]
 * @email [mdaffailhami@gmail.com]
 * @create date 2021-02-04 | 19:53:22
 * @modify date 2021-02-06 | 21:21:16
 * @desc [description]
 */

const mod = {
  express: require("express"),
  session: require("express-session"),
};

const routers = {
  index: require("./pages/index/router.js"),
  login: require("./pages/login/router"),
  register: require("./pages/register/router.js"),
  create: require("./pages/create/router.js"),
  update: require("./pages/update/router.js"),
};

const database = require("./database/note-app.js");
const app = mod.express();

// Session
app.use(
  mod.session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.use((req,res,next)=>{
  if (req.protocol != 'https') {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
})
// Routes
app.use(routers.index);
app.use(routers.login);
app.use(routers.register);
app.use(routers.create);
app.use(routers.update);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log("Server is running on port ", PORT));
