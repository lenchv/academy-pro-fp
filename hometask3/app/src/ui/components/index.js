import { pipe, partial } from "../../functions/index.js";
import { cssToString } from '../helpers/index.js';

const Link = ({ on }, historyService) => (changeRoute) => (element, route) => on(
    element,
    'click',
    () => {
        historyService.changeRoute(route);
        changeRoute(route);
    }
);

const Checkbox = ({ createElement, setAttribute, setProperty, on }) => (value, onCheck) => pipe(
    createElement,
    partial(setAttribute, [ undefined, 'type', 'checkbox' ]),
    partial(setProperty, [ undefined, 'checked', value ]),
    partial(on,  [ undefined, 'change', onCheck ])
)('input');

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
    Link, Checkbox, Anchor, Column, Row, Container
};
