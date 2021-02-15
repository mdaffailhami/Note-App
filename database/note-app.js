const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGOOSE_CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Database terkoneksi!!!");
  }
);

// Collections

const Account = mongoose.model(
  "accounts",
  new mongoose.Schema({
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  })
);

const Note = mongoose.model(
  "notes",
  new mongoose.Schema({
    user__id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  })
);

module.exports = {
  collections: {
    Account,
    Note,
  },
};

// const mongoose = require("mongoose");

// const connection = () => {
//   return mongoose.connect(
//     `mongodb+srv://daffa-ilhami:7jfegpsRVmwtosk1@cluster0.wuxkd.mongodb.net/note-app?retryWrites=true&w=majority`,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err) => {
//       if (err) throw err;
//       console.log("Database terkoneksi!!!");
//     }
//   );
// };

// const collection = () => {
//   return mongoose.model(
//     "users",
//     new mongoose.Schema({
//       note: {
//         type: String,
//         required: true,
//       },
//     })
//   );
// };

// module.exports = {
//   connection,
//   collection,
// };
