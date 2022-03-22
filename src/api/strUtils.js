function xml2obj(xmlDoc, conf) {
  const map = [];
  var transUnits = xmlDoc.querySelectorAll(conf.unitName);
  for (const u of transUnits) {
    const source = u.querySelector(conf.srcName);
    const target = u.querySelector(conf.tgtName);
    map.push({ id: u[conf.idName], source, target, srcText: source.innerHTML, tgtText: target.innerHTML });
  }
  return map;
}

function blob2obj(blob, onload, encoding = 'UTF-8') {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsText(blob, encoding);
    reader.onload = (e) => {
      onload(e);
      resolve();
    };
  });
}

function blob2file(blob, filename) {
  var e = document.createElement('a');
  e.setAttribute('download', filename);
  e.style.display = 'none';
  e.href = URL.createObjectURL(blob);
  document.body.appendChild(e);
  e.click();
  document.body.removeChild(e);
}

function str2file(s, filename) {
  blob2file(new Blob([s]), filename);
}

async function custom_upload(info, onload, encoding = 'UTF-8') {
  await blob2obj(info.file, (e) => onload(e.target.result), encoding);
  info.onSuccess('success', info.file);
}
export { xml2obj, blob2obj, blob2file, str2file, custom_upload };
