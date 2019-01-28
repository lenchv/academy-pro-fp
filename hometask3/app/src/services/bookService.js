import { ifElse, basePipe } from "../functions/index.js";

const getId = ((i) => () => i++).call(null, 0);

const markAsRead = (book) => changeProperty(book, 'isRead', !book.isRead);

const findById = (books, id) => books.find(book => book.id == id);

const deleteBook = (books, id) => books.filter(book => book.id !== id);

const set = (books, book) => {
    return basePipe(
        (books) => books.findIndex(({ id }) => id === book.id),
        (i) => ifElse(
            i !== -1,
            () => books.set(i, book),
            () => books.push(book)
        )()
    )(books);
};

const getBook= (data = {}) => ({
    ...{
        id: getId(),
        title: '',
        author: '',
        publishingHouse: '',
        date: new Date(),
        tags: [],
        isRead: false
    },
    ...data
});

const changeProperty = (book, propertyName, value) => ({
    ...book,
    [propertyName]: value
});

const addTag = (book) => {
    return changeProperty(book, 'tags', [...book.tags, '']);
};

const changeTag = (book, tagNumber, value) => {
    return changeProperty(book, 'tags', Immutable.List(book.tags).set(tagNumber, value).toArray());
};

export default {
    set,
    markAsRead,
    findById,
    deleteBook,
    getBook,
    changeProperty,
    addTag,
    changeTag
};
