import userService from '../services/user'
import { publicKey, System } from '../config'
import jwt from 'jsonwebtoken'

export default {
  async login(ctx) {
    try {
      console.log('process.env.NODE_ENV', process.env.NODE_ENV);
      const { body } = ctx.request;
      const data = await userService.login(body.username, body.password);
      if (data.code === 0) { // 登陆成功
        // 设置cookie
        ctx.cookies.set(
          'token',
          jwt.sign({
            data: {
              id: data.user.id,
              role: data.user.role
            }
          }, publicKey, {
            // 设置token过期时间为1天
            expiresIn: '24h'
          }),
          {
            maxAge: 60 * 60 * 24 * 1000,
            httpOnly: false,
            domain: process.env.NODE_ENV === 'development' ? System.API_server_host : System.NGINX_server_host
          }
        );
        ctx.body = {
          code: 0,
          user: data.user
        };
      } else { // 登录失败
        ctx.body = {
          code: 1,
          msg: data.msg
        }
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getUserInfo(ctx) {
    try {
      const userId = ctx.state.jwtData.data.id;
      const data = await userService.getUserInfoById(userId);
      if (data.code === 0) {
        ctx.body = {
          code: 0,
          user: data.user
        }
      } else {
        ctx.status = 401;
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async logOut(ctx) {
    try {
      ctx.cookies.set(
        'token',
        jwt.sign({
          data: ctx.state.jwtData.data
        }, publicKey, {
          expiresIn: 0
        }),
        {
          maxAge: 0 // 使cookie失效
        }
      );
      ctx.body = {
        code: 0
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async addUser(ctx) {
    try {
      const { body } = ctx.request;
      const data = await userService.addUser(body);
      console.log('data', data);
      ctx.body = data;
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getAllUser(ctx) {
    try {
      if (ctx.state.jwtData.data.role !== 'admin') {
        ctx.status = 401;
      } else {
        const data = await userService.getAllUser();
        ctx.body = {
          code: 0,
          userList: data
        }
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async editUserByAdmin(ctx) {
    try {
      if (ctx.state.jwtData.data.role !== 'admin') {
        ctx.status = 401;
      } else {
        const { body } = ctx.request;
        await userService.editUserByAdmin(body);
        ctx.body = {
          code: 0
        }
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async deleteUser(ctx) {
    try {
      if (ctx.state.jwtData.data.role !== 'admin') {
        ctx.status = 401;
      } else {
        const { body } = ctx.request;
        await userService.deleteUserByUsername(body.username);
        ctx.body = {
          code: 0
        }
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getCourseUserList(ctx) {
    try {
      if (ctx.state.jwtData.data.role !== 'teacher' && ctx.state.jwtData.data.role !== 'ta') {
        ctx.status = 401;
      } else {
        const { courseId, onlyStudent } = ctx.query;
        const courseUserList = await userService.getCourseUserList(courseId, onlyStudent);
        ctx.body = {
          code: 0,
          courseUserList: courseUserList
        }
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async addCourseUser(ctx) {
    try {
      const { body } = ctx.request;
      const data = await userService.addCourseUser(body);
      ctx.body = data;
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async deleteUserCourse(ctx) {
    try {
      const { body } = ctx.request;
      await userService.deleteUserCourse(body);
      ctx.body = {
        code: 0
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getUploadUserList(ctx) {
    try {
      const { body } = ctx.request;
      const data = await userService.getUploadUserList(body);
      ctx.body = {
        code: 0,
        uploads: data.uploads,
        userList: data.userList
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async changePassword(ctx) {
    try {
      const { body } = ctx.request;
      const data = await userService.changePassword(body);
      ctx.body = data;
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  }
}
