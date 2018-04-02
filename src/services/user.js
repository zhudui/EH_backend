import userModel from '../models/user'

export default {
  async login(username, password) {
    try {
      let user = await userModel.find({ where: { username: username } });
      if (!user) {
        return { code: 1, msg: '用户不存在' };
      } else if (user.password !== password) {
        return { code: 1, msg: '密码不正确' };
      } else {
        return {
          code: 0,
          user: {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            role: user.role,
            email: user.email
          }
        };
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  async getUserInfoById(userId) {
    try {
      let user = await userModel.find({ where: { id: userId } });
      if (!user) {
        return { code: 1, msg: '用户不存在' };
      } else {
        return {
          code: 0,
          user: {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            role: user.role,
            email: user.email
          }
        };
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
