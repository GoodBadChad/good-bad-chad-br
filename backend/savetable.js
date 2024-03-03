const savetable = document.getElementById('savetable');

savetable.innerHTML = '<h1>Save table:</h1>';

import { save, getSaves } from './functions.js';
// test:
(async () => {
  const saves = await getSaves('test', 1);
  console.log(saves);
})();