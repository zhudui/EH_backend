import fs from 'fs'
import path from 'path'
import shortId from 'shortid'

import uploadService from '../services/upload'

export default {
  async upload(ctx) {
    // 设置允许跨域的域名称
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

    // ----- 情况1：跨域时，先发送一个options请求，此处要返回200 -----
    if (ctx.method === 'OPTIONS') {
      console.log('options 请求时，返回 200')

      // 返回结果
      ctx.status = 200
      ctx.body = 'options OK'
      return
    }

    // ----- 情况2：发送post请求，上传文件 -----

    // 处理 request
    console.log('parse ok')

    console.log('ctx.request.body', ctx.request.body);

    let files = ctx.request.body.files;
    const { homeworkId } = ctx.request.body.fields;

    // 文件将要上传到哪个文件夹下面
    let uploadfolderpath = path.join(__dirname, '../../assets/uploads/' + homeworkId);

    // 如果文件夹不存在则创建文件夹
    if (!fs.existsSync(uploadfolderpath)) fs.mkdirSync(uploadfolderpath);

    // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
    let tempfilepath = files.file.path
    // 获取文件类型
    let type = files.file.type

    // 获取文件名，并根据文件名获取扩展名
    let filename = files.file.name
    let extname = filename.lastIndexOf('.') >= 0 ? filename.slice(filename.lastIndexOf('.') - filename.length) : ''
    // 文件名没有扩展名时候，则从文件类型中取扩展名
    if (extname === '' && type.indexOf('/') >= 0) {
      extname = '.' + type.split('/')[1]
    }
    // 将文件名重新赋值为一个随机数（避免文件重名）
    filename = shortId.generate() + extname

    // 构建将要存储的文件的路径
    let filenewpath = path.join(uploadfolderpath, filename)

    // 将临时文件保存为正式的文件
    try {
      fs.renameSync(tempfilepath, filenewpath)
      const data = {
        homeworkId: homeworkId,
        userId: ctx.state.jwtData.data.id,
        filePath: '/assets/uploads/' + homeworkId + '/' + filename
      }
      const oldFilePath = await uploadService.findOldFile(data.homeworkId, data.userId);
      // 如果该用户在该作业以前有提交过，删除该提交
      if (oldFilePath) {
        fs.unlinkSync(path.join(__dirname, '../..' + oldFilePath));
        // 更新upload记录
        await uploadService.updateUpload(data);
      } else {
        await uploadService.createUpload(data);
      }
      // 保存成功
      console.log('fs.rename done')
      ctx.body = {
        code: 0
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getFilePath(ctx) {
    try {
      const { body } = ctx.request;
      const data = await uploadService.getFilePath(body);
      ctx.body = data;
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  }
}
