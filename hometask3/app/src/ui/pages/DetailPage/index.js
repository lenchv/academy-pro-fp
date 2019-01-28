import { inject } from '../../../functions/index.js';
import { Container, Row, Column } from '../../components/index.js';
import Header from '../../components/Header.js';
import Book from '../../helpers/Book.js';

const DetailPage = (components) => (domService, ...otherServices) => (book, state, actions) => {
    const {
        Container,
        Row,
        Column,
        Header
    } = inject(components)(domService, ...otherServices);
    const { createElement } = domService;

    return createElement('div', [
        Header(book.title, actions.changeRoute),
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

export default Book(DetailPage({ Container, Row, Column, Header }));
