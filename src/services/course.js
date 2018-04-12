import courseModel from '../models/course'
import userCourseModel from '../models/userCourse'

export default {
  async addCourse(courseData, userId) {
    try {
      let data = await courseModel.create(courseData);
      data.id = data.null;
      await userCourseModel.create({
        userId: userId,
        courseId: data.null
      });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },

  async getCourseList(userId) {
    try {
      const courseIds = await userCourseModel.findAll({
        attributes: ['courseId'],
        where: {
          userId: userId
        }
      });
      return await courseModel.findAll({
        where: {
          id: {
            $in: courseIds.map(data => data.courseId)
          }
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getCourseName(courseId) {
    try {
      return await courseModel.find({
        attributes: ['name'],
        where: {
          id: courseId
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
