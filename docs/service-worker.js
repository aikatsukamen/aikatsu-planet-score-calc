if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const o={uri:location.origin+r.slice(1)};return Promise.all(i.map((r=>{switch(r){case"exports":return s;case"module":return o;default:return e(r)}}))).then((e=>{const r=n(...e);return s.default||(s.default=r),s}))})))}}define("./service-worker.js",["./workbox-a7bb3469"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"favicon.ico",revision:"ada50a01184d8e31fb61c68d2b88f8d9"},{url:"index.html",revision:"08e49633e35ce0d7e7beda656f84d81e"},{url:"logo128.png",revision:"1e731a13d411e9218f0da9d0756087ce"},{url:"logo512.png",revision:"1f5a708ba174d7b7a6a045ebeb84585a"},{url:"main.js",revision:"cd5b881c61c79a8aa62e354178b33572"},{url:"manifest.json",revision:"1e3d8aa874b4d6b417f4cf7ac7f2a503"}],{}),e.registerRoute(/.*aikatsu.com\/.*/,new e.CacheFirst({cacheName:"cdn-s3",plugins:[new e.ExpirationPlugin({maxEntries:1e3,maxAgeSeconds:2592e3,purgeOnQuotaError:!0}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
