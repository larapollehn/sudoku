import Solver from "../src/Sudoku/Solver";
import Generator from "../src/Sudoku/Generator";
import Utility from "../src/Sudoku/Utility";

let generator = new Generator();
let sudoku = generator.generateSudoku(20);
Utility.printGrid(sudoku);
console.log('-----');
let sudoku2 = generator.generateSudoku(20);
Utility.printGrid(sudoku2);