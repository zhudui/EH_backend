import Koa2 from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static2'
import path from 'path'
import process from 'process'

// router
import userRoutes from './routes/user'
import courseRoutes from './routes/course'
import homeworkRoutes from './routes/homework'
import uploadRoutes from './routes/upload'
import reviewRoutes from './routes/review'

import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
import ErrorRoutes from './routes/error-routes'
import jwt from 'koa-jwt'
import fs from 'fs'
// import PluginLoader from './lib/PluginLoader'

const app = new Koa2()
const env = process.env.NODE_ENV || 'development' // Current mode

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))

app
  .use((ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
      ctx.set('Access-Control-Allow-Origin', '*')
    } else {
      ctx.set('Access-Control-Allow-Origin', '*') // 允许所有访问
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    return next()
  })
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(jwt({ secret: publicKey, cookie: 'token', key: 'jwtData' })
    .unless({ path: [/^\/public|\/api\/login|\/assets/] }))
  .use(KoaBody({
    multipart: true,
    strict: false,
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  }))
  // .use(PluginLoader(SystemConfig.System_plugin_path))
  .use(userRoutes.routes(), userRoutes.allowedMethods())
  .use(courseRoutes.routes(), courseRoutes.allowedMethods())
  .use(homeworkRoutes.routes(), homeworkRoutes.allowedMethods())
  .use(uploadRoutes.routes(), uploadRoutes.allowedMethods())
  .use(reviewRoutes.routes(), reviewRoutes.allowedMethods())
  .use(ErrorRoutes())

if (env === 'development') { // logger
  app.use((ctx, next) => {
    const start = new Date();
    return next().then(() => {
      const ms = new Date() - start;
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}

let port = (function () {
  if (typeof (process.argv[2]) !== 'undefined') { // 如果输入了端口号，则提取出来
    if (isNaN(process.argv[2])) { // 如果端口号不为数字，提示格式错误
      throw new Error('Please write a correct port number.');
    } else { // 如果端口号输入正确，将其应用到端口
      return process.argv[2]
    }
  } else { // 如果未输入端口号，则使用下面定义的默认端口
    return 3000
  }
})();

app.listen(port)

console.log('Now start API server on port ' + port)

export default app
