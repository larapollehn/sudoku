import Solver from "../src/Sudoku/Solver";
import Generator from "../src/Sudoku/Generator";
import Utility from "../src/Sudoku/Utility";
import exp = require("constants");

test('solver works as expected', () => {
    let generator = new Generator();
    let solver = new Solver();
    let sudoku = generator.generateSudoku(65);
    solver.solveSudoku(sudoku);

    let values = new Map();

    for (let i = 0; i < sudoku.length; i++) {
        let value = sudoku[i].value;

        if (!values.has(value)) {
            values.set(value, 1);
        } else {
            let count = values.get(value) +1;
            values.delete(value);
            values.set(value, count);
        }
    }
    expect(values.size).toEqual(9);
    values.forEach((value) => {
        expect(value).toEqual(9)
    })

    for (let i = 1; i < 10; i++){
        expect(values.keys()).toContain(i);
    }
});
