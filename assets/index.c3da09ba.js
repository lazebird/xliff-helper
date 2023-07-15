import{a as ref,I as computed,o as openBlock,b as createElementBlock,f as createVNode,i as unref,d as createBaseVNode}from"./vendor.c1048036.js";import inputVue from"./input.15a85c16.js";import codeVue from"./code.f17ace6c.js";import outputVue from"./output.6f3306f8.js";/* empty css               */import"./index.72361b6c.js";const _hoisted_1={style:{margin:"20px"}},_hoisted_2=createBaseVNode("br",null,null,-1),_hoisted_3=createBaseVNode("br",null,null,-1),_sfc_main={setup(__props){const input=ref({name:"Input",content:""}),code=ref({name:"Code",content:`
  (str) => { 
    const lines = str.replace('\\r', '').split('\\n').filter(l=>l.length);
    if (lines.length & 1) return "length error: "+ lines.length; 
    const chunks = [];
    for (var i = 0, len = lines.length; i < len; i += 2) chunks.push(lines.slice(i, i+2));
    const obj = {};
    for (var [id, str] of chunks) obj[id.replace('msgid', '').trim()] = str.replace('msgstr', '').trim();
    var result = '';
    for (const k of Object.keys(obj).sort()) result += k + ',' + obj[k] + '\\r\\n';
    return result;
}
`}),output=computed(()=>{try{const parser=eval(code.value.content);return typeof parser=="function"?{content:parser(input.value.content)}:{content:"code is not a valid function!",class:"error"}}catch(o){return{content:o.toString(),class:"error"}}});return(o,e)=>(openBlock(),createElementBlock("div",_hoisted_1,[createVNode(inputVue,{data:input.value,"onUpdate:data":e[0]||(e[0]=t=>input.value=t)},null,8,["data"]),_hoisted_2,createVNode(codeVue,{data:code.value,"onUpdate:data":e[1]||(e[1]=t=>code.value=t)},null,8,["data"]),_hoisted_3,createVNode(outputVue,{data:unref(output)},null,8,["data"])]))}};export{_sfc_main as default};
