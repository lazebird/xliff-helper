import{_ as _export_sfc,f as ref,z as computed,o as openBlock,c as createElementBlock,d as createVNode,a as createBaseVNode}from"./index.8667b681.js";import inputVue from"./input.eba2c827.js";import codeVue from"./code.82a6221d.js";import outputVue from"./output.e4884e69.js";/* empty css               */const _hoisted_1={style:{margin:"20px"}},_hoisted_2=createBaseVNode("br",null,null,-1),_hoisted_3=createBaseVNode("br",null,null,-1),_sfc_main={__name:"index",setup(__props){const input=ref({name:"Input",content:""}),options=[{name:"prettier",value:"(n) => { const o = JSON.parse(n); return JSON.stringify(o, null, 4); }"},{name:"po2csv",value:`
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
        `}],code=ref({name:"Code",options,content:options[0].value}),output=computed(()=>{try{const parser=eval(code.value.content);return typeof parser=="function"?{content:parser(input.value.content)}:{content:"code is not a valid function!",class:"error"}}catch(o){return{content:o.toString(),class:"error"}}});return(o,e)=>(openBlock(),createElementBlock("div",_hoisted_1,[createVNode(inputVue,{data:input.value,"onUpdate:data":e[0]||(e[0]=t=>input.value=t)},null,8,["data"]),_hoisted_2,createVNode(codeVue,{data:code.value,"onUpdate:data":e[1]||(e[1]=t=>code.value=t)},null,8,["data"]),_hoisted_3,createVNode(outputVue,{data:output.value},null,8,["data"])]))}};var index=_export_sfc(_sfc_main,[["__file","/home/runner/work/jtools/jtools/src/views/textHelper/index.vue"]]);export{index as default};
