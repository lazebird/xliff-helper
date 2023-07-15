import{a as ref,I as computed,o as openBlock,b as createElementBlock,f as createVNode,i as unref,d as createBaseVNode}from"./vendor.c1048036.js";import inputVue from"./input.ce957f4e.js";import codeVue from"./code.3511ef92.js";import outputVue from"./output.273102f4.js";/* empty css               */import"./index.72361b6c.js";const _hoisted_1={style:{margin:"20px"}},_hoisted_2=createBaseVNode("br",null,null,-1),_hoisted_3=createBaseVNode("br",null,null,-1),_sfc_main={setup(__props){const input=ref({name:"Input",content:""}),code=ref({name:"Code",content:`
    (str) => { 
    const lines = str.replace('\\r', '').split('\\n').filter(l=>l.length);
    const chunks = lines.map(l=>l.split(','));
    const obj = {};
    for (var [id, str] of chunks) obj[id.trim()] = str.trim();
    var result = '';
    for (const k of Object.keys(obj).sort()) result += 'msgid ' + k + '\\r\\n' + 'msgstr ' + obj[k] + '\\r\\n\\r\\n';
    return result;
}
`}),output=computed(()=>{try{const parser=eval(code.value.content);return typeof parser=="function"?{content:parser(input.value.content)}:{content:"code is not a valid function!",class:"error"}}catch(o){return{content:o.toString(),class:"error"}}});return(o,t)=>(openBlock(),createElementBlock("div",_hoisted_1,[createVNode(inputVue,{data:input.value,"onUpdate:data":t[0]||(t[0]=e=>input.value=e)},null,8,["data"]),_hoisted_2,createVNode(codeVue,{data:code.value,"onUpdate:data":t[1]||(t[1]=e=>code.value=e)},null,8,["data"]),_hoisted_3,createVNode(outputVue,{data:unref(output)},null,8,["data"])]))}};export{_sfc_main as default};
