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
        Column(1)(
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
        Column(2)(
            item.date.toLocaleDateString()
        ),
        Column(2)(
            item.tags.join(',')
        ),
        Column(1)(
            Link(actions.changeRoute)(
                Anchor('detail'),
                '/book/' + item.id
            )
        ),
        Column(1)(
            Link(actions.changeRoute)(
                Anchor('edit'),
                '/book/' + item.id + '/edit'
            )
        ),
        Column(1)(
            onDelete(Anchor('delete'), item.id, actions.deleteBook)
        )
    ]);
};

export default ListItem({ Checkbox, Row, Column, Link, Anchor, onDelete });
