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

  async getHomeworkList(courseId) {
    try {
      return await homeworkModel.findAll({
        where: {
          courseId: courseId
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getHomeworkNameList(courseId) {
    try {
      return await homeworkModel.findAll({
        attributes: ['id', 'name'],
        where: {
          courseId: courseId
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
