import Solver from "../src/Sudoku/Solver";
import Generator from "../src/Sudoku/Generator";
import Utility from "../src/Sudoku/Utility";

let generator = new Generator();
let solver = new Solver();

let sudoku = generator.generateSudoku(20);
Utility.printGrid(sudoku);
solver.solveSudoku(sudoku);
console.log('-----');
Utility.printGrid(sudoku);

console.log('-----');
console.log('-----');
console.log('-----');


let sudoku2 = generator.generateSudoku(20);
Utility.printGrid(sudoku2);
solver.solveSudoku(sudoku2);
console.log('-----');
Utility.printGrid(sudoku2);
