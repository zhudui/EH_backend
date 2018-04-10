import homeworkModel from '../models/homework'

export default {
  async addHomework(homework) {
    try {
      let data = await homeworkModel.create(homework);
      data.id = data.null;
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },

  async getHomeworkList(classId) {
    try {
      return await homeworkModel.findAll({
        where: {
          classId: classId
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getHomeworkNameList(classId) {
    try {
      return await homeworkModel.findAll({
        attributes: ['id', 'name'],
        where: {
          classId: classId
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
