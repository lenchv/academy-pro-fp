import { reduce } from '../../functions/index.js';

const cssToString = (css) => reduce(css, (style, value, property) => [...style, `${property}: ${value}`], []).join('; ');

export {
    cssToString
};