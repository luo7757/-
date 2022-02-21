'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {

  const version = await db.collection('version').get()

  //返回数据给客户端
  return {
    code: 0,
    data: {
			version: version.data[0].current_version,
			// 地址可以通过数据库存储获取 
      downLoadLinkUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-4cf0c298-741e-4904-8128-f0af77f11801/34bc4182-af05-45fe-9c75-a86206c834fb.apk'
    }
  }
};
