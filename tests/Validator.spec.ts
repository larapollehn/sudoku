import Generator from "../src/Sudoku/Generator";
import Solver from "../src/Sudoku/Solver";
import Validator from "../src/Sudoku/Validator";

test('validator works as expected', () => {
    let generator = new Generator();
    let solver = new Solver();
    let validator = new Validator();

    let sudoku = generator.generateSudoku(30);
    expect(validator.validate(sudoku)).toEqual(false);

    solver.solveSudoku(sudoku);
    expect(validator.validate(sudoku)).toEqual(true);
})