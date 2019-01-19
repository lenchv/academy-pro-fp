const rearrangeMatrix = (table, newColumn, newRow, item) => {
    const { flow, flatten, findIndex, partial, groupBy, map } = _;

    const setItem = (items, item, position, column, row ) => setToArray(
        items,
        position,
        { ...item, ...{
            position: position + 1,
            column,
            row
        }}
    );

    const changePosition = (item, column, row) => (items) => {
        const position = findIndex(item, items);
        const newPosition = findIndex({ column, row }, items);

        return flow(
            partial(setItem, [_, items[newPosition], position, item.column, item.row]),
            partial(setItem, [_, items[position], newPosition, column, row])
        )(items);
    };

    return flow(
        flatten,
        changePosition(item, newColumn, newRow),
        groupBy('column'),
        map(v => v)
    )(table);
};