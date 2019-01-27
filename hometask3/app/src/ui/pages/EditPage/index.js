const List = ({ createElement }) => (id) => {
    return createElement(
        'h1',
        'EditPage ' + id
    );
};

export default (domService, historyService) => {
    return List(domService, historyService);
};
