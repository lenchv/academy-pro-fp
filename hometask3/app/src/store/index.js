export default (historyService) => ({
    books: [{
        id: 1,
        title: 'Test 1',
        author: 'Ivan',
        publishingHouse: 'Ivanovo Ltd.',
        date: new Date(),
        tags: [ 'tag1', 'tag2', 'tag3' ],
        isRead: false
    }, {
        id: 2,
        title: 'Test 2',
        author: 'Petro',
        publishingHouse: 'Ivanovo Ltd.',
        date: new Date(),
        tags: [ 'tag2', 'tag3' ],
        isRead: true
    }],
    detailBbook: null,
    createdBook: null,
    currentRoute: historyService.getCurrentRoute()
});

