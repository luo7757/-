(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-self-self"],{"09b4":function(e,t,n){var a=n("e11b");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("81ecdd4a",a,!0,{sourceMap:!1,shadowMode:!1})},"1d1a":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}));var a={uniIcons:n("0ca1").default},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[e.userInfo?a("v-uni-view",{staticClass:"my-header"},[a("v-uni-view",{staticClass:"my-header-background"},[a("v-uni-image",{attrs:{src:e.userInfo.avatar,mode:"aspectFill"}})],1),a("v-uni-view",{staticClass:"my-header-logo",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.changeAvatar.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"my-header-logo-box"},[a("v-uni-image",{attrs:{src:e.userInfo.avatar,mode:"aspectFill"}})],1),a("v-uni-text",{staticClass:"user-name"},[e._v(e._s(e.userInfo.author_name))])],1),a("v-uni-view",{staticClass:"my-header-info"},[a("v-uni-view",{staticClass:"my-header-info-box"},[a("v-uni-text",{staticClass:"my-header-info-title"},[e._v("被关注")]),a("v-uni-text",[e._v(e._s(e.userInfo.follow_count))])],1),a("v-uni-view",{staticClass:"my-header-info-box"},[a("v-uni-text",{staticClass:"my-header-info-title"},[e._v("粉丝")]),a("v-uni-text",[e._v(e._s(e.userInfo.fans_count))])],1),a("v-uni-view",{staticClass:"my-header-info-box"},[a("v-uni-text",{staticClass:"my-header-info-title"},[e._v("积分")]),a("v-uni-text",[e._v(e._s(e.userInfo.integral_count?e.userInfo.integral_count:0))])],1)],1)],1):e._e(),a("v-uni-view",{staticClass:"my-content"},[e.userInfo?e._e():a("v-uni-view",{staticClass:"my-content-list",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goLoginPage.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"my-content-list-title"},[a("v-uni-image",{staticClass:"company-logo",attrs:{src:n("6c9c"),mode:"aspectFill"}}),a("v-uni-text",[e._v("HI，您尚未登录,请点击登录")])],1),a("uni-icons",{attrs:{type:"arrowright",size:"14",color:"#666"}})],1),a("v-uni-view",{staticClass:"my-content-list"},[a("v-uni-view",{staticClass:"my-content-list-title",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.myArticle.apply(void 0,arguments)}}},[a("uni-icons",{staticClass:"icons",attrs:{type:"contact",size:"16",color:"#666"}}),a("v-uni-text",[e._v("我的文章")])],1),a("uni-icons",{attrs:{type:"arrowright",size:"14",color:"#666"}})],1),a("v-uni-view",{staticClass:"my-content-list",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goFeedbackPage.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"my-content-list-title"},[a("uni-icons",{staticClass:"icons",attrs:{type:"help",size:"16",color:"#666"}}),a("v-uni-text",[e._v("意见反馈")])],1),a("uni-icons",{attrs:{type:"arrowright",size:"14",color:"#666"}})],1),e.userInfo?a("v-uni-button",{staticClass:"sign-out",attrs:{type:"warn"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.siginOut.apply(void 0,arguments)}}},[e._v("退出")]):e._e()],1)],1)},r=[]},"4d46":function(e,t,n){"use strict";n.r(t);var a=n("6341"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},"50ff":function(e,t,n){"use strict";n.r(t);var a=n("1d1a"),i=n("4d46");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("ec4d");var o,s=n("f0c5"),c=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"bc5918e6",null,!1,a["a"],o);t["default"]=c.exports},6341:function(e,t,n){"use strict";(function(e){var a=n("4ea4");n("baa5"),n("d3b7"),n("25f0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("5530"));n("96cf");var r=a(n("1da1")),o={data:function(){return{haveNewVersion:!1,currentVersion:"1.0.0"}},methods:{siginOut:function(){this.$store.commit("updateUserInfo",null),uni.navigateTo({url:"/pages/index/index"})},goLoginPage:function(){uni.navigateTo({url:"/pages/userInfo/login/login"})},myArticle:function(){uni.navigateTo({url:"/pages/myAarticle/myAarticle"})},goFeedbackPage:function(){uni.navigateTo({url:"/pages/feedBack/feedBack"})},changeAvatar:function(){var e=this;uni.chooseImage({count:1,success:function(){var t=(0,r.default)(regeneratorRuntime.mark((function t(n){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e._uploadFile(n.tempFilePaths[0],n.tempFiles[0].name||Date.now().toString()+n.tempFilePaths[0].substr(n.tempFilePaths[0].lastIndexOf(".")));case 2:return a=t.sent,t.next=5,e._updateUserAvatar(a);case 5:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}()})},_uploadFile:function(t,n){return(0,r.default)(regeneratorRuntime.mark((function a(){var i,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.uploadFile({filePath:t,cloudPath:n});case 2:return i=a.sent,r=i.fileID,a.abrupt("return",r);case 5:case"end":return a.stop()}}),a)})))()},_updateUserAvatar:function(e){var t=this;return(0,r.default)(regeneratorRuntime.mark((function n(){var a,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$api.changeAvatar({userId:t.userInfo._id,filePath:e});case 2:a=n.sent,r=a.msg,uni.showToast({title:r,icon:"none"}),t.updateUserInfo((0,i.default)((0,i.default)({},t.userInfo),{},{avatar:e}));case 6:case"end":return n.stop()}}),n)})))()}}};t.default=o}).call(this,n("a9ff")["default"])},"6c9c":function(e,t,n){e.exports=n.p+"static/img/1.da47b5c0.jpg"},e11b:function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 添加一个flex布局的混编方法 */\r\n/* 全局系统样式定义 */uni-page-body[data-v-bc5918e6]{background-color:#f5f5f5}.my-header[data-v-bc5918e6]{position:relative;padding-bottom:%?30?%}.my-header .my-header-background[data-v-bc5918e6]{position:absolute;top:0;right:0;left:0;bottom:0;opacity:.3;-webkit-filter:blur(%?32?%);filter:blur(%?32?%)}.my-header .my-header-background uni-image[data-v-bc5918e6]{width:100%;height:100%}.my-header .my-header-logo[data-v-bc5918e6]{display:flex;align-items:center;justify-content:flex-start;flex-wrap:nowrap;flex-direction:column;align-items:center;padding-top:%?60?%;position:relative;z-index:10}.my-header .my-header-logo .my-header-logo-box[data-v-bc5918e6]{width:%?120?%;height:%?120?%;border-radius:50%;overflow:hidden}.my-header .my-header-logo .my-header-logo-box uni-image[data-v-bc5918e6]{width:100%;height:100%}.my-header .my-header-logo .user-name[data-v-bc5918e6]{margin-top:%?30?%;font-size:%?32?%;font-weight:700}.my-header .my-header-info[data-v-bc5918e6]{margin-top:%?30?%;display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;flex-direction:row}.my-header .my-header-info .my-header-info-box[data-v-bc5918e6]{width:100%;display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;flex-direction:column;font-size:%?24?%;color:#999}.my-header .my-header-info .my-header-info-box .my-header-info-title[data-v-bc5918e6]{font-size:%?28?%;color:#333}.my-content .my-content-list[data-v-bc5918e6]{display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;flex-direction:row;padding:%?30?%;margin-bottom:%?20?%;background-color:#fff;color:#333;font-size:%?28?%}.my-content .my-content-list .my-content-list-title[data-v-bc5918e6]{display:flex;align-items:center;flex-grow:1\r\n  /*版本样式 */}.my-content .my-content-list .my-content-list-title .icons[data-v-bc5918e6]{margin-right:%?10?%}.my-content .my-content-list .my-content-list-title .version-container[data-v-bc5918e6]{display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;flex-direction:row;flex-grow:1}.my-content .my-content-list .my-content-list-title .version-container .version[data-v-bc5918e6]{margin-right:%?40?%;color:#888;font-weight:700}.my-content .my-content-list .my-content-list-title .version-container .new-version-tip[data-v-bc5918e6]{font-size:%?20?%;color:#f25037}.my-content .sign-out[data-v-bc5918e6]{margin:%?120?% %?20?% 0}.my-content .company-logo[data-v-bc5918e6]{width:%?100?%;height:%?100?%;border-radius:50%;margin-right:%?40?%}body.?%PAGE?%[data-v-bc5918e6]{background-color:#f5f5f5}',""]),e.exports=t},ec4d:function(e,t,n){"use strict";var a=n("09b4"),i=n.n(a);i.a}}]);