const printService = (document, rootId) => {
    const { reduce, map, flow, partial, flatten, sortBy, groupBy } = _;

    const getById = (document) => (...args) => document.getElementById(...args);
    const create = (document) => (...args) => document.createElement(...args);
    const text = (document) => (...args) => document.createTextNode(...args);
    const appendChild = (document) => (node, child) => node.appendChild(child) && node;
    const appendChildren = (document) => (node, children) => reduce(appendChild(document), node, children);

    const dom = inject({
        getById,
        create,
        text,
        appendChild,
        appendChildren
    })(document);

    const getTable = ({ create, appendChild, appendChildren, text }) => {
        const cell = value => appendChild(create('td'), text(value));
        const row = cells => appendChildren(create('tr'), cells);
        const table = rows => appendChildren(create('table'), rows);
        const cells = values => map(cell, values);

        return flow(
            map(cells),
            map(row),
            table
        );
    };

    const toMatrix = flow(
        flatten,
        sortBy(['row', 'column']),
        groupBy('row'),
        map(map(({ id }) => `id: ${id}`))
    );

    return flow(
        toMatrix,
        getTable(dom),
        partial(dom.appendChild, [dom.getById(rootId)])
    );
};
