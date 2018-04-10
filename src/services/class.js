import classModel from '../models/class'
import userClassModel from '../models/userClass'

export default {
  async addClass(classData, userId) {
    try {
      let data = await classModel.create(classData);
      data.id = data.null;
      await userClassModel.create({
        userId: userId,
        classId: data.null
      });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },

  async getClassList(userId) {
    try {
      const classIds = await userClassModel.findAll({
        attributes: ['classId'],
        where: {
          userId: userId
        }
      });
      return await classModel.findAll({
        where: {
          id: {
            $in: classIds.map(data => data.classId)
          }
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getClassName(classId) {
    try {
      return await classModel.find({
        attributes: ['name'],
        where: {
          id: classId
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
