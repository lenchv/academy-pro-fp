import { Container, Row, Column, TextInput, DateInput, Checkbox } from "./index.js";
import { inject, ifElse } from "../../functions/index.js";
import { getDate } from "../helpers/index.js";

const Filter = (components) => (domService, historyService) => (filter, actions) => {
    const {
        Container, Row, Column, TextInput, DateInput, Checkbox
    } = inject(components)(domService, historyService);

    return Container([
        Row([
            Column(3)('Author'),
            Column(3)('Tags'),
            Column(3)('Date'),
            Column(3)('Has already read'),
        ]),
        Row([
            Column(3)([
                TextInput(filter.author, (e) => {
                    actions.changeFilter('author', e.target.value);
                })
            ]),
            Column(3)([
                TextInput(filter.tags.join(','), (e) => {
                    actions.changeFilter('tags', e.target.value.split(',').filter(Boolean));
                })
            ]),
            Column(3)([
                DateInput(
                    ifElse(filter.date instanceof Date, () => getDate(filter.date), () => '')(),
                    (e) => {
                        actions.changeFilter('date', ifElse(e.target.value, new Date(e.target.value), null));
                    }
                )
            ]),
            Column(3)([
                Checkbox(filter.isRead, (e) => {
                    actions.changeFilter('isRead', e.target.checked);
                })
            ])
        ])
    ]);
};

export default Filter({ Container, Row, Column, TextInput, DateInput, Checkbox });
