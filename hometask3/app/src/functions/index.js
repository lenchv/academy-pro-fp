const inject = (service) => (...args) => Object.keys(service).reduce((injected, methodName) => ({ ...injected, [methodName]: service[methodName](...args) }), {});

const basePipe = (fA, fB) => (...args) => fB(fA(...args));
const pipe = (...funcs) => funcs.reduce(basePipe);

const ifElse = (condition, ifTrue, ifFalse) => condition ? ifTrue : ifFalse;

const matched = x => ({
    on: () => matched(x),
    otherwise: () => x,
})

const match = x => ({  
    on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
    otherwise: fn => fn(x),
});

const isObject = (value) => Object(value) === value;

const reduce = (value, callback, initial) => match(value)
    .on(Array.isArray, value => value.reduce(callback, initial))
    .on(isObject, value => Object.keys(value).reduce(
        (result, key, i, arr) => callback(result, value[key], key, arr),
        initial
    ))
    .otherwise((value) => reduce([value], calback, initial));

export {
    inject,
    ifElse,
    basePipe,
    pipe,
    match,
    reduce
};