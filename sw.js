if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let o={};const t=e=>n(e,d),c={module:{uri:d},exports:o,require:t};i[d]=Promise.all(s.map((e=>c[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"c948f84bd41d1d3ddad29a824f00c96a"},{url:"assets/index-CAbnypIq.js",revision:null},{url:"assets/index-D5tN6cUT.css",revision:null},{url:"index.html",revision:"49687f9a1142c7b804bd52d905cbd1d1"},{url:"registerSW.js",revision:"480ea1dc555c01d316a8c734267854e7"},{url:"logo192.png",revision:"346f00f1d4f13ca66c2d8bf1bc677cd7"},{url:"logo512.png",revision:"52c734d93ce21e9bac3efcb63c209181"},{url:"manifest.webmanifest",revision:"4dd1223723f8dca9ea140fb6115798bf"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
