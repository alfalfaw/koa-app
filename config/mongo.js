// config/mongo.js
const mongoose = require("mongoose");
const options = {
  autoReconnect: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// username 数据库用户名
// password 数据库密码
// localhost 数据库ip
// dbname 数据库名称
const url = "mongodb://localhost:27017/koa-test";

// module.exports = {
//   connect: () => {
//     mongoose.connect(url, options);
//     let db = mongoose.connection;
//     db.on("error", console.error.bind(console, "连接错误:"));
//     db.once("open", () => {
//       console.log("mongodb connect suucess");
//     });
//   },
// };

module.exports = {
  // 返回promise
  connect: async () => await mongoose.connect(url, options),

  // async connect(params) {
  //   await mongoose.connect(url, options);
  // },
};
