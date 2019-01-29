import { inject } from '../../../functions/index.js';
import { Container, Row, Column, TextInput, Checkbox, Button, TagInput, DateInput } from "../../components/index.js";
import Header from '../../components/Header.js';
import Book from '../../helpers/Book.js';

const getDate = (date) => `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`;

const EditPage = (components) => (domService, ...otherServices) => (book, state, actions) => {
    const {
        Header,
        Container,
        Row,
        Column,
        TextInput,
        Checkbox,
        TagInput,
        DateInput
    } = inject(components)(domService, ...otherServices);
    const { createElement } = domService;

    return createElement('div', [
        Header(book.title, actions.changeRoute),
        Container([
            Row([
                Column(4)('Title'),
                Column(8)(TextInput(book.title, (e) => {
                    actions.changeEditedBookProperty(book.id, 'title', e.target.value)
                }))
            ]),
            Row([
                Column(4)('Author'),
                Column(8)(TextInput(book.author, (e) => {
                    actions.changeEditedBookProperty(book.id, 'author', e.target.value)
                }))
            ]),
            Row([
                Column(4)('Publishing House'),
                Column(8)(TextInput(book.publishingHouse, (e) => {
                    actions.changeEditedBookProperty(book.id, 'publishingHouse', e.target.value)
                }))
            ]),
            Row([
                Column(4)('Date'),
                Column(8)(DateInput(getDate(book.date), (e) => {
                    actions.changeEditedBookProperty(book.id, 'date', new Date(e.target.value))
                }))
            ]),
            Row([
                Column(4)('Tags'),
                Column(8)(TagInput(book.tags || [], () => {
                    actions.addEditedBookTag(book.id);
                }, (tagNumber, e) => {
                    actions.changeEditedBookTag(book.id, tagNumber, e.target.value);
                }, (tagNumber) => {
                    actions.removeEditedBookTag(book.id, tagNumber);
                }))
            ]),
            Row([
                Column(4)('Has Read'),
                Column(8)(Checkbox(book.isRead || false, (e) => {
                    actions.changeEditedBookProperty(book.id, 'isRead', e.target.checked)
                }))
            ])
        ])
    ]);
};

export default Book(EditPage({ Container, Row, Column, TextInput, Checkbox, Button, TagInput, DateInput, Header }));
