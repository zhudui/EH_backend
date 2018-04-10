import KoaRouter from 'koa-router'
import uploadController from '../controllers/upload'

const router = new KoaRouter();

router.prefix('/api');

router.post('/upload', uploadController.upload)
  .post('/getFilePath', uploadController.getFilePath)

export default router
