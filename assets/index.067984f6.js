import{a as ref,I as computed,o as openBlock,b as createElementBlock,f as createVNode,w as withCtx,i as unref,S as isRef,d as createBaseVNode,q as Form,U as UploadOutlined,h as createTextVNode,v as UploadDragger,B as Button,_ as __unplugin_components_2,x as __unplugin_components_3,y as __unplugin_components_4}from"./vendor.c1048036.js";/* empty css              *//* empty css               *//* empty css               */import{c as custom_upload,s as str2file,x as xml2obj}from"./strUtils.1410245a.js";import actionVue from"./action.47daf7f3.js";import configVue from"./config.58ba1f4f.js";import tableVue from"./table.0291435a.js";import{b as basename,e as extname}from"./path.215fc192.js";/* empty css               */import"./index.72361b6c.js";/* empty css              */const _hoisted_1={class:"example"},_hoisted_2=createBaseVNode("br",null,null,-1),_hoisted_3=createBaseVNode("p",null,"Click or drag file to this area to upload",-1),_hoisted_4=createTextVNode("Extract Souces"),_hoisted_5=createBaseVNode("p",null,"Click or drag file to this area to upload",-1),_hoisted_6=createTextVNode("Combine&Download"),_hoisted_7=createBaseVNode("br",null,null,-1),_sfc_main={setup(__props){const action=ref({searchVal:"",postFunc:'(s)=>s.replace(/id\\s*=\\s*\\"\\s*(\\d+)\\s*"/g, "id=\\"$1\\"")',test:do_test}),conf=ref({idName:"id",unitName:"trans-unit",srcName:"source",tgtName:"target"}),ignPats=ref(["SWITCH.*#"]),info={suffix:"-res"},map=ref([]),filterData=computed(()=>map.value.filter(o=>!action.value.searchVal||o.tgtText.indexOf(action.value.searchVal)!==-1||o.srcText.indexOf(action.value.searchVal)!==-1));function isIgnore(o){for(const e of ignPats.value)if(new RegExp(e).test(o))return!0;return!1}function jsonProc(jsonText){var o,e;var obj=JSON.parse(jsonText);let postFunc=action.value.postFunc?eval(action.value.postFunc):t=>t;for(const t of map.value)try{obj[t.id]&&(obj[t.id]=postFunc(obj[t.id])),isIgnore(t.srcText)?t.target.innerHTML=t.srcText:t.target.innerHTML=(o=obj[t.id])!=null?o:t.tgtText,t.newtgt=t.target.innerHTML,t.target.getAttribute("state")==="needs-translation"&&t.target.setAttribute("state","translated"),((e=t.unit)==null?void 0:e.getAttribute("m:confirmed"))==="0"&&t.unit.setAttribute("m:confirmed","1")}catch(n){console.log(n,t,isIgnore(t.srcText),obj[t.id])}}const upload_xliff=o=>{info.src=o.file.name,custom_upload(o,e=>map.value=xml2obj(info.xmlDoc=new DOMParser().parseFromString(e,"text/xml"),conf.value))},upload_target=o=>custom_upload(o,e=>jsonProc(e)),extract=()=>{const o={};for(const e of map.value)o[e.id]=e.srcText;str2file(JSON.stringify(o),"sources.json")},save=()=>str2file(new XMLSerializer().serializeToString(info.xmlDoc),basename(info.src,extname(info.src))+info.suffix+extname(info.src));function do_test(){console.log("info ",info),console.log("ignPats ",ignPats.value);let postFunc=action.value.postFunc?eval(action.value.postFunc):o=>o;console.log(typeof postFunc,postFunc,postFunc('test: id = " 3" abc'))}return(o,e)=>{const t=UploadDragger,n=Button,s=__unplugin_components_2,i=__unplugin_components_3,r=__unplugin_components_4,c=Form;return openBlock(),createElementBlock("div",_hoisted_1,[createVNode(actionVue,{action:action.value,"onUpdate:action":e[0]||(e[0]=a=>action.value=a)},null,8,["action"]),createVNode(configVue,{conf:conf.value,"onUpdate:conf":e[1]||(e[1]=a=>conf.value=a),ignPats:ignPats.value,"onUpdate:ignPats":e[2]||(e[2]=a=>ignPats.value=a)},null,8,["conf","ignPats"]),_hoisted_2,createVNode(c,{"label-col":{span:8},"wrapper-col":{span:16}},{default:withCtx(()=>[createVNode(r,null,{default:withCtx(()=>[createVNode(i,{span:12},{default:withCtx(()=>[createVNode(s,{label:"XLIFF/XML"},{default:withCtx(()=>[createVNode(t,{accept:".xliff, .mxliff, text/xml",customRequest:upload_xliff,maxCount:1},{default:withCtx(()=>[createVNode(unref(UploadOutlined)),_hoisted_3]),_:1}),createVNode(n,{onClick:extract},{default:withCtx(()=>[_hoisted_4]),_:1})]),_:1})]),_:1}),createVNode(i,{span:12},{default:withCtx(()=>[createVNode(s,{label:"JSON"},{default:withCtx(()=>[createVNode(t,{accept:".json, application/JSON",customRequest:upload_target,maxCount:1},{default:withCtx(()=>[createVNode(unref(UploadOutlined)),_hoisted_5]),_:1}),createVNode(n,{onClick:save},{default:withCtx(()=>[_hoisted_6]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),_hoisted_7,createVNode(tableVue,{data:unref(filterData),"onUpdate:data":e[3]||(e[3]=a=>isRef(filterData)?filterData.value=a:null)},null,8,["data"])])}}};export{_sfc_main as default};
