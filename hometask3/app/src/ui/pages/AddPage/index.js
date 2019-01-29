import { inject } from "../../../functions/index.js";
import { Container, Row, Column, TextInput, Checkbox, Button, TagInput, DateInput } from "../../components/index.js";

const Header = ({ createElement }) => () => createElement(
    'h1',
    'Add Book'
);

const getDate = (date) => `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`;

const AddPage = (components) => (domainService, historyService, ...others) => (state, actions) => {
    const {
        Header,
        Container,
        Row,
        Column,
        TextInput,
        Checkbox,
        Button,
        TagInput,
        DateInput
    } = inject(components)(domainService, historyService, ...others);
    const book = state.get('createdBook') || {};

    return [
        Header(),
        Container([
            Row([
                Column(4)('Title'),
                Column(8)(TextInput(book.title || '', (e) => {
                    actions.changeCreatedBookProperty('title', e.target.value)
                }))
            ]),
            Row([
                Column(4)('Author'),
                Column(8)(TextInput(book.author || '', (e) => {
                    actions.changeCreatedBookProperty('author', e.target.value)
                }))
            ]),
            Row([
                Column(4)('Publishing House'),
                Column(8)(TextInput(book.publishingHouse || '', (e) => {
                    actions.changeCreatedBookProperty('publishingHouse', e.target.value)
                }))
            ]),
            Row([
                Column(4)('Date'),
                Column(8)(DateInput(getDate(book.date || new Date()), (e) => {
                    actions.changeCreatedBookProperty('date', new Date(e.target.value))
                }))
            ]),
            Row([
                Column(4)('Tags'),
                Column(8)(TagInput(book.tags || [], () => {
                    actions.addCreatedBookTag();
                }, (tagNumber, e) => {
                    actions.changeCreatedBookTag(tagNumber, e.target.value);
                }, (tagNumber) => {
                    actions.removeCreatedBookTag(tagNumber);
                }))
            ]),
            Row([
                Column(4)('Has Read'),
                Column(8)(Checkbox(book.isRead || false, (e) => {
                    actions.changeCreatedBookProperty('isRead', e.target.checked)
                }))
            ]),
            Row([
                Column(4)(Button('Add', () => {
                    actions.addBook();
                }))
            ])
        ])
    ]
};

export default AddPage({ Header, Container, Row, Column, TextInput, Checkbox, Button, TagInput, DateInput });
