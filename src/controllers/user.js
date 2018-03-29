import userService from '../services/user'

export default {
  async login(ctx) {
    const { body } = ctx.request;
    try {
      const data = await userService.login(body.username, body.password);
      if (data.code === 0) { // 登陆成功
        console.log('data', data.user);
        ctx.body = {
          code: 0,
          user: data.user
        };
      } else { // 登录失败
        ctx.status = 401;
        ctx.body = {
          code: 1,
          msg: data.msg
        }
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  }
}
