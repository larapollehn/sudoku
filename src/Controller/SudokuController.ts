import SudokuViewPuzzle from "../View/SudokuViewPuzzle";
import SudokuViewMenu from "../View/SudokuViewMenu";
import Generator from "../Sudoku/Generator";
import Square from "../Sudoku/Square";

export default class SudokuController{
    private puzzleView: SudokuViewPuzzle;
    private Generator: Generator = new Generator();
    private currentSudoku: Array<Square>;

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
        this.currentSudoku = this.Generator.generateSudoku(30);
        this.puzzleView.displaySudoku(this.currentSudoku);
        this.addEmptySquareListeners();
        this.puzzleView.displayOptions();
    }

    addEmptySquareListeners(){
        let emptySquares = document.getElementsByClassName('emptySquare');
        for (let emptySquare of emptySquares) {
            emptySquare.addEventListener('click', this.getEmptySquare);
        }
    }

    getEmptySquare(event: any){
        console.log('clicked', event.target.id);
    }
}