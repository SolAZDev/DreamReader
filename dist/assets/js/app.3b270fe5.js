(function(e){function t(t){for(var r,i,c=t[0],s=t[1],l=t[2],u=0,d=[];u<c.length;u++)i=c[u],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(t);while(d.length)d.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==o[s]&&(r=!1)}r&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a=[];function i(e){return c.p+"assets/js/"+({about:"about"}[e]||e)+"."+{about:"742631d7"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var a,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=i(e);var l=new Error;a=function(t){s.onerror=s.onload=null,clearTimeout(u);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}o[e]=void 0}};var u=setTimeout((function(){a({type:"timeout",target:s})}),12e4);s.onerror=s.onload=a,document.head.appendChild(s)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/DreamReader/dist/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var f=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),o=n.n(r);o.a},9349:function(e,t,n){},"9c0c":function(e,t,n){},cd05:function(e){e.exports=JSON.parse("{}")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("0cdd");var r=n("2b0e"),o=n("5f5b");n("ab8b"),n("2dd8");r["default"].use(o["a"]);var a=n("4a7a"),i=n.n(a);r["default"].component("v-select",i.a);var c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("b-navbar",{attrs:{type:"dark",variant:"info"}},[n("b-navbar-brand",[e._v("Dream Reader")])],1),n("div",{staticClass:"container",attrs:{stye:"margin-top:20px;"}},[n("router-view")],1)],1)},s=[],l=(n("5c0b"),n("2877")),u={},f=Object(l["a"])(u,c,s,!1,null,null,null),d=f.exports,p=n("9483");Object(p["a"])("".concat("/DreamReader/dist/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("d3b7");var b=n("8c4f"),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-select",{attrs:{label:"symbol",options:e.paginated,filterable:!1},on:{open:e.onOpen,close:e.onClose,search:function(t){return e.search=t},input:e.SelectSymbol},scopedSlots:e._u([e.hasNextPage?{key:"list-footer",fn:function(){return[n("li",{ref:"load",staticClass:"loader"},[e._v("Loading more symbols")])]},proxy:!0}:null],null,!0)}),n("div",{staticClass:"container"},[null!=e.ActiveSymbol?n("div",{staticStyle:{"margin-top":"20px"}},[n("h6",[e._v("Dream Symbol")]),n("h4",[e._v(e._s(e.ActiveSymbol.symbol))]),n("h6",[e._v("Meanings")]),e._l(e.ActiveSymbol.meanings,(function(t){return n("p",[e._v(e._s(t)+".text-justify")])}))],2):e._e()])],1)},h=[],m=(n("4de4"),n("caad"),n("fb6a"),n("b0c0"),n("ac1f"),n("2532"),n("841c"),n("3835")),y=(n("96cf"),n("1da1")),g=n("d4ec"),w=n("bee2"),O=n("2caf"),S=n("262e"),j=n("9ab4"),k=n("60a3"),_=n("cd05"),x=function(e){Object(S["a"])(n,e);var t=Object(O["a"])(n);function n(){var e;return Object(g["a"])(this,n),e=t.apply(this,arguments),e.name="Home",e.metaInfo={title:"DreamReader"},e}return Object(w["a"])(n,[{key:"data",value:function(){return{Symbols:[],AllSymbols:[],ActiveSymbol:null,observer:null,limit:25,search:""}}},{key:"mounted",value:function(){this.$data.observer=new IntersectionObserver(this.infiniteScroll)}},{key:"created",value:function(){var e=this;console.log("At least this works."),this.$data.AllSymbols=new Array,_["forEach"]((function(t){e.$data.AllSymbols.push(t)}))}},{key:"SelectSymbol",value:function(e){console.log("Chose "+JSON.stringify(e)),this.$data.ActiveSymbol=this.$data.AllSymbols.filter((function(t){return t==e}))[0]}},{key:"onOpen",value:function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.hasNextPage){e.next=4;break}return e.next=3,this.$nextTick();case 3:this.$data.observer.observe(this.$refs.load);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onClose",value:function(){this.$data.observer.disconnect()}},{key:"infiniteScroll",value:function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(t){var n,r,o,a,i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=Object(m["a"])(t,1),r=n[0],o=r.isIntersecting,a=r.target,!o){e.next=8;break}return i=a.offsetParent,c=a.offsetParent.scrollTop,this.$data.limit+=25,e.next=7,this.$nextTick();case 7:i.scrollTop=c;case 8:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"filtered",get:function(){var e=this;return this.$data.AllSymbols.filter((function(t){return t.symbol.includes(e.$data.search)}))}},{key:"paginated",get:function(){return this.filtered.slice(0,this.$data.limit)}},{key:"hasNextPage",get:function(){return this.paginated.length<this.filtered.length}}]),n}(k["b"]);x=Object(j["a"])([k["a"]],x);var $=x,A=$,P=(n("ea1c"),Object(l["a"])(A,v,h,!1,null,null,null)),C=P.exports,E=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},R=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h5",[e._v("Symbol")]),n("p",[e._v("symbol descrioption")])])}],T=function(e){Object(S["a"])(n,e);var t=Object(O["a"])(n);function n(){return Object(g["a"])(this,n),t.apply(this,arguments)}return n}(k["b"]);T=Object(j["a"])([k["a"]],T);var N=T,D=N,M=Object(l["a"])(D,E,R,!1,null,null,null),J=M.exports;r["default"].use(b["a"]);var I=[{path:"/",name:"Home",component:C},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/symbol/:id",name:"Symbol",component:J}],L=new b["a"]({mode:"history",base:"/DreamReader/dist/",routes:I}),q=L,F=n("2f62");r["default"].use(F["a"]);var H=new F["a"].Store({state:{},mutations:{},actions:{},modules:{}});r["default"].config.productionTip=!1,new r["default"]({router:q,store:H,render:function(e){return e(d)}}).$mount("#app")},ea1c:function(e,t,n){"use strict";var r=n("9349"),o=n.n(r);o.a}});
//# sourceMappingURL=app.3b270fe5.js.map