import{o as d,b as p,F as v,e as g,n as V,t as I,p as J,g as w,d as _,a as b,J as h,f as i,w as m,i as x,x as O,v as B}from"./vendor.150b2b91.js";/* empty css               */import{_ as D}from"./index.78116fb3.js";import F from"./layout.70589c13.js";import j from"./count.91b5c1ad.js";import C from"./stat.90f5db22.js";/* empty css               *//* empty css              */const L=a=>(J("data-v-00cd70ee"),a=a(),w(),a),U=L(()=>_("br",null,null,-1)),$={props:{data:{type:Array,required:!0}},setup(a){return(t,r)=>(d(),p("table",null,[(d(!0),p(v,null,g(a.data,(c,l)=>(d(),p("tr",{key:l},[(d(!0),p(v,null,g(c,(e,o)=>{var n;return d(),p("td",{key:o,class:V(e.class)},I((n=e.content)!=null?n:e),3)}),128)),U]))),128))]))}};var q=D($,[["__scopeId","data-v-00cd70ee"]]);function S(a,t){if(typeof a!="object")return t.push(a);for(let r in a)S(a[r],t);return t}function z(a,t){const r=[...a],c=[...t];for(const l in c){const e=r.findIndex(o=>o===t[l]);e<0||(c[l]=void 0,r.splice(e,1))}return c.filter(l=>l)}const A=_("br",null,null,-1),E=_("br",null,null,-1),G=_("br",null,null,-1),X={setup(a){const t=b({names:[]}),r=b([]),c=h(()=>{const e=JSON.parse(JSON.stringify(r.value)),o=t.value.names.map(n=>n.fmt);for(let n of e)for(let u in n)n[u]={class:o.includes(n[u])?"green":"red",content:n[u]};return e}),l=h(()=>{let e=[];S(r.value,e);const o=t.value.names.map(s=>s.fmt),n=z(e,o),u=n.filter(s=>e.includes(s)),f=t.value.names.filter(s=>u.includes(s.fmt)).map(s=>s.org),k=n.filter(s=>!u.includes(s)).map(s=>{var y;return(y=t.value.names.find(N=>N.fmt===s))==null?void 0:y.org});return{total:e.length,count:t.value.names.length,unknown:JSON.stringify(k),dup:JSON.stringify(f)}});return(e,o)=>{const n=B,u=O;return d(),p(v,null,[i(u,null,{default:m(()=>[i(n,{span:12},{default:m(()=>[i(F,{data:r.value,"onUpdate:data":o[0]||(o[0]=f=>r.value=f)},null,8,["data"])]),_:1}),i(n,{span:12},{default:m(()=>[i(j,{data:t.value,"onUpdate:data":o[1]||(o[1]=f=>t.value=f)},null,8,["data"])]),_:1})]),_:1}),A,E,i(q,{data:x(c)},null,8,["data"]),G,i(C,{data:x(l)},null,8,["data"])],64)}}};export{X as default};
