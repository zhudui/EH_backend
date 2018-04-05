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
  }
}
