import jwt from 'jsonwebtoken'
import userModel from '../models/user'
import {publicKey} from '../config'

export default {
  async login(username, password) {
    try {
      let user = await userModel.find({ where: { username: username } });
      console.log('user', user.username);
      if (!user) {
        return { code: 1, msg: '用户不存在' };
      } else if (user.password !== password) {
        return { code: 1, msg: '密码不正确' };
      } else {
        const token = jwt.sign({
          data: user,
          // 设置token过期时间
          exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, publicKey);
        return {
          code: 0,
          user: Object.assign(user, { token })
        };
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
