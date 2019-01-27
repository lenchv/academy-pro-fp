const List = ({ createElement }) => () => {
    return createElement(
        'h1',
        'AddPage'
    );
};

export default (domService, historyService) => {
    return List(domService, historyService);
};
