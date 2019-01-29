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

const removeTag = (book, tagNumber) => {
    return changeProperty(book, 'tags', Immutable.List(book.tags).delete(tagNumber).toArray());
};

const filterBooks = (books, { author, date, isRead, tags }) => {
    return books.filter(book => [
        ifElse(author, book.author === author, true),
        ifElse(date, () => book.date.getTime() === date.getTime(), () => true)(),
        ifElse(isRead, book.isRead === isRead, true),
        ifElse(tags.length, tags.every(tag => book.tags.includes(tag.trim())), true),
    ].every(Boolean));
};

export default {
    set,
    markAsRead,
    findById,
    deleteBook,
    getBook,
    changeProperty,
    addTag,
    changeTag,
    removeTag,
    filterBooks
};
