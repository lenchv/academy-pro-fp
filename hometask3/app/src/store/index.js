import bookService from "../services/bookService.js";

export default (historyService) => Immutable.Map({
    books: Immutable.List([bookService.getBook({
        title: 'Test 1',
        author: 'Ivan',
        publishingHouse: 'Ivanovo Ltd.',
        date: new Date(),
        tags: [ 'tag1', 'tag2', 'tag3' ],
        isRead: false
    }), bookService.getBook({
        title: 'Test 2',
        author: 'Petro',
        publishingHouse: 'Ivanovo Ltd.',
        date: new Date(),
        tags: [ 'tag2', 'tag3' ],
        isRead: true
    })]),
    editedBbook: null,
    createdBook: null,
    currentRoute: historyService.getCurrentRoute()
});
