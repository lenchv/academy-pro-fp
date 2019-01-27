
const hasBookData = (book, data) => Object.keys(data).every(key => data[key] == book[key]);;

const filterBook = (books, bookData) => books.filter(book => hasBookData(book, bookData));

const findById = (books, id) => filterBook(books, { id }).pop();

export default {
    hasBookData,
    filterBook,
    findById
};
