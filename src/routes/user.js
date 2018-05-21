import KoaRouter from 'koa-router'
import userController from '../controllers/user'

const router = new KoaRouter();

router.prefix('/api');

router.post('/login', userController.login)
  .post('/userInfo', userController.getUserInfo)
  .post('/logout', userController.logOut)
  .post('/addUser', userController.addUser)
  .get('/getAllUser', userController.getAllUser)
  .post('/editUserByAdmin', userController.editUserByAdmin)
  .delete('/user', userController.deleteUser)
  .get('/courseUserList', userController.getCourseUserList)
  .post('/addCourseUser', userController.addCourseUser)
  .delete('/userCourse', userController.deleteUserCourse)
  .post('/getUploadUserList', userController.getUploadUserList)
  .post('/changePassword', userController.changePassword)

export default router
