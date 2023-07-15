import{a as ref,L as computed,o as openBlock,b as createElementBlock,f as createVNode,i as unref,d as createBaseVNode}from"./vendor.58b05717.js";import inputVue from"./input.bd281e5e.js";import codeVue from"./code.ffc37695.js";import outputVue from"./output.cfe07332.js";/* empty css               */import"./index.f545be85.js";const _hoisted_1={style:{margin:"20px"}},_hoisted_2=createBaseVNode("br",null,null,-1),_hoisted_3=createBaseVNode("br",null,null,-1),_sfc_main={setup(__props){const input=ref({name:"Input",content:""}),options=[{name:"prettier",value:"(n) => { const o = JSON.parse(n); return JSON.stringify(o, null, 4); }"},{name:"po2csv",value:`
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
      `},{name:"csv2po",value:`
        (str) => {
          const lines = str.replace('\\r', '').split('\\n').filter(l=>l.length);
          const chunks = lines.map(l=>l.split(','));
          const obj = {};
          for (var [id, str] of chunks) obj[id.trim()] = str.trim();
          var result = '';
          for (const k of Object.keys(obj).sort()) result += 'msgid ' + k + '\\r\\n' + 'msgstr ' + obj[k] + '\\r\\n\\r\\n';
          return result;
        }
        `}],code=ref({name:"Code",options,content:options[0].value}),output=computed(()=>{try{const parser=eval(code.value.content);return typeof parser=="function"?{content:parser(input.value.content)}:{content:"code is not a valid function!",class:"error"}}catch(r){return{content:r.toString(),class:"error"}}});return(r,t)=>(openBlock(),createElementBlock("div",_hoisted_1,[createVNode(inputVue,{data:input.value,"onUpdate:data":t[0]||(t[0]=e=>input.value=e)},null,8,["data"]),_hoisted_2,createVNode(codeVue,{data:code.value,"onUpdate:data":t[1]||(t[1]=e=>code.value=e)},null,8,["data"]),_hoisted_3,createVNode(outputVue,{data:unref(output)},null,8,["data"])]))}};export{_sfc_main as default};
