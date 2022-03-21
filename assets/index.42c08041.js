import{a as ref,s as computed,r as resolveComponent,o as openBlock,b as createElementBlock,f as createVNode,w as withCtx,i as unref,y as isRef,p as pushScopeId,g as popScopeId,d as createBaseVNode}from"./vendor.a70cb874.js";import actionVue from"./action.f8b44cda.js";import configVue from"./config.9602083e.js";import tableVue from"./table.bc4c68c1.js";import{b as blob2obj,x as xml2obj,s as str2file}from"./strUtils.7244e7cd.js";import{b as basename,e as extname}from"./path.215fc192.js";import{_ as _export_sfc}from"./index.6d598a51.js";var index_vue_vue_type_style_index_0_scoped_true_lang="";const _withScopeId=t=>(pushScopeId("data-v-8a492cc8"),t=t(),popScopeId(),t),_hoisted_1={class:"example"},_hoisted_2=_withScopeId(()=>createBaseVNode("br",null,null,-1)),_hoisted_3=_withScopeId(()=>createBaseVNode("label",null,"XLIFF/XML ",-1)),_hoisted_4=_withScopeId(()=>createBaseVNode("br",null,null,-1)),_hoisted_5=_withScopeId(()=>createBaseVNode("br",null,null,-1)),_hoisted_6=_withScopeId(()=>createBaseVNode("label",null,"JSON ",-1)),_hoisted_7=_withScopeId(()=>createBaseVNode("br",null,null,-1)),_sfc_main={setup(__props){const action=ref({searchVal:"",postFunc:'(s)=>s.replace(/id\\s*=\\s*\\"\\s*(\\d+)\\s*"/g, "id=\\"$1\\"")'}),conf=ref({idName:"id",unitName:"trans-unit",srcName:"source",tgtName:"target"}),ignPats=ref(["SWITCH.*#"]),info={suffix:"-res"},map=ref([]),filterData=computed(()=>map.value.filter(t=>!action.value.searchVal||t.tgtText.indexOf(action.value.searchVal)!==-1||t.srcText.indexOf(action.value.searchVal)!==-1));function isIgnore(t){for(const e of ignPats.value)if(new RegExp(e).test(t))return!0;return!1}function jsonProc(jsonText){var t;var obj=JSON.parse(jsonText);let postFunc=action.value.postFunc?eval(action.value.postFunc):e=>e;for(const e of map.value)try{obj[e.id]&&(obj[e.id]=postFunc(obj[e.id])),isIgnore(e.srcText)?e.target.innerHTML=e.srcText:e.target.innerHTML=(t=obj[e.id])!=null?t:e.tgtText,e.newtgt=e.target.innerHTML,e.target.getAttribute("state")==="needs-translation"&&e.target.setAttribute("state","translated"),e.unit.getAttribute("m:confirmed")==="0"&&e.unit.setAttribute("m:confirmed","1")}catch(a){console.log(a,e,isIgnore(e.srcText),obj[e.id])}}const upload_xliff=t=>{info.src=t.target.files[0].name,blob2obj(t.target.files[0],e=>map.value=xml2obj(info.xmlDoc=new DOMParser().parseFromString(e.target.result,"text/xml"),conf.value))},upload_target=t=>blob2obj(t.target.files[0],e=>jsonProc(e.target.result)),extract=()=>{const t={};for(const e of map.value)t[e.id]=e.srcText;str2file(JSON.stringify(t),"sources.json")},save=()=>str2file(new XMLSerializer().serializeToString(info.xmlDoc),basename(info.src,extname(info.src))+info.suffix+extname(info.src));function do_test(){console.log("info ",info),console.log("ignPats ",ignPats.value);let postFunc=action.value.postFunc?eval(action.value.postFunc):t=>t;console.log(typeof postFunc,postFunc,postFunc('test: id = " 3" abc'))}return(t,e)=>{const a=resolveComponent("a-col"),n=resolveComponent("a-row");return openBlock(),createElementBlock("div",_hoisted_1,[createVNode(actionVue,{action:action.value,"onUpdate:action":e[0]||(e[0]=o=>action.value=o)},null,8,["action"]),createVNode(configVue,{conf:conf.value,"onUpdate:conf":e[1]||(e[1]=o=>conf.value=o),ignPats:ignPats.value,"onUpdate:ignPats":e[2]||(e[2]=o=>ignPats.value=o)},null,8,["conf","ignPats"]),_hoisted_2,createVNode(n,null,{default:withCtx(()=>[createVNode(a,{span:8},{default:withCtx(()=>[_hoisted_3,createBaseVNode("input",{type:"file",onChange:upload_xliff,accept:".xliff, .mxliff, text/xml"},null,32)]),_:1}),createVNode(a,{span:8},{default:withCtx(()=>[createVNode(n,{class:"btnrow"},{default:withCtx(()=>[createBaseVNode("button",{onClick:extract},"Extract Souces")]),_:1}),_hoisted_4,createVNode(n,{class:"btnrow"},{default:withCtx(()=>[createBaseVNode("button",{onClick:save},"Save")]),_:1}),_hoisted_5,createVNode(n,{class:"btnrow"},{default:withCtx(()=>[createBaseVNode("button",{onClick:do_test},"Test")]),_:1})]),_:1}),createVNode(a,{span:8},{default:withCtx(()=>[_hoisted_6,createBaseVNode("input",{type:"file",onChange:upload_target,accept:".json, application/JSON"},null,32)]),_:1})]),_:1}),_hoisted_7,createVNode(tableVue,{data:unref(filterData),"onUpdate:data":e[3]||(e[3]=o=>isRef(filterData)?filterData.value=o:null)},null,8,["data"])])}}};var index=_export_sfc(_sfc_main,[["__scopeId","data-v-8a492cc8"]]);export{index as default};