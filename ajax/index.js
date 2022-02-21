const requireApi = require.context('.', true, /.js$/);
/*
一个webpack的api,
通过执行require.context函数获取一个特定的上下文,
主要用来实现自动化导入模块,在前端工程中,
如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,
它会遍历文件夹中的指定文件,然后自动导入,
使得不需要每次显式的调用import导入模块

*/
const module = {};
requireApi.keys().forEach((key) => {
	if(key === './index.js' || key === './api/request.js'){
		return;
	}
	Object.assign(module, requireApi(key));
})

export default module;