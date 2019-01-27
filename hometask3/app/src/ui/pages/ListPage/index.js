import { inject } from '../../../functions/index.js'
import { Column, Row, Container } from '../../components/index.js';
import ListItem from './ListItem.js';

const ListPage = (components) => (domService, ...otherServices) => ({ books }, actions) => {
    const {
        ListItem,
        Column,
        Row,
        Container
    } = inject(components)(domService, ...otherServices);
    const { createElement } = domService;
    
    return createElement('div', [
        createElement(
            'h1',
            'Books'
        ),
        Container([
            Row([
                Column(2)('Read'),
                Column(2)('Title'),
                Column(2)('Author'),
                Column(2)(''),
                Column(2)(''),
                Column(2)('')
            ]),
            ...books.map(book => ListItem(book, actions))
        ]),
    ]);
};

export default ListPage({ ListItem, Column, Row, Container });
