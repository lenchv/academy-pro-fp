import { pipe, partial, inject } from "../../functions/index.js";
import { cssToString } from '../helpers/index.js';

const Link = ({ on }, historyService) => (changeRoute) => (element, route) => on(
    element,
    'click',
    () => {
        historyService.redirect(changeRoute)(route);
    }
);

const Button = ({ createElement, on }) => (title, onChange) => pipe(
    createElement,
    partial(on, [ undefined, 'click', onChange]),
)('button', title);

const TextInput = ({ createElement, setAttribute, setProperty, on }) => (value, onChange) => pipe(
    createElement,
    partial(setAttribute, [ undefined, 'type', 'text' ]),
    partial(setProperty, [ undefined, 'value', value ]),
    partial(on, [ undefined, 'change', onChange]),
)('input');

const Checkbox = ({ createElement, setAttribute, setProperty, on }) => (value, onCheck) => pipe(
    createElement,
    partial(setAttribute, [ undefined, 'type', 'checkbox' ]),
    partial(setProperty, [ undefined, 'checked', value ]),
    partial(on,  [ undefined, 'change', onCheck ])
)('input');

const DateInput = ({ createElement, setAttribute, setProperty, on }) => (value, onChange) => pipe(
    createElement,
    partial(setAttribute, [ undefined, 'type', 'date' ]),
    partial(setProperty, [ undefined, 'value', value ]),
    partial(on,  [ undefined, 'change', onChange ])
)('input');

const TagInput = ((components) => (...services) => (tags, addTag, changeTag, removeTag) => {
    const {
        TextInput, Button
    } = inject(components)(...services);

    return tags
        .reduce((tags, tag, i) => tags.concat([
            TextInput(tag, changeTag.bind(null, i)),
            Button('X', removeTag.bind(null, i))
        ]), [])
        .concat(Button('+', addTag));
})({ TextInput, Button });

const Anchor = ({ createElement, setAttribute, on }) => pipe(
    partial(createElement, [ 'a', undefined ]),
    partial(setAttribute, [ undefined, 'href', '#' ]),
    partial(on, [ undefined, 'click', (e) => e.preventDefault() ])
);

const Column = ({ createElement, setAttribute }) => (size) => pipe(
    partial(createElement, [ 'div', undefined ]),
    partial(setAttribute, [ undefined, 'style', cssToString({
        padding: '0 15px',
        float: 'left',
        width: (size * 8.333333333333333) + '%',
        'box-sizing': 'border-box'
    })])
);

const Row = ({ createElement, setAttribute }) => pipe(
    partial(createElement, [ 'div', undefined ]),
    partial(setAttribute, [ undefined, 'style', cssToString({
        margin: '0 -15px',
        overflow: 'hidden'
    }) ])
);

const Container = ({ createElement, setAttribute }) => pipe(
    partial(createElement, [ 'div', undefined ]),
    partial(setAttribute, [ undefined, 'style', cssToString({
        'max-width': '900px',
        padding: '0 25px'
    })])
);

export {
    Link,
    Checkbox,
    Anchor,
    Column,
    Row,
    Container,
    TextInput,
    Button,
    TagInput,
    DateInput
};
