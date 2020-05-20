const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
// passport 实现许多站点的登录方式
const passport = require("koa-passport");
// 实例化
const app = new Koa();
const router = new Router();

// 使用bodyparser,通过ctx.request.body可以取到请求的内容
app.use(bodyParser());

// 引入users中的路由
const users = require("./routes/api/users");

// 配置用户路由地址，第一个参数是路由前缀
router.use("/api/users", users);

// // 路由
// router.get("/", async (ctx) => {
//   ctx.body = {
//     msg: "Hello Koa",
//   };
// });

const mongoConf = require("./config/mongo");
mongoConf
  .connect()
  .then(() => {
    console.log("-------*******--------");
    console.log("数据库已经链接");
    console.log("-------*******--------");
  })
  .catch((err) => {
    console.log(err);
  });

// passport
app.use(passport.initialize());
app.use(passport.session());

// 引入passport文件并且传递一个参数 passport
require("./config/passport")(passport);

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listen on ${port}`);
});
