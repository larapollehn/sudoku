import SudokuViewPuzzle from "../View/SudokuViewPuzzle";
import SudokuViewMenu from "../View/SudokuViewMenu";
import Generator from "../Sudoku/Generator";
import Square from "../Sudoku/Square";

export default class SudokuController {
    private puzzleView: SudokuViewPuzzle;
    private Generator: Generator = new Generator();
    private currentSudoku: Array<Square>;
    private sudokuSquares: Map<number, Square>;
    private currentOption: number;

    constructor() {
        this.puzzleView = new SudokuViewPuzzle();

        this.setup = this.setup.bind(this);
        this.addBtnEventListener = this.addBtnEventListener.bind(this);
        this.setupNewSudoku = this.setupNewSudoku.bind(this);
        this.addSudokuListeners = this.addSudokuListeners.bind(this);
        this.fillEmptySquare = this.fillEmptySquare.bind(this);
        this.setCurrentOption = this.setCurrentOption.bind(this);
    }

    setup() {
        this.addBtnEventListener();
    }

    addBtnEventListener() {
        this.puzzleView.generateBtn.addEventListener('click', this.setupNewSudoku);
    }

    setupNewSudoku() {
        this.currentSudoku = this.Generator.generateSudoku(30);
        this.puzzleView.displaySudoku(this.currentSudoku);

        this.sudokuSquares = new Map();
        this.currentSudoku.forEach(square => {
            this.sudokuSquares.set(square.index, square);
        });

        this.puzzleView.displayOptions();
        this.addSudokuListeners();
    }

    addSudokuListeners() {
        let emptySquares = document.getElementsByClassName('emptySquare');
        for (let emptySquare of emptySquares) {
            emptySquare.addEventListener('click', this.fillEmptySquare);
        }

        let options = document.getElementsByClassName('optionsList');
        for (let option of options) {
            option.addEventListener('click', this.setCurrentOption);
        }
    }

    fillEmptySquare(event: any) {
        let squareIndex = event.target.id;
        this.currentSudoku[squareIndex].value = this.currentOption;
        this.puzzleView.displaySudoku(this.currentSudoku);
        this.addSudokuListeners();

    }

    setCurrentOption(event: any) {
        let option = event.target.id;
        this.currentOption = event.target.innerText;
        this.puzzleView.highlightCurrentOption(option);
    }
}