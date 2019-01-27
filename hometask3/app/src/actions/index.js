
const addItem = state => data => {
    return { ...state, items: [...state.items, data] };
};

const clear = state => () => {
    return { ...state, items: [] };
};

const changeRoute = state => route => {
    return { ...state, currentRoute: route };
};

const findBook = (books, id) => {
    return books.find(book => book.id === id);
};

const setBookData = (books, id, data) => {
    const i = books.findIndex(book => book.id === id);

    return [ ...books.slice(0, i), { ...books[i], ...data }, ...books.slice(i + 1) ];
};

const markAsRead = (state) => (id) => {
    return { ...state, books: setBookData(state.books, id, { isRead: !findBook(state.books, id).isRead }) }
};

const deleteBook = (state) => (id) => {
    const i = state.books.findIndex(book => book.id === id);

    return { ...state, books: [ ...state.books.slice(0, i), ...state.books.slice(i + 1) ]};
};

export default {
    addItem,
    clear,
    changeRoute,
    markAsRead,
    deleteBook
};
