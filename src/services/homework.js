import homeworkModel from '../models/homework'
import userCourseModel from '../models/userCourse'
import uploadModel from '../models/upload'

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
      let homeworkList = await homeworkModel.findAll({
        where: {
          courseId: courseId
        }
      });
      let courseStudentNum = await userCourseModel.count({
        where: {
          courseId: courseId,
          userRole: null
        }
      });
      let uploadDataList = [];
      for (let i = 0; i < homeworkList.length; ++i) {
        let data = {};
        data.studentNum = courseStudentNum;
        data.submitNum = await uploadModel.count({
          where: {
            homeworkId: homeworkList[i].id,
            userRole: null
          }
        });
        uploadDataList.push(data);
      }
      return {
        homeworkList: homeworkList,
        uploadDataList: uploadDataList
      };
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
  },

  async getHomeworkName(homeworkId) {
    try {
      return await homeworkModel.find({
        attributes: ['name'],
        where: {
          id: homeworkId
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
