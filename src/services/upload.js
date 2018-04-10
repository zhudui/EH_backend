import uploadModel from '../models/upload'
//
export default {
  async findOldFile(homeworkId, userId) {
    try {
      const foundUpload = await uploadModel.find({
        where: {
          homeworkId: homeworkId,
          userId: userId
        }
      });
      return foundUpload ? foundUpload.filePath : false;
    } catch (err) {
      throw new Error(err);
    }
  },

  async createUpload(data) {
    try {
      await uploadModel.create(data);
    } catch (err) {
      throw new Error(err);
    }
  },

  async updateUpload(data) {
    try {
      await uploadModel.update({
        filePath: data.filePath
      }, {
        where: {
          homeworkId: data.homeworkId,
          userId: data.userId
        }
      })
    } catch (err) {
      throw new Error(err);
    }
  },

  async getFilePath(data) {
    try {
      const foundUpload = await uploadModel.find({
        where: {
          homeworkId: data.homeworkId,
          userId: data.userId
        }
      });
      if (foundUpload) {
        return {
          code: 0,
          filePath: foundUpload.filePath
        }
      } else {
        return {
          code: 1,
          msg: '你尚未提交作业，请先提交作业'
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
