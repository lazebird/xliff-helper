function xml2obj(xmlDoc, conf) {
  const map = [];
  var transUnits = xmlDoc.querySelectorAll(conf.unitName);
  for (const u of transUnits) {
    const source = u.querySelector(conf.srcName);
    const target = u.querySelector(conf.tgtName);
    map.push({ id: u[conf.idName], unit: u, source, target, srcText: source.innerHTML, tgtText: target.innerHTML });
  }
  return map;
}

function blob2obj(blob, onload, encoding = 'UTF-8') {
  let reader = new FileReader();
  reader.readAsText(blob, encoding);
  reader.onload = onload;
}

function str2file(s, filename) {
  var e = document.createElement('a');
  e.setAttribute('download', filename);
  e.style.display = 'none';
  var blob = new Blob([s]);
  e.href = URL.createObjectURL(blob);
  document.body.appendChild(e);
  e.click();
  document.body.removeChild(e);
}

export { xml2obj, blob2obj, str2file };
