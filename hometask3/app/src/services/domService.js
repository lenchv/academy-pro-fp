import { ifElse, inject } from '../functions/index.js';

const appendChild = (document) => (element, child) => {
    element.appendChild(child);

    return element;
};

const append = (document) => (element, child) => appendChild(document)(
    element,
    ifElse(
        typeof child === 'string',
        () => createText(document)(child),
        () => child
    )()
);

const appendChildren = (document) => (element, children = []) => {
    return ifElse(Array.isArray(children), children, [ children ]).reduce(append(document), element);
};

const on = (document) => (element, event, callback) => {
    element.addEventListener(event, callback, false);

    return element;
};

const createElement = (document) => (name, children) => {
    return appendChildren(document)(document.createElement(name), children);
};

const createText = (document) => (text) => document.createTextNode(text);

export default inject({
    createElement,
    appendChild,
    appendChildren,
    on
});
