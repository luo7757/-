(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat"],{"353a":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r("084b"),a={name:"uniDateformat",props:{date:{type:[Object,String,Number],default:function(){return"-"}},locale:{type:String,default:"zh"},threshold:{type:Array,default:function(){return[0,0]}},format:{type:String,default:"yyyy/MM/dd hh:mm:ss"},refreshRate:{type:[Number,String],default:0}},data:function(){return{refreshMark:0}},computed:{dateShow:function(){return this.refreshMark,(0,n.friendlyDate)(this.date,{locale:this.locale,threshold:this.threshold,format:this.format})}},watch:{refreshRate:{handler:function(){this.setAutoRefresh()},immediate:!0}},methods:{refresh:function(){this.refreshMark++},setAutoRefresh:function(){var t=this;clearInterval(this.refreshInterval),this.refreshRate&&(this.refreshInterval=setInterval((function(){t.refresh()}),parseInt(this.refreshRate)))}}};e.default=a},c0c6:function(t,e,r){"use strict";r.r(e);var n=r("e702e"),a=r("c867");for(var u in a)"default"!==u&&function(t){r.d(e,t,(function(){return a[t]}))}(u);var f,i=r("f0c5"),s=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],f);e["default"]=s.exports},c867:function(t,e,r){"use strict";r.r(e);var n=r("353a"),a=r.n(n);for(var u in n)"default"!==u&&function(t){r.d(e,t,(function(){return n[t]}))}(u);e["default"]=a.a},e702e:function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return a})),r.d(e,"c",(function(){return u})),r.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat-create-component',
    {
        'uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c0c6"))
        })
    },
    [['uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat-create-component']]
]);
