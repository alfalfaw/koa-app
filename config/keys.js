// module.exports = {
//   mongoURI:
//     "mongodb+srv://zyu:limu12345@cloud-ztyqv.mongodb.net/test?retryWrites=true&w=majority",
// };
module.exports = {
  mongoURI: "mongodb://localhost:27017/koa-test",
  secretOrKey: process.env.KAO_TEST_KEY || "secret",
};
