if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>n(e,a),o={module:{uri:a},exports:t,require:r};s[a]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-946f13af"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Checklist.jpg",revision:"4e5a06c9b7c220bc5bc01923c8fbc04e"},{url:"/_next/static/chunks/109-8e06794af5bb2c83.js",revision:"8e06794af5bb2c83"},{url:"/_next/static/chunks/235-148f658580a46fa1.js",revision:"148f658580a46fa1"},{url:"/_next/static/chunks/342-b9eb138fe49663a4.js",revision:"b9eb138fe49663a4"},{url:"/_next/static/chunks/564-7c4294e57e08b496.js",revision:"7c4294e57e08b496"},{url:"/_next/static/chunks/675-c5d5dd3f6b8011bd.js",revision:"c5d5dd3f6b8011bd"},{url:"/_next/static/chunks/740-986bd3c7e63d2e5d.js",revision:"986bd3c7e63d2e5d"},{url:"/_next/static/chunks/903-f5dd8e2ba4f18826.js",revision:"f5dd8e2ba4f18826"},{url:"/_next/static/chunks/framework-4556c45dd113b893.js",revision:"4556c45dd113b893"},{url:"/_next/static/chunks/main-572b913902beb9f3.js",revision:"572b913902beb9f3"},{url:"/_next/static/chunks/pages/_app-0b59c9e771b16762.js",revision:"0b59c9e771b16762"},{url:"/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js",revision:"a4ba2246ff8fb532"},{url:"/_next/static/chunks/pages/accepted-1fd17ca8b1e912e6.js",revision:"1fd17ca8b1e912e6"},{url:"/_next/static/chunks/pages/admins-5a896adc2eb94ecb.js",revision:"5a896adc2eb94ecb"},{url:"/_next/static/chunks/pages/done-e5522d3f375e7e2f.js",revision:"e5522d3f375e7e2f"},{url:"/_next/static/chunks/pages/form-4e668d4bbe7dbe52.js",revision:"4e668d4bbe7dbe52"},{url:"/_next/static/chunks/pages/index-b085682632ebe5db.js",revision:"b085682632ebe5db"},{url:"/_next/static/chunks/pages/register-2722de7bbd67d034.js",revision:"2722de7bbd67d034"},{url:"/_next/static/chunks/pages/signIn-e3bcfc3462933d81.js",revision:"e3bcfc3462933d81"},{url:"/_next/static/chunks/polyfills-0d1b80a048d4787e.js",revision:"40ccea369337cec877151c906f22814d"},{url:"/_next/static/chunks/webpack-df4cf1c8d23aa877.js",revision:"df4cf1c8d23aa877"},{url:"/_next/static/css/8efd6f1efe070b3e.css",revision:"8efd6f1efe070b3e"},{url:"/_next/static/css/f696bca4acb4fffa.css",revision:"f696bca4acb4fffa"},{url:"/_next/static/pd7g3urkmJAryG6Sur59s/_buildManifest.js",revision:"c7d40742a2c6b7d1d2e445fb25c65ed7"},{url:"/_next/static/pd7g3urkmJAryG6Sur59s/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/apple-touch-icon.png",revision:"09dea167578df9681d48c694d2eba3fa"},{url:"/default_background.jpg",revision:"c957967b51522ab48ae949bf3d11a1ed"},{url:"/empty-folder.png",revision:"843e50ca94b0b2c422cacb7c0523b963"},{url:"/favicon.ico",revision:"8501bd13370ebf3efca33919703f302c"},{url:"/icons/icon-192x192.png",revision:"6f98446e667310c7677ee302e324a7fa"},{url:"/icons/icon-256x256.png",revision:"f89d8f26ad861a984ba8def27e8b35e0"},{url:"/icons/icon-384x384.png",revision:"17062b2d23f766ab76d99b05558a3bf5"},{url:"/icons/icon-512x512.png",revision:"8f08ac1bdfcb4e4cd1005d165fc685cc"},{url:"/icons/maskable_icon.png",revision:"84f4af6c1adff46ebd7bc42468b485ad"},{url:"/manifest.json",revision:"7bfd89dc875705416f2622ac34acc6d1"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
