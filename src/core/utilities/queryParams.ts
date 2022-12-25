const hash = window.location.hash.slice(1);
const query = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';

export const params = new URLSearchParams(query);
