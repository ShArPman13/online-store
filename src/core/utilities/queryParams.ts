const hash = window.location.hash.slice(1);
const query = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';

export const params = new URLSearchParams(query);

// export function deleteOneValueFromParamKey(key: string, value: string) {
//   const temp = [...params.getAll(key)];
//   params.delete(key);
//   temp.forEach((p) => {
//     if (p !== value) {
//       params.append(key, p);
//     }
//   });
//   window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
// }
