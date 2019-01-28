import { inject } from '../../../functions/index.js'
import { Column, Row, Container } from '../../components/index.js';
import Header from '../../components/Header.js';
import ListItem from './ListItem.js';

const ListPage = (components) => (domService, ...otherServices) => (state, actions) => {
    const {
        ListItem,
        Column,
        Row,
        Container,
        Header
    } = inject(components)(domService, ...otherServices);
    const { createElement } = domService;
    
    return createElement('div', [
        Header('Books', actions.changeRoute),
        Container([
            Row([
                Column(2)('Read'),
                Column(2)('Title'),
                Column(2)('Author'),
                Column(2)(''),
                Column(2)(''),
                Column(2)('')
            ])
        ].concat(
            state.get('books').map(book => ListItem(book, actions)).toArray()
        )),
    ]);
};

export default ListPage({ ListItem, Column, Row, Container, Header });
