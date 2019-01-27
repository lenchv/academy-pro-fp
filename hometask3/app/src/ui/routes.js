import { match } from '../functions/index.js';

const ROUTE_EDIT_BOOK = /^\/book\/([0-9]+)\/edit\/?$/i;
const ROUTE_DETAIL_BOOK = /^\/book\/([0-9]+)\/?$/i;
const ROUTE_ADD_BOOK = /^\/book\/add\/?$/i;

const routes = ({
    EditPage,
    DetailPage,
    AddPage,
    ListPage
}) => (currentRoute) => match(currentRoute)
    .on(route => ROUTE_EDIT_BOOK.test(route), (route) => EditPage.bind(null, route.match(ROUTE_EDIT_BOOK)[1]))
    .on(route => ROUTE_DETAIL_BOOK.test(route), (route) => DetailPage.bind(null, route.match(ROUTE_DETAIL_BOOK)[1]))
    .on(route => ROUTE_ADD_BOOK.test(route), () => AddPage)
    .otherwise(route => ListPage);

export default routes;