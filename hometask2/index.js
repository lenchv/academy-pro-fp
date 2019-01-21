const printTable = printService(document, 'root');

const table = [
    [
        { id: 0, row: 0, column: 0, position: 1 },
        { id: 1, row: 1, column: 0, position: 2 },
        { id: 2, row: 2, column: 0, position: 3 }
    ],
    [
        { id: 3, row: 0, column: 1, position: 4 },
        { id: 4, row: 1, column: 1, position: 5 },
        { id: 5, row: 2, column: 1, position: 6 }
    ],
    [
        { id: 6, row: 0, column: 2, position: 7 },
        { id: 7, row: 1, column: 2, position: 8 },
        { id: 8, row: 2, column: 2, position: 9 }
    ]
];

console.log(table);

printTable(table);

const newColumn = 2;
const newRow = 2;
const item = table[0][0];

const newTable = rearrangeMatrix(table, newColumn, newRow, item);

console.log(newTable);

printTable(newTable);
