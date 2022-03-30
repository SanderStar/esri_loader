# esri_loader
Esri loader

Steps

1. npm install

2. change some source files (extensions)

common change add '.js' behind the import / export file names

node_modules/esri-loader/dist folder
- esri-loader.js

<code>
import utils from './utils/index.js';
export { loadModules } from './modules.js';
export { getScript, isLoaded, loadScript, setDefaultOptions } from './script.js';
export { loadCss } from './utils/css.js';
export { utils };
</code>
  
- modules.js

<code>
import { getScript, isLoaded, loadScript } from './script.js';
  </code>

- script.js

<code>
import { loadCss } from './utils/css.js';
import utils from './utils/index.js';
import { getCdnUrl } from './utils/url.js';
</code>

node_modules/esri-loader/dist/utils folder

- css.js

<code>
import { getCdnCssUrl, parseVersion } from './url.js';
</code>

3. run the index.html
