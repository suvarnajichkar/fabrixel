if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>s(e,o),d={module:{uri:o},exports:t,require:c};i[o]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"c948f84bd41d1d3ddad29a824f00c96a"},{url:"assets/index-CcU6hJFS.css",revision:null},{url:"assets/index-Cp3-9t9J.js",revision:null},{url:"index.html",revision:"9ea98fc4c973fe79f2b535e20f2d5f69"},{url:"registerSW.js",revision:"480ea1dc555c01d316a8c734267854e7"},{url:"logo192.png",revision:"346f00f1d4f13ca66c2d8bf1bc677cd7"},{url:"logo512.png",revision:"52c734d93ce21e9bac3efcb63c209181"},{url:"manifest.webmanifest",revision:"4dd1223723f8dca9ea140fb6115798bf"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
