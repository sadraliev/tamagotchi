parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"lA8h":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.writeModal=exports.togglePoopBag=exports.modScene=exports.modFox=void 0;var e=exports.modFox=function(e){document.querySelector(".fox").className="fox fox-".concat(e)},o=exports.modScene=function(e){document.querySelector(".game").className="game ".concat(e)},t=exports.togglePoopBag=function(e){document.querySelector(".poop-bag").classList.toggle("hidden",!e)},c=exports.writeModal=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";document.querySelector(".modal").innerHTML='<div class="modal-inner">'.concat(e,"</div>")};
},{}],"iJA9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getNextPoopTime=exports.getNextHungerTime=exports.getNextDieTime=exports.TICK_RATE=exports.SCENES=exports.RAIN_CHANCE=exports.NIGHT_LENGTH=exports.ICONS=exports.DAY_LENGTH=void 0;var e=exports.TICK_RATE=2e3,t=exports.ICONS=["fish","poop","weather"],o=exports.SCENES=["day","rain"],r=exports.RAIN_CHANCE=.2,x=exports.DAY_LENGTH=20,p=exports.NIGHT_LENGTH=3,s=exports.getNextHungerTime=function(e){return Math.floor(3*Math.random())+5+e},N=exports.getNextDieTime=function(e){return Math.floor(2*Math.random())+3+e},i=exports.getNextPoopTime=function(e){return Math.floor(3*Math.random())+4+e};
},{}],"lPRR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleUserAction=exports.default=void 0;var e=require("./ui"),t=require("./constants"),i={current:"INIT",clock:1,wakeTime:-1,sleepTime:-1,hungryTime:-1,dieTime:-1,timeToStartCelebrating:-1,timeToEndCelebrating:-1,poopTime:-1,tick:function(){return this.clock++,console.log("clock",this.clock),this.clock===this.wakeTime?this.wake():this.clock===this.sleepTime?this.sleep():this.clock===this.hungryTime?this.getHungry():this.clock===this.dieTime?this.die():this.clock===this.timeToStartCelebrating?this.startCelebrating():this.clock===this.timeToEndCelebrating?this.endCelebrating():this.clock===this.poopTime&&this.poop(),this.clock},startGame:function(){console.log("hatching"),this.current="HATCHING",this.wakeTime=this.clock+3,(0,e.modFox)("egg"),(0,e.modScene)("day"),(0,e.writeModal)()},wake:function(){console.log("awoken"),this.current="IDLING",this.wakeTime=-1,this.scene=Math.random()>t.RAIN_CHANCE?0:1,(0,e.modScene)(t.SCENES[this.scene]),this.sleepTime=this.clock+t.DAY_LENGTH,this.hungryTime=(0,t.getNextHungerTime)(this.clock),this.determineFoxState()},sleep:function(){this.state="SLEEP",(0,e.modFox)("sleep"),(0,e.modScene)("night"),this.clearTimes(),this.wakeTime=this.clock+t.NIGHT_LENGTH},getHungry:function(){this.current="HUNGRY",this.dieTime=(0,t.getNextDieTime)(this.clock),this.hungryTime=-1,(0,e.modFox)("hungry")},die:function(){this.current="DEAD",(0,e.modScene)("dead"),(0,e.modFox)("dead"),this.cleanUpPoop(),(0,e.writeModal)("The fox died :( <br/> Press the middle button to start")},startCelebrating:function(){this.current="CELEBRATING",(0,e.modFox)("celebrate"),this.timeToStartCelebrating=-1,this.timeToEndCelebrating=this.clock+2},endCelebrating:function(){this.timeToEndCelebrating=-1,this.current="IDLING",this.determineFoxState(),(0,e.togglePoopBag)(!1)},determineFoxState:function(){"IDLING"===this.current&&("rain"===t.SCENES[this.scene]?(0,e.modFox)("rain"):(0,e.modFox)("idling"))},handleUserAction:function(e){if(!["SLEEP","FEEDING","CELEBRATING","HATCHING"].includes(this.current))if("INIT"!==this.current&&"DEAD"!==this.current)switch(e){case"weather":this.changeWeather();break;case"poop":this.cleanUpPoop();break;case"fish":this.feed()}else this.startGame()},changeWeather:function(){console.log("changeWeather"),this.scene=(1+this.scene)%t.SCENES.length,(0,e.modScene)(t.SCENES[this.scene]),this.determineFoxState()},feed:function(){console.log("feed"),"HUNGRY"===this.current&&(this.current="FEEDING",this.dieTime=-1,this.poopTime=(0,t.getNextPoopTime)(this.clock),(0,e.modFox)("eating"),this.timeToStartCelebrating=this.clock+2)},poop:function(){this.current="POOPING",this.poopTime=-1,this.dieTime=(0,t.getNextDieTime)(this.clock),(0,e.modFox)("pooping")},cleanUpPoop:function(){"POOPING"===this.current&&(this.dieTime=-1,(0,e.togglePoopBag)(!0),this.startCelebrating(),this.hungryTime=(0,t.getNextHungerTime)(this.clock))},clearTimes:function(){this.wakeTime=-1,this.sleepTime=-1,this.hungryTime=-1,this.dieTime=-1,this.poopTime=-1,this.timeToStartCelebrating=-1,this.timeToEndCelebrating=-1}},o=exports.handleUserAction=i.handleUserAction.bind(i),s=exports.default=i;
},{"./ui":"lA8h","./constants":"iJA9"}],"Vgpl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var t=require("./constants"),e=function(e,n){document.querySelector(".".concat(t.ICONS[e],"-icon")).classList.toggle("highlighted",n)};function n(n){var c=0;document.querySelector(".buttons").addEventListener("click",function(s){s.target.classList.contains("left-btn")?(e(c,!1),c=(2+c)%t.ICONS.length,e(c,!0)):s.target.classList.contains("right-btn")?(e(c,!1),c=(1+c)%t.ICONS.length,e(c,!0)):n(t.ICONS[c])})}
},{"./constants":"iJA9"}],"FyzG":[function(require,module,exports) {
"use strict";var t=i(require("./game-state")),r=require("./constants"),e=n(require("./buttons"));function n(t){return t&&t.__esModule?t:{default:t}}function o(t){if("function"!=typeof WeakMap)return null;var r=new WeakMap,e=new WeakMap;return(o=function(t){return t?e:r})(t)}function i(t,r){if(!r&&t&&t.__esModule)return t;if(null===t||"object"!=typeof t&&"function"!=typeof t)return{default:t};var e=o(r);if(e&&e.has(t))return e.get(t);var n={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in t)if("default"!==a&&{}.hasOwnProperty.call(t,a)){var u=i?Object.getOwnPropertyDescriptor(t,a):null;u&&(u.get||u.set)?Object.defineProperty(n,a,u):n[a]=t[a]}return n.default=t,e&&e.set(t,n),n}function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(){u=function(){return r};var t,r={},e=Object.prototype,n=e.hasOwnProperty,o=Object.defineProperty||function(t,r,e){t[r]=e.value},i="function"==typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",f=i.asyncIterator||"@@asyncIterator",l=i.toStringTag||"@@toStringTag";function s(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{s({},"")}catch(t){s=function(t,r,e){return t[r]=e}}function h(t,r,e,n){var i=r&&r.prototype instanceof w?r:w,a=Object.create(i.prototype),u=new T(n||[]);return o(a,"_invoke",{value:k(t,e,u)}),a}function p(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}r.wrap=h;var y="suspendedStart",v="suspendedYield",d="executing",g="completed",m={};function w(){}function b(){}function L(){}var x={};s(x,c,function(){return this});var E=Object.getPrototypeOf,_=E&&E(E(F([])));_&&_!==e&&n.call(_,c)&&(x=_);var O=L.prototype=w.prototype=Object.create(x);function j(t){["next","throw","return"].forEach(function(r){s(t,r,function(t){return this._invoke(r,t)})})}function P(t,r){function e(o,i,u,c){var f=p(t[o],t,i);if("throw"!==f.type){var l=f.arg,s=l.value;return s&&"object"==a(s)&&n.call(s,"__await")?r.resolve(s.__await).then(function(t){e("next",t,u,c)},function(t){e("throw",t,u,c)}):r.resolve(s).then(function(t){l.value=t,u(l)},function(t){return e("throw",t,u,c)})}c(f.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new r(function(r,o){e(t,n,r,o)})}return i=i?i.then(o,o):o()}})}function k(r,e,n){var o=y;return function(i,a){if(o===d)throw Error("Generator is already running");if(o===g){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var u=n.delegate;if(u){var c=S(u,n);if(c){if(c===m)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var f=p(r,e,n);if("normal"===f.type){if(o=n.done?g:v,f.arg===m)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(o=g,n.method="throw",n.arg=f.arg)}}}function S(r,e){var n=e.method,o=r.iterator[n];if(o===t)return e.delegate=null,"throw"===n&&r.iterator.return&&(e.method="return",e.arg=t,S(r,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=p(o,r.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,m;var a=i.arg;return a?a.done?(e[r.resultName]=a.value,e.next=r.nextLoc,"return"!==e.method&&(e.method="next",e.arg=t),e.delegate=null,m):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function G(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function N(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(G,this),this.reset(!0)}function F(r){if(r||""===r){var e=r[c];if(e)return e.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var o=-1,i=function e(){for(;++o<r.length;)if(n.call(r,o))return e.value=r[o],e.done=!1,e;return e.value=t,e.done=!0,e};return i.next=i}}throw new TypeError(a(r)+" is not iterable")}return b.prototype=L,o(O,"constructor",{value:L,configurable:!0}),o(L,"constructor",{value:b,configurable:!0}),b.displayName=s(L,l,"GeneratorFunction"),r.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===b||"GeneratorFunction"===(r.displayName||r.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,s(t,l,"GeneratorFunction")),t.prototype=Object.create(O),t},r.awrap=function(t){return{__await:t}},j(P.prototype),s(P.prototype,f,function(){return this}),r.AsyncIterator=P,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new P(h(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then(function(t){return t.done?t.value:a.next()})},j(O),s(O,l,"Generator"),s(O,c,function(){return this}),s(O,"toString",function(){return"[object Generator]"}),r.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=F,T.prototype={constructor:T,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!r)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var e=this;function o(n,o){return u.type="throw",u.arg=r,e.next=n,o&&(e.method="next",e.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),f=n.call(a,"finallyLoc");if(c&&f){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!f)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),m},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),N(e),m}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;N(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(r,e,n){return this.delegate={iterator:F(r),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=t),m}},r}function c(t,r,e,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void e(t)}u.done?r(c):Promise.resolve(c).then(n,o)}function f(t){return function(){var r=this,e=arguments;return new Promise(function(n,o){var i=t.apply(r,e);function a(t){c(i,n,o,a,u,"next",t)}function u(t){c(i,n,o,a,u,"throw",t)}a(void 0)})}}function l(){return s.apply(this,arguments)}function s(){return(s=f(u().mark(function n(){var o,i;return u().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:i=function(){var e=Date.now();o<=e&&(t.default.tick(),o=e+r.TICK_RATE),requestAnimationFrame(i)},console.log("starting game"),(0,e.default)(t.handleUserAction),o=Date.now(),requestAnimationFrame(i);case 5:case"end":return n.stop()}},n)}))).apply(this,arguments)}l();
},{"./game-state":"lPRR","./constants":"iJA9","./buttons":"Vgpl"}]},{},["FyzG"], null)
//# sourceMappingURL=init.ad1c1b2e.js.map