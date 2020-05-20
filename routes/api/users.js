const Router = require("koa-router");
const router = new Router();
// 全球公认头像
const gravatar = require("gravatar");
// 引入User
const User = require("../../models/User");
// 引入工具类
const tools = require("../../config/tools");
// 加密
const bcrypt = require("bcryptjs");
// token
const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../../config/keys");
const passport = require("koa-passport");

// 引入input验证
const {
  validateLoginInput,
  validateRegisterInput,
} = require("../../validation/input");

// 如何打出下面的注释，先输入( / )再输入两个星号( ** )
/**
 * @route GET api/users/test
 * @desc 测试接口地址
 * @access 所有人均可访问
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    msg: "users",
  };
});

/**
 * @route POST api/users/register
 * @desc 注册
 * @access 所有人均可访问
 */
router.post("/register", async (ctx) => {
  const { email, password, name } = ctx.request.body;

  // 验证注册表单
  const { errors, isValid } = validateRegisterInput(ctx.request.body);

  // 判断是否验证通过 400表示请求无效
  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  //  查找是否已经存在该邮箱
  const findResult = await User.findOne({ email: email });

  if (findResult) {
    ctx.status = 400;
    ctx.body = {
      msg: "邮箱已经注册",
    };
  } else {
    // 获取全球公认头像
    const avater = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const newUser = new User({
      name,
      email,
      password: tools.enbcrypt(password),
      avater,
    });
    // console.log(newUser);
    // 存储到数据库
    await newUser
      .save()
      .then((user) => {
        ctx.status = 201;
        ctx.body = user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

/**
 * @route POST api/users/login
 * @desc 登录 返回token
 * @access 所有人均可以访问
 */
router.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body;
  // 验证登陆表单
  const { errors, isValid } = validateLoginInput(ctx.request.body);

  // 判断是否验证通过 400表示请求无效
  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  // 查询
  const findResult = await User.findOne({ email });
  // 判断用户是否存在
  if (!findResult) {
    ctx.status = 404;
    ctx.body = {
      msg: "用户不存在",
    };
  } else {
    // 查询成功后验证密码
    const result = bcrypt.compareSync(password, findResult.password);

    // 验证通过
    if (result) {
      // to do 返回token

      const payload = {
        _id: findResult._id,
        name: findResult.name,
        avater: findResult.avater,
      };
      const token = jwt.sign(payload, secretOrKey, { expiresIn: 3600 });
      ctx.status = 201;
      ctx.body = {
        msg: "登录成功",
        token: "Bearer " + token,
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        msg: "登录失败",
      };
    }
  }
});

/**
 * @route GET api/users/profile
 * @desc 获取用户资料
 * @access 用户个人或管理员访问
 */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    ctx.body = ctx.state.user;
  }
);
// 执行这条命令路由才会生效
module.exports = router.routes();
