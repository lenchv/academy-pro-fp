import bookService from "../services/bookService.js";
import { pipe, partial } from "../functions/index.js";

const changeRoute = state => route => state.set(
    'currentRoute',
    route
);

const markAsRead = (state) => (id) => state.set(
    'books',
    pipe(
        partial(bookService.findById, [undefined, id]),
        bookService.markAsRead,
        partial(bookService.set, [ state.get('books'), undefined ])
    )(state.get('books'))
);

const deleteBook = (state) => (id) => state.set(
    'books',
    bookService.deleteBook(state.get('books'), id)
);

const changeCreatedBookProperty = (state) => (property, value) => state.set(
    'createdBook',
    bookService.changeProperty(
        state.get('createdBook') || bookService.getBook(),
        property,
        value
    )
);

const addBook = (state) => () => state.set(
    'books',
    bookService.set(
        state.get('books'),
        bookService.getBook(
            state.get('createdBook')
        )
    )
).set(
    'createdBook',
    null
);

const addCreatedBookTag = (state) => () => state.set(
    'createdBook',
    bookService.addTag(
        state.get('createdBook') || bookService.getBook()
    )
);

const removeCreatedBookTag = (state) => (tagNumber) => state.set(
    'createdBook',
    bookService.removeTag(
        state.get('createdBook'),
        tagNumber
    )
);

const changeCreatedBookTag = (state) => (tagNumber, value) => state.set(
    'createdBook',
    bookService.changeTag(
        state.get('createdBook'),
        tagNumber,
        value
    )
);

const changeEditedBookProperty = (state) => (id, property, value) => state.set(
    'books',
    pipe(
        partial(bookService.findById, [undefined, id]),
        partial(bookService.changeProperty, [ undefined, property, value ]),
        partial(bookService.set, [ state.get('books'), undefined ])
    )(state.get('books'))
);

const addEditedBookTag = (state) => (id) => state.set(
    'books',
    bookService.set(
        state.get('books'),
        bookService.addTag(
            bookService.findById(state.get('books'), id)
        )
    )
);

const changeEditedBookTag = (state) => (id, tagNumber, value) => state.set(
    'books',
    pipe(
        partial(bookService.findById, [undefined, id]),
        partial(bookService.changeTag, [ undefined, tagNumber, value ]),
        partial(bookService.set, [ state.get('books'), undefined ])
    )(state.get('books'))
);

const removeEditedBookTag = (state) => (id, tagNumber) => state.set(
    'books',
    pipe(
        partial(bookService.findById, [undefined, id]),
        partial(bookService.removeTag, [ undefined, tagNumber ]),
        partial(bookService.set, [ state.get('books'), undefined ])
    )(state.get('books'))
);

const changeFilter = (state) => (key, value) => state.set(
    'filter',
    {...state.get('filter'), [key]: value}
);

export default {
    changeRoute,
    markAsRead,
    deleteBook,
    changeCreatedBookProperty,
    addBook,
    addCreatedBookTag,
    changeCreatedBookTag,
    changeEditedBookProperty,
    addEditedBookTag,
    changeEditedBookTag,
    removeEditedBookTag,
    removeCreatedBookTag,
    changeFilter
};
