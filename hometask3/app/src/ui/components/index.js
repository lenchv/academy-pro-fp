import { inject } from '../../functions/index.js'

const List = ({ createElement }) => items => {
    return createElement(
        'ul',
        items.map(
            item => createElement('li', item)
        ) 
    );
};

const Button = ({ createElement, on }) => (items, addItem) => on(
    createElement('button', 'Add'),
    'click',
    () => {
        addItem('new item ' + items.length);
    }
);

const ClearButton = ({ createElement, on }) => (clear) => on(
    createElement('button', 'Clear'),
    'click',
    () => {
        clear();
    }
);

const components = inject({
    List,
    Button,
    ClearButton
});

export default components;
