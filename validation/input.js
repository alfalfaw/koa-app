const Validator = require("validator");
const { isEmpty } = require("./is-empty");

module.exports = {
  // 验证登陆
  validateLoginInput(data) {
    let errors = {};
    //  访问对象上不存在的属性会返回undefined，调用Validator时会报错，需要将它们设置为空字符串
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isLength(data.password, { min: 5, max: 15 })) {
      errors.password = "密码长度不能小于5位且不能大于15位";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "密码不能为空";
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = "邮箱必须是合法的";
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "邮箱不能为空";
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  },

  // 验证注册
  validateRegisterInput(data) {
    console.log(data);

    let errors = {};
    //  访问对象上不存在的属性会返回undefined，调用Validator时会报错，需要将它们设置为空字符串
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    console.log(data.name);

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = "名字的长度不能小于两位且不能大于30位";
    }
    if (Validator.isEmpty(data.name)) {
      errors.name = "名字不能为空";
    }

    if (!Validator.isLength(data.password, { min: 5, max: 15 })) {
      errors.password = "密码长度不能小于5位且不能大于15位";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "密码不能为空";
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = "邮箱必须是合法的";
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "邮箱不能为空";
    }

    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "两次密码不一致";
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
};
