const modules = import.meta.glob('../views/**/*.vue');
const validEntry = (path: string) => path.match(/\/views\/[^\/]+\.vue/) || path.match(/index\.vue/);
const path2uri = (path: string) =>
  path
    .replace(/.*\/views\//, '/')
    .replace(/\/index\.vue/, '')
    .replace(/\.vue/, '');
const uri2name = (uri: string) => uri.replace(/.*\//, '');

export const routes = [] as any[];
for (const path in modules) {
  if (!validEntry(path)) continue;
  const uri = path2uri(path);
  const name = uri2name(uri);
  routes.push({ path: uri, name, component: modules[path] });
}
console.log('routes', routes);
