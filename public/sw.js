if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>n(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"3b90d471c624f5612a46925be8d8ddec"},{url:"/_next/static/chunks/27-77a681604887b178.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/596-90851e4e77ea5ab9.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/758-44f92b021e3c75d3.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/936-49cacb92ae780f70.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/app/layout-af506b03bd7b3015.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/app/page-fbfe6849228575dc.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/app/user/%5Bid%5D/page-3172b5885a2a929b.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/fd9d1056-0e0a4cde8d2e1ee2.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/main-678f71bfdcdb5f31.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/main-app-4d322da8243df1d9.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/pages/_app-52924524f99094ab.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/pages/_error-c92d5c4bb2b49926.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-8cb55284b7e29ed9.js",revision:"hIsn1cxG8BRBNqzEQ0pOu"},{url:"/_next/static/css/8ae167fed09460bf.css",revision:"8ae167fed09460bf"},{url:"/_next/static/hIsn1cxG8BRBNqzEQ0pOu/_buildManifest.js",revision:"9398e4c00894b940f12c9ee80d3484b4"},{url:"/_next/static/hIsn1cxG8BRBNqzEQ0pOu/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/2aaf0723e720e8b9-s.p.woff2",revision:"e1b9f0ecaaebb12c93064cd3c406f82b"},{url:"/_next/static/media/9c4f34569c9b36ca-s.woff2",revision:"2c1fc211bf5cca7ae7e7396dc9e4c824"},{url:"/_next/static/media/ae9ae6716d4f8bf8-s.woff2",revision:"b0c49a041e15bdbca22833f1ed5cfb19"},{url:"/_next/static/media/b1db3e28af9ef94a-s.woff2",revision:"70afeea69c7f52ffccde29e1ea470838"},{url:"/_next/static/media/b967158bc7d7a9fb-s.woff2",revision:"08ccb2a3cfc83cf18d4a3ec64dd7c11b"},{url:"/_next/static/media/c0f5ec5bbf5913b7-s.woff2",revision:"8ca5bc1cd1579933b73e51ec9354eec9"},{url:"/_next/static/media/d1d9458b69004127-s.woff2",revision:"9885d5da3e4dfffab0b4b1f4a259ca27"},{url:"/apple-touch-icon.png",revision:"1eeac1ee077c33087e2fb3533fb61df4"},{url:"/favicon-16x16.png",revision:"827f78f1c2f0fe416f648538735559ba"},{url:"/favicon-32x32.png",revision:"b30cad67047fa4406e238d2f68ba84ab"},{url:"/favicon.ico",revision:"f0e8c378de524779e92f6cf495f1b609"},{url:"/icon-192x192.png",revision:"2c624a929da0895a9e512292c8d60274"},{url:"/icon-256x256.png",revision:"22c83ec31a4eba51a6537fcde2024412"},{url:"/icon-384x384.png",revision:"074b03da6d312a0e55c54ab3702bd762"},{url:"/icon-512x512.png",revision:"1862545290c37456f7fc801002c17893"},{url:"/manifest.json",revision:"3cc3c2e2c833f74d19169acae9fdad1b"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
