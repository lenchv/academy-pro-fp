import bookService from "../services/bookService.js";

export default (historyService) => Immutable.Map({
    books: Immutable.List([bookService.getBook({
        title: 'Test 1',
        author: 'Ivan',
        publishingHouse: 'Ivanovo Ltd.',
        date: new Date('2019-01-01'),
        tags: [ 'tag1', 'tag2', 'tag3' ],
        isRead: false
    }), bookService.getBook({
        title: 'Test 2',
        author: 'Petro',
        publishingHouse: 'Ivanovo Ltd.',
        date: new Date('2018-01-01'),
        tags: [ 'tag2', 'tag3' ],
        isRead: true
    }), bookService.getBook({
        title: 'Test 3',
        author: 'Petro',
        publishingHouse: 'Petrovo Ltd.',
        date: new Date('2017-01-01'),
        tags: [ 'tag2', 'tag4' ],
        isRead: true
    })]),
    filter: {
        author: '',
        tags: [],
        date: null,
        isRead: false
    },
    createdBook: null,
    currentRoute: historyService.getCurrentRoute()
});
