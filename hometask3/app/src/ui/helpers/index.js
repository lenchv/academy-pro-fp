import { reduce } from '../../functions/index.js';

const cssToString = (css) => reduce(css, (style, value, property) => [...style, `${property}: ${value}`], []).join('; ');

const getDate = (date) => `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`;

export {
    cssToString,
    getDate
};