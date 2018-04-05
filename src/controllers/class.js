import classService from '../services/class'

export default {
  async addClass(ctx) {
    try {
      const { body } = ctx.request;
      const userId = ctx.state.jwtData.data.id;
      const data = await classService.addClass(body, userId);
      ctx.body = {
        code: 0,
        classData: data
      };
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getClassList(ctx) {
    try {
      const userId = ctx.state.jwtData.data.id;
      const classList = await classService.getClassList(userId);
      ctx.body = {
        code: 0,
        classList: classList
      };
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  }
}
