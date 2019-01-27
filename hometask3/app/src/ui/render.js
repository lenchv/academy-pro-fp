import components from './components/index.js';

const render = (domService) => (store, actions) => {
    const {
        Button,
        ClearButton,
        List
    } = components(domService);

    return domService.createElement(
        'div', [
            Button(store.items, actions.addItem),
            ClearButton(actions.clear),
            List(store.items)
        ]
    )
};

export default render;
