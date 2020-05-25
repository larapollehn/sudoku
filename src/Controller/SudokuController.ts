import SudokuViewPuzzle from "../View/SudokuViewPuzzle";
import SudokuViewMenu from "../View/SudokuViewMenu";
import Generator from "../Sudoku/Generator";

export default class SudokuController{
    private puzzleView: SudokuViewPuzzle;
    private Generator: Generator = new Generator();

    constructor() {
        this.puzzleView = new SudokuViewPuzzle();

        this.addEventListener = this.addEventListener.bind(this);
        this.generateSudoku = this.generateSudoku.bind(this);
    }

    setup(){
        this.addEventListener();
    }

    addEventListener(){
        this.puzzleView.generateBtn.addEventListener('click', this.generateSudoku);
    }

    generateSudoku(){
        console.log('BITCH SOMEONE TICKLED MY ASS');
        let sudoku = this.Generator.generateSudoku(30);
        this.puzzleView.displaySudoku(sudoku);
    }
}