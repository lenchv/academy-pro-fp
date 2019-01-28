import { ifElse } from "../../functions/index.js";
import bookService from "../../services/bookService.js";

const Book = (component) => (domService, historyService) => (id, state, actions) => {
    const book = bookService.findById(state.get('books'), id);

    return ifElse(
        book,
        () => component(domService, historyService)(book, state, actions),
        () => historyService.redirect(actions.changeRoute)('/')
    )();
};

export default Book;