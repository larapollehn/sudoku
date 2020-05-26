import SudokuViewPuzzle from "../View/SudokuViewPuzzle";
import SudokuViewMenu from "../View/SudokuViewMenu";
import Generator from "../Sudoku/Generator";
import Square from "../Sudoku/Square";
import Validator from "../Sudoku/Validator";
import Solver from "../Sudoku/Solver";

export default class SudokuController {
    private puzzleView: SudokuViewPuzzle;
    private Generator: Generator = new Generator();
    private Validator: Validator = new Validator();
    private Solver: Solver = new Solver();
    private currentSudoku: Array<Square>;
    private currentSudokuGrid: Array<Square> = new Array<Square>();
    private sudokuSquares: Map<number, Square>;
    private currentOption: number = 1;
    private filledSquares: Array<number> = new Array<number>();
    private defaultDifficulty: number = 1;
    private currentMode: string;
    private seconds: number;

    constructor() {
        this.puzzleView = new SudokuViewPuzzle();

        this.setup = this.setup.bind(this);
        this.addBtnEventListener = this.addBtnEventListener.bind(this);
        this.setupNewSudoku = this.setupNewSudoku.bind(this);
        this.addSudokuListeners = this.addSudokuListeners.bind(this);
        this.fillEmptySquare = this.fillEmptySquare.bind(this);
        this.setCurrentOption = this.setCurrentOption.bind(this);
        this.setCurrentOptionWithKeyboard = this.setCurrentOptionWithKeyboard.bind(this);
        this.validateSudoku = this.validateSudoku.bind(this);
        this.solveSudoku = this.solveSudoku.bind(this);
        this.setDifficulty = this.setDifficulty.bind(this);
        this.timer = this.timer.bind(this);
    }

    setup() {
        this.addBtnEventListener();
        this.timer();
    }

    addBtnEventListener() {
        this.puzzleView.generateBtn.addEventListener('click', this.setupNewSudoku);
        this.puzzleView.validateBtn.addEventListener('click', this.validateSudoku);
        this.puzzleView.solveBtn.addEventListener('click', this.solveSudoku);
        this.puzzleView.easyBtn.addEventListener('click', this.setDifficulty);
        this.puzzleView.advancedBtn.addEventListener('click', this.setDifficulty);
        this.puzzleView.hardBtn.addEventListener('click', this.setDifficulty);
        this.puzzleView.extremeBtn.addEventListener('click', this.setDifficulty);
    }

    setupNewSudoku() {
        this.seconds = 0;
        this.currentSudoku = this.Generator.generateSudoku(this.defaultDifficulty);
        this.puzzleView.displaySudoku(this.currentSudoku);

        this.currentSudokuGrid = JSON.parse(JSON.stringify(this.currentSudoku));

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

        window.addEventListener('keypress', this.setCurrentOptionWithKeyboard);
    }

    fillEmptySquare(event: any) {
        let squareIndex = event.target.id;
        this.filledSquares.push(squareIndex);
        this.currentSudoku[squareIndex].value = this.currentOption;
        this.puzzleView.displaySudoku(this.currentSudoku);
        this.puzzleView.setClassofFormerEmptySquares(this.filledSquares);
        this.addSudokuListeners();
    }

    setCurrentOption(event: any) {
        this.currentOption = event.target.innerText;
        this.puzzleView.highlightCurrentOption(event.target.id);
    }

    setCurrentOptionWithKeyboard(event: any) {
        this.currentOption = Number(event.key);
        this.puzzleView.highlightCurrentOption(`li${event.key}`);
    }

    validateSudoku() {
        if (this.Validator.validate(this.currentSudoku)) {
            this.puzzleView.showValidatorMessage('Super! Deine Lösung ist Richtig :D');
        } else {
            this.puzzleView.showValidatorMessage('Leider Falsch. Versuche es doch nochmal.');
        }
    }

    solveSudoku() {
        this.Solver.solveSudoku(this.currentSudokuGrid);
        this.puzzleView.displaySudoku(this.currentSudokuGrid);
    }

    setDifficulty(event: any) {
        if (event.target.id === 'easyBtn') {
            this.currentMode = 'easy';
            this.defaultDifficulty = 20;
            this.setupNewSudoku();
        } else if (event.target.id === 'advancedBtn') {
            this.currentMode = 'advanced';
            this.defaultDifficulty = 30;
            this.setupNewSudoku();
        } else if (event.target.id === 'hardBtn') {
            this.currentMode = 'hard';
            this.defaultDifficulty = 35;
            this.setupNewSudoku();
        } else if (event.target.id === 'extremeBtn') {
            this.currentMode = 'extreme';
            this.defaultDifficulty = 45;
            this.setupNewSudoku();
            this.extremeMode();
            this.strobo();
        }
    }

    extremeMode() {
        this.filledSquares = this.filledSquares.map(num => {
            return 80 - num;
        });
        this.puzzleView.setClassofFormerEmptySquares(this.filledSquares);

        this.currentSudoku = this.currentSudoku.reverse().map(square =>{
            let newSquare = square;
            newSquare.index = 80 - square.index;
            return newSquare;
        })
        this.puzzleView.displaySudoku(this.currentSudoku);

        this.puzzleView.setClassofFormerEmptySquares(this.filledSquares);

        this.sudokuSquares = new Map();
        this.currentSudoku.forEach(square => {
            this.sudokuSquares.set(square.index, square);
        });

        this.addSudokuListeners();
    }

    strobo(){
        this.puzzleView.displayStrobo('on');
        setTimeout(() => {
            this.puzzleView.displayStrobo('off');
        }, 500);
    }

    humanReadable(seconds: number) {
        let time_left = seconds;
        let human_readable: Array<string> = [];
        [3600, 60, 1].forEach((unit) => {
            let time = Math.floor(time_left / unit);
            human_readable.push(time_left / unit < 1 ? '00' : String(time).padStart(2, '0'));
            time_left = time_left - (time * unit);
        });
        return human_readable.join(":");
    }

    timer() {
        setInterval(() => {
            this.seconds++
            let time = this.humanReadable(this.seconds);
            this.puzzleView.displayClock(time);
            if (this.currentMode === 'extreme' && this.seconds % 5 === 0) {
                this.extremeMode();
            }
            if(this.currentMode === 'extreme'){
                this.strobo();
            }
        }, 1000);
    }

}