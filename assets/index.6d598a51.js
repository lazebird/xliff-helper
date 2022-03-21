import{r as l,o as u,c as v,a as E,u as b,b as d,d as p,F as j,e as w,f as x,p as L,g as R,w as O,h as A,t as I,n as P,i as V,j as k,k as T,l as D,A as H}from"./vendor.a70cb874.js";const z=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}};z();const C={setup(e){var r;const{pkg:o}={pkg:{name:"@lazebird/jtools",version:"0.1.9",keywords:["vue","vue3","vite","xliff","xml","i18n","solitaire"],author:"lazebird",license:"MIT",bugs:{url:"https://github.com/lazebird/jtools/issues"},homepage:"https://github.com/lazebird/jtools",files:["dist"],main:"./dist/jtools.umd.js",module:"./dist/jtools.es.js",exports:{".":{import:"./dist/jtools.es.js",require:"./dist/jtools.umd.js"}},private:!1,scripts:{dev:"vite",build:"vue-tsc --noEmit && vite build",demo:"vue-tsc --noEmit && vite build --mode demo",preview:"vite preview","lint:eslint":'eslint --cache --max-warnings 0  "{src,mock}/**/*.{vue,ts,tsx}" --fix',"lint:prettier":'prettier --write  "src/**/*.{js,json,tsx,css,less,scss,vue,html,md}"',"lint:stylelint":'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',"lint:lint-staged":"lint-staged -c ./.husky/lintstagedrc.js"},dependencies:{"@ant-design/icons-vue":"^6.1.0","@zip.js/zip.js":"^2.4.7","ant-design-vue":"3.1.0-rc.2",vue:"^3.2.31","vue-router":"^4.0.14"},devDependencies:{"@types/node":"^17.0.18","@typescript-eslint/eslint-plugin":"^5.12.0","@typescript-eslint/parser":"^5.12.0","@vitejs/plugin-vue":"^2.2.0","@vue/compiler-sfc":"^3.2.31","cz-conventional-changelog":"3.3.0",eslint:"^8.9.0","eslint-define-config":"^1.2.5","eslint-plugin-vue":"^8.4.1",husky:"^7.0.4",typescript:"^4.5.5","unplugin-vue-components":"^0.17.18",vite:"^2.8.3","vue-eslint-parser":"^8.2.0","vue-tsc":"^0.29.8"},config:{commitizen:{path:"./node_modules/cz-conventional-changelog"}}},lastBuildTime:"3/21/2022, 11:10:52 AM"};return document.title=(r=o.name)!=null?r:"Hello World!",(i,t)=>{const s=l("RouterView");return u(),v(s)}}};var N=(e,o)=>{const r=e.__vccOpts||e;for(const[i,t]of o)r[i]=t;return r};const S=e=>(L("data-v-0dd7aa06"),e=e(),R(),e),$={class:"nav"},B=S(()=>p("label",null,"Navigator:",-1)),q={class:"body"},F={setup(e){const o=E(h.getRoutes().filter(i=>i.path!=="/")),r=b();return(i,t)=>{const s=l("router-link"),n=l("router-view");return u(),d("div",null,[p("div",$,[B,(u(!0),d(j,null,w(o.value,a=>(u(),v(s,{to:a.path,class:P(["item",a.path===V(r).path?"active":""])},{default:O(()=>[A(I(a.name),1)]),_:2},1032,["to","class"]))),256))]),p("div",q,[x(n)])])}}};var W=N(F,[["__scopeId","data-v-0dd7aa06"]]);const M="modulepreload",_={},K="./",c=function(o,r){return!r||r.length===0?o():Promise.all(r.map(i=>{if(i=`${K}${i}`,i in _)return;_[i]=!0;const t=i.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${s}`))return;const n=document.createElement("link");if(n.rel=t?"stylesheet":M,t||(n.as="script",n.crossOrigin=""),n.href=i,document.head.appendChild(n),t)return new Promise((a,y)=>{n.addEventListener("load",a),n.addEventListener("error",y)})})).then(()=>o())},m={"../views/about.vue":()=>c(()=>import("./about.fa63bd55.js"),["assets/about.fa63bd55.js","assets/about.17400b6b.css","assets/vendor.a70cb874.js"]),"../views/i18nHelper.vue":()=>c(()=>import("./i18nHelper.532007ee.js"),["assets/i18nHelper.532007ee.js","assets/i18nHelper.ed08a75a.css","assets/vendor.a70cb874.js","assets/strUtils.7244e7cd.js"]),"../views/solitaireCount/count.vue":()=>c(()=>import("./count.8351256c.js"),["assets/count.8351256c.js","assets/count.92d280a4.css","assets/vendor.a70cb874.js"]),"../views/solitaireCount/index.vue":()=>c(()=>import("./index.5a7beeb9.js"),["assets/index.5a7beeb9.js","assets/index.98e0cda6.css","assets/vendor.a70cb874.js","assets/layout.6314d20a.js","assets/layout.c0ac7169.css","assets/count.8351256c.js","assets/count.92d280a4.css","assets/stat.7d025ad6.js","assets/stat.8ba3a29e.css"]),"../views/solitaireCount/layout.vue":()=>c(()=>import("./layout.6314d20a.js"),["assets/layout.6314d20a.js","assets/layout.c0ac7169.css","assets/vendor.a70cb874.js"]),"../views/solitaireCount/stat.vue":()=>c(()=>import("./stat.7d025ad6.js"),["assets/stat.7d025ad6.js","assets/stat.8ba3a29e.css","assets/vendor.a70cb874.js"]),"../views/uriHelper/config.vue":()=>c(()=>import("./config.0020e59d.js"),["assets/config.0020e59d.js","assets/config.a2b2970e.css","assets/vendor.a70cb874.js"]),"../views/uriHelper/index.vue":()=>c(()=>import("./index.8e67cab6.js"),["assets/index.8e67cab6.js","assets/vendor.a70cb874.js","assets/config.0020e59d.js","assets/config.a2b2970e.css","assets/strUtils.7244e7cd.js","assets/path.215fc192.js"]),"../views/xliffHelper/action.vue":()=>c(()=>import("./action.f8b44cda.js"),["assets/action.f8b44cda.js","assets/action.48036dc7.css","assets/vendor.a70cb874.js"]),"../views/xliffHelper/config.vue":()=>c(()=>import("./config.9602083e.js"),["assets/config.9602083e.js","assets/config.ffeaaf81.css","assets/vendor.a70cb874.js"]),"../views/xliffHelper/index.vue":()=>c(()=>import("./index.42c08041.js"),["assets/index.42c08041.js","assets/index.fa528d19.css","assets/vendor.a70cb874.js","assets/action.f8b44cda.js","assets/action.48036dc7.css","assets/config.9602083e.js","assets/config.ffeaaf81.css","assets/table.bc4c68c1.js","assets/table.d37ca16b.css","assets/strUtils.7244e7cd.js","assets/path.215fc192.js"]),"../views/xliffHelper/table.vue":()=>c(()=>import("./table.bc4c68c1.js"),["assets/table.bc4c68c1.js","assets/table.d37ca16b.css","assets/vendor.a70cb874.js"])},U=e=>e.match(/\/views\/[^\/]+\.vue/)||e.match(/index\.vue/),Y=e=>e.replace(/.*\/views\//,"/").replace(/\/index\.vue/,"").replace(/\.vue/,""),G=e=>e.replace(/.*\//,""),f=[];for(const e in m){if(!U(e))continue;const o=Y(e),r=G(o);f.push({path:o,name:r,component:m[e]})}const J=[],Q=(e,o)=>e.name==="about"?1:-1,X=[{path:"/",name:"Home",component:W,children:[...J,...f].sort(Q)}],h=k({history:T(),routes:X});function Z(e){e.use(h)}const g=D(C);Z(g);g.use(H).mount("#app");export{N as _};