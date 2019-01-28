import { inject } from "../../functions/index.js";
import { Row, Column, Link, Anchor } from "./index.js";
import { cssToString } from "../helpers/index.js";

const Header = (components) => (domService, historyService) => (title, changeRoute) => {
    const { Row, Column, Link, Anchor } = inject(components)(domService, historyService);
    const { createElement, setAttribute } = domService;

    const row = Row([
        Column(2)(createElement('h1', title)),
        Column(10)(
            Link(changeRoute)(
                Anchor('Add book'),
                '/book/add'
            )
        )
    ]);

    return setAttribute(row, 'style', cssToString({
        display: 'flex',
        'align-items': 'center'
    }))
};

export default Header({ Row, Column, Link, Anchor });
