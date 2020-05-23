import Solver from "../src/Sudoku/Solver";
import Generator from "../src/Sudoku/Generator";
import Utility from "../src/Sudoku/Utility";

let generator = new Generator(20);
let sudoku = generator.generateSudoku();
Utility.printGrid(sudoku);
console.log('-----');
let solver = new Solver(sudoku);
solver.solveSudoku();
Utility.printGrid(sudoku);