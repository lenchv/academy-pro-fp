import { inject } from '../../../functions/index.js'
import { Column, Row, Container } from '../../components/index.js';
import Header from '../../components/Header.js';
import ListItem from './ListItem.js';
import Filter from '../../components/Filter.js';
import bookService from '../../../services/bookService.js';

const ListPage = (components) => (domService, ...otherServices) => (state, actions) => {
    const {
        ListItem,
        Column,
        Row,
        Container,
        Header,
        Filter
    } = inject(components)(domService, ...otherServices);
    const { createElement } = domService;
    const books = bookService.filterBooks(state.get('books'), state.get('filter'));
    
    return createElement('div', [
        Header('Books', actions.changeRoute),
        Filter(state.get('filter'), actions),
        Container([
            Row([
                Column(1)('Read'),
                Column(2)('Title'),
                Column(2)('Author'),
                Column(2)('Date'),
                Column(2)('Tags'),
                Column(3)('')
            ])
        ].concat(
            books.map(book => ListItem(book, actions)).toArray()
        )),
    ]);
};

export default ListPage({ ListItem, Column, Row, Container, Header, Filter });
