import userModel from '../models/user'
import userCourseModel from '../models/userCourse'
import uploadModel from '../models/upload'
import sequelize from '../lib/sequelize'
import bcrypt from 'bcrypt'

export default {
  async login(username, password) {
    try {
      let user = await userModel.find({ where: { username: username } });
      if (!user) {
        return { code: 1, msg: '用户不存在' };
      } else if (await !bcrypt.compare(user.password, password)) {
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
  },

  async addUser(user) {
    try {
      user.password = await bcrypt.hash(user.password, 5);
      const foundUser = await userModel.find({ where: { username: user.username } });
      if (!foundUser) {
        const createUser = await userModel.create(user);
        if (createUser) {
          return { code: 0 }
        }
        return { code: 1, msg: '创建用户失败' };
      } else {
        return { code: 1, msg: '用户名已存在' };
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  async getAllUser() {
    try {
      return await sequelize.query(
        'SELECT `username`, `fullname`, `email`, `role` FROM `user`', { model: userModel });
    } catch (err) {
      throw new Error(err);
    }
  },

  async editUserByAdmin(user) {
    try {
      await userModel.update(user, {
        where: {
          username: user.username
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async deleteUserByUsername(username) {
    try {
      await userModel.destroy({ where: { username: username } });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getCourseUserList(courseId, onlyStudent) {
    try {
      const userIds = await userCourseModel.findAll({
        attributes: ['userId'],
        where: {
          courseId: courseId
        }
      });
      console.log('userIds', userIds);
      if (onlyStudent) {
        return await userModel.findAll({
          attributes: { exclude: ['password'] },
          where: {
            id: {
              $in: userIds.map(data => data.userId)
            },
            role: 'student'
          }
        });
      }
      return await userModel.findAll({
        attributes: { exclude: ['password'] },
        where: {
          id: {
            $in: userIds.map(data => data.userId)
          }
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async addCourseUser(data) {
    try {
      const foundUser = await userModel.find({ where: { username: data.username } });
      if (!foundUser) {
        return {
          code: 1,
          msg: '用户名不存在，请重新输入或联系管理员添加用户'
        }
      } else {
        console.log('foundUser', foundUser);
        await userCourseModel.create({
          userId: foundUser.id,
          courseId: data.courseId
        });
        return {
          code: 0,
          courseUser: foundUser
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  async deleteUserCourse(data) {
    try {
      await userCourseModel.destroy({
        where: {
          userId: data.userId,
          courseId: data.courseId
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getUploadUserList(homework) {
    try {
      const uploads = await uploadModel.findAll({
        attributes: ['userId', 'filePath'],
        where: {
          homeworkId: homework.homeworkId
        }
      });
      const userList = await userModel.findAll({
        attributes: ['id', 'username', 'fullname'],
        where: {
          id: {
            $in: uploads.map(data => data.userId)
          }
        }
      });
      return {
        uploads: uploads,
        userList: userList
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
