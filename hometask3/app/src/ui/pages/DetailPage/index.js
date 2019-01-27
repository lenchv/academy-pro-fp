import { inject } from '../../../functions/index.js';
import { Container, Row, Column } from '../../components/index.js';
import bookService from '../../../services/bookService.js';

const DetailPage = (components) => (domService, ...otherServices) => (id, state, actions) => {
    const {
        Container,
        Row,
        Column
    } = inject(components)(domService, ...otherServices);
    const { createElement } = domService;

    const book = bookService.findById(state.books, id);
    
    return createElement('div', [
        createElement('h1', book.title),
        Container([
            Row([
                Column(3)('Title :'), Column(9)(book.title),
            ]),
            Row([
                Column(3)('Author :'), Column(9)(book.author),
            ]),
            Row([
                Column(3)('Publishing House :'), Column(9)(book.publishingHouse),
            ]),
            Row([
                Column(3)('Date :'), Column(9)(book.date.toLocaleString()),
            ]),
            Row([
                Column(3)('Tags :'), Column(9)(book.tags.join(', ')),
            ]),
            Row([
                Column(3)('Read :'), Column(9)(book.isRead ? 'yes' : 'no'),
            ])
        ])
    ]);
};

export default DetailPage({ Container, Row, Column });
