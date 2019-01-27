
const addItem = state => data => {
    return { ...state, items: [...state.items, data] };
};

const clear = state => () => {
    return { ...state, items: [] };
};

export default {
    addItem,
    clear
};
