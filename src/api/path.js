function basename(path, ext = '') {
  const name = path.split('/').reverse()[0];
  return name.slice(0, name.length - ext.length);
}

function dirname(path) {
  const lastindex = path.lastIndexOf('/');
  return path.slice(0, lastindex);
}

function extname(path) {
  const lastindex = path.lastIndexOf('.');
  return path.slice(lastindex);
}

export { basename, dirname, extname };
