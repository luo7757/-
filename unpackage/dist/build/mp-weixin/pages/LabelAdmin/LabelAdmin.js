(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/LabelAdmin/LabelAdmin"],{"0803":function(t,e,n){"use strict";var i=n("805b"),r=n.n(i);r.a},"0e31":function(t,e,n){"use strict";(function(t){n("3002");i(n("66fd"));var e=i(n("e477"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},2595:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=u(n("a34a")),r=n("26cb");function u(t){return t&&t.__esModule?t:{default:t}}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function c(t,e,n,i,r,u,a){try{var o=t[u](a),s=o.value}catch(c){return void n(c)}o.done?e(s):Promise.resolve(s).then(i,r)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(i,r){var u=t.apply(e,n);function a(t){c(u,i,r,a,o,"next",t)}function o(t){c(u,i,r,a,o,"throw",t)}a(void 0)}))}}var f={name:"LabelAdmin",data:function(){return{isEdit:!1,labelIds:[]}},created:function(){this.isEdit=!1,this.labelIds=this.userInfo.label_ids},methods:{_updateLabel:function(){var e=this;return l(i.default.mark((function n(){var r,u;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.selfLabelList.map((function(t){return t._id})),n.next=3,e.$api.updateLabelIds({userId:e.userInfo._id,label_ids:r});case 3:u=n.sent,t.showToast({title:u.msg}),e.updateUserInfo(o(o({},e.userInfo),{},{label_ids:r}));case 6:case"end":return n.stop()}}),n)})))()},startEdit:function(){this.isEdit&&this._updateLabel(),this.isEdit=!this.isEdit},changeSelfLabelList:function(t){this.isEdit&&this.labelIds.push(t)},changeCommentLabelList:function(t){this.isEdit&&(this.labelIds=this.labelIds.filter((function(e){return e!==t})))}},computed:o(o({},(0,r.mapState)(["labelList"])),{},{selfLabelList:function(){var t=this;return this.labelList.filter((function(e){return t.labelIds.includes(e._id)}))},recommentLabelList:function(){var t=this;return this.labelList.filter((function(e){return!t.labelIds.includes(e._id)&&e._id}))}})};e.default=f}).call(this,n("543d")["default"])},"32f8":function(t,e,n){"use strict";n.r(e);var i=n("2595"),r=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=r.a},"805b":function(t,e,n){},"929c":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var i={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"0ca1"))}},r=function(){var t=this,e=t.$createElement;t._self._c},u=[]},e477:function(t,e,n){"use strict";n.r(e);var i=n("929c"),r=n("32f8");for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);n("0803");var a,o=n("f0c5"),s=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=s.exports}},[["0e31","common/runtime","common/vendor"]]]);