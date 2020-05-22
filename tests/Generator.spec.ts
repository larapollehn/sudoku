import Generator from "../src/Sudoku/Generator";

test('generating a sudoku works', () => {
    let freeSquares = 20;
    let sudokuGenerator = new Generator(freeSquares);
    let sudoku = sudokuGenerator.generateSudoku();
    let range = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(sudoku.length).toBe(81);

    let rows = new Map();
    let columns = new Map();
    let zeroes = 0;

    for (let i = 0; i < sudoku.length; i++) {
        let row = sudoku[i].row;
        let column = sudoku[i].column;
        let value = sudoku[i].value;

        if (!rows.has(row)) {
            rows.set(row, 1);
        } else {
            let count = rows.get(row) + 1;
            rows.delete(row);
            rows.set(row, count);
        }

        if (!columns.has(column)) {
            columns.set(column, 1);
        } else {
            let count = columns.get(column) + 1;
            columns.delete(column);
            columns.set(column, count);
        }

        if (value === 0) {
            zeroes += 1;
        }
    }
    expect(zeroes).toBe(freeSquares);

    rows.forEach((value) => {
        expect(value).toEqual(9);
    });

    columns.forEach((value) => {
        expect(value).toEqual(9)
    })

    for (let i = 1; i < 10; i++){
        expect(rows.keys()).toContain(i);
        expect(columns.keys()).toContain(i);
    }

    for (let i = 0; i < sudoku.length; i++) {
        expect(sudoku[i].index).toBe(i);
    }
})