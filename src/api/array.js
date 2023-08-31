function arrayFlatten(arr, newarr) {
  if (typeof arr !== 'object') return newarr.push(arr);
  for (let i in arr) arrayFlatten(arr[i], newarr);
  return newarr;
}

function arrayDiff(arr, newarr) {
  const tmparr = [...arr];
  const diffarr = [...newarr];
  for (const i in diffarr) {
    const j = tmparr.findIndex((e) => e === newarr[i]);
    if (j < 0) continue;
    diffarr[i] = undefined;
    tmparr.splice(j, 1);
  }
  return diffarr.filter((e) => e !== undefined);
}

export { arrayFlatten, arrayDiff };
