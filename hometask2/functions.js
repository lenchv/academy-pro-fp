const inject = (methods) => (...args) => Object.keys(methods).reduce((result, key) => ({...result, [key]: methods[key](...args)}), {});
const debug = (fn) => (...args) => {
    debugger;

    return fn(...args);
};

const setToArray = (arr, i, value) => [...arr.slice(0, i), value, ...arr.slice(i + 1)];

const ifElse = (condition) => (ifTrue) => (ifFalse) => condition ? ifTrue : ifFalse;
