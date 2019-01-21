const rearrangeMatrix = (table, newColumn, newRow, item) => {
    const { flow, flatten, findIndex, last, first, groupBy, map, memoize } = _;

    const shiftLeft = items => [...items.slice(1), first(items)];
    const shiftRight = items => [last(items), ...items.slice(0, -1)];

    const splitArray = (from, to) => items => [
        items.slice(0, from ),
        items.slice(from, to + 1),
        items.slice(to + 1)
    ];

    const getTableSide = (totalLength) => Math.ceil(Math.sqrt(totalLength));

    const generateRow = rowSize => row => {
        let i = 0;

        return () => (row + (++i)) % rowSize;
    };
    const generateColumn = rowSize => column => row => {
        let i = row;
        let j = 0;

        return () => ifElse((++i % rowSize) === 0)(() => column + (++j))(() => column + j)() % rowSize;
    };
    const generatePosition = length => position => {
        let i = 0;

        return () => (position + ++i) % length;
    };

    const generateItem = (initialItem, length) => {
        let nextRow = generateRow(getTableSide(length))(initialItem.row);
        let nextColumn = generateColumn(getTableSide(length))(initialItem.column)(initialItem.row);
        let nextPosition = generatePosition(length)(initialItem.position);

        return (currentItem) => ({
            ...currentItem,
            ...{
                row: nextRow(),
                column: nextColumn(),
                position: nextPosition()
            }
        });
    };

    const reCalculatePositions = (startItem, length) => map(generateItem(startItem, length));

    const getStartItem = (start, target, end) => last(start) || last(end) || last(target);

    const reGroup = (length) => (shift) => ([ start, target, end ]) => [
        ...start,
        ...flow(
            shift,
            reCalculatePositions(getStartItem(start, target, end), length)
        )(target),
        ...end
    ];

    const forward = (length) => (from, to) => [
        splitArray(from, to),
        reGroup(length)(shiftLeft)
    ];

    const backward = (length) => (from, to) => [
        splitArray(to, from),
        reGroup(length)(shiftRight)
    ];

    const shiftItem = (item, column, row) => (items) => {
        const from = findIndex(item, items);
        const to = findIndex({ column, row }, items);
        const direction = (from < to);

        return flow(
            ...ifElse(direction)(forward)(backward)(items.length)(from, to)
        )(items);
    };

    const toArray = map(item => item);

    return flow(
        flatten,
        shiftItem(item, newColumn, newRow),
        groupBy('column'),
        toArray
    )(table);
};