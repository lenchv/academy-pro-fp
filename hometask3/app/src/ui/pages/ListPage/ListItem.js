import { inject } from "../../../functions/index.js";
import { Link, Anchor, Checkbox, Column, Row } from '../../components/index.js';

const onDelete = ({ on }) => (element, id, deleteBook) => on(element, 'click', () => {
    deleteBook(id);
});

const ListItem = (components) => (...services) => (item, actions) => {
    const {
        Row,
        Column,
        Checkbox,
        Link,
        Anchor,
        onDelete
    } = inject(components)(...services);

    return Row([
        Column(2)(
            Checkbox(item.isRead, () => {
                actions.markAsRead(item.id);
            })
        ),
        Column(2)(
            Link(actions.changeRoute)(
                Anchor(item.title),
                '/book/' + item.id
            )
        ),
        Column(2)(
            Link(actions.changeRoute)(
                Anchor(item.author),
                '/book/' + item.id
            )
        ),
        Column(1)(
            Link(actions.changeRoute)(
                Anchor('\u270B'),
                '/book/' + item.id
            )
        ),
        Column(1)(
            Link(actions.changeRoute)(
                Anchor('\u270D'),
                '/book/' + item.id + '/edit'
            )
        ),
        Column(1)(
            onDelete(Anchor('\u2716'), item.id, actions.deleteBook),
        )
    ]);
};

export default ListItem({ Checkbox, Row, Column, Link, Anchor, onDelete });
