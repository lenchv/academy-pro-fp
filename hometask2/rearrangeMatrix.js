const rearrangeMatrix = (table, newColumn, newRow, item) => {
    const { flow, flatten, findIndex, last, groupBy, map } = _;

    const splitArray = (from, to) => items => [
        items.slice(0, from ),
        items.slice(from, to + 1),
        items.slice(to + 1)
    ];

    const nextRow = (row, length) => (row + 1) % length;

    const getCell = ({ column, row, position }) => ({
        row: row,
        column: column + Number(row === 0),
        position: position + 1
    });

    const reCalculate = (startItem, length) => (items) => items.map((item, i) => ({ ...item, ...getCell({
        row: nextRow(startItem.row + i, length),
        column: startItem.column,
        position: startItem.position
    })}));

    const getStartItem = (start, target, end) => last(start) || last(end) || last(target);

    const reGroup = (rowSize) => (shift) => ([ start, target, end ]) => [
        ...start,
        ...flow(
            shift,
            reCalculate(getStartItem(start, target, end), rowSize)
        )(target),
        ...end
    ];

    const forward = (rowSize) => (from, to) => [
        splitArray(from, to),
        reGroup(rowSize)(shiftLeft)
    ];

    const backward = (rowSize) => (from, to) => [
        splitArray(to, from),
        reGroup(rowSize)(shiftRight)
    ];

    const shiftItem = (item, column, row) => (items) => {
        const from = findIndex(item, items);
        const to = findIndex({ column, row }, items);
        const direction = (from < to);
        const rowSize = Math.ceil(Math.sqrt(items.length));

        return flow(
            ...ifElse(direction)(forward)(backward)(rowSize)(from, to)
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