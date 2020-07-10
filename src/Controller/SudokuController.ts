import SudokuViewPuzzle from "../View/SudokuViewPuzzle";
import Generator from "../Sudoku/Generator";
import Square from "../Sudoku/Square";
import Validator from "../Sudoku/Validator";
import Solver from "../Sudoku/Solver";
import Utility from "../Sudoku/Utility";
import {numberAnimalsMapping} from "../Globals";

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
    private defaultDifficulty: number = 20;
    private currentMode: string = 'easy';
    private seconds: number = 0;
    private timeScores: Array<Array<string | number>> = new Array<Array<string | number>>();
    private eraseMode: boolean = false;
    private helperMode: boolean = false;
    private wrongSquares: Array<number> = new Array<number>();
    private timerFunction: number;


    constructor() {
        this.puzzleView = new SudokuViewPuzzle();

        this.fillEmptySquare = this.fillEmptySquare.bind(this);
    }

    setup = () => {
        this.puzzleView.setIcons();
        this.addBtnEventListener();
        this.showScoreBoard();
        this.puzzleView.displayOptions();
        this.puzzleView.displayClock('00:00:00');
    }

    addBtnEventListener = () => {
        this.puzzleView.generateBtn.addEventListener('click', this.generateNewBoard);
        this.puzzleView.solveBtn.addEventListener('click', this.solveSudoku);
        this.puzzleView.easyBtn.addEventListener('click', this.setDifficulty);
        this.puzzleView.advancedBtn.addEventListener('click', this.setDifficulty);
        this.puzzleView.hardBtn.addEventListener('click', this.setDifficulty);
        this.puzzleView.extremeBtn.addEventListener('click', this.setDifficulty);
        this.puzzleView.eraseBtn.addEventListener('click', this.activateEraseMode);
        this.puzzleView.helperModeBtn.addEventListener('click', this.activateHelperMode);
        this.puzzleView.kidsBtn.addEventListener('click', this.setDifficulty);
        this.puzzleView.startSudokuBtn.addEventListener('click', this.startGame);
        this.puzzleView.kidsScoreBtn.addEventListener('click', this.changeScoreBoard);
        this.puzzleView.easyScoreBtn.addEventListener('click', this.changeScoreBoard);
        this.puzzleView.advancedScoreBtn.addEventListener('click', this.changeScoreBoard);
        this.puzzleView.hardScoreBtn.addEventListener('click', this.changeScoreBoard);
        this.puzzleView.extremeScoreBtn.addEventListener('click', this.changeScoreBoard);
        this.puzzleView.solverOptionBtn.addEventListener('click', this.setDifficulty);
        this.puzzleView.infoBtn.addEventListener('click', this.openSideBar);
        this.puzzleView.closeSideBarBtn.addEventListener('click', this.closeSideBar);
    }

    /**
     * reset timer for new game, manage visibility of helper features based on current mode
     */
    startGame = () => {
        this.puzzleView.displayStartBtn(false);
        this.stopTimer();
        this.clearTimer();
        if(this.currentMode !== 'solver'){
            this.timer();
        } else {
            this.puzzleView.hideSolverFeatures();
        }
        this.setupNewSudoku();
    }

    /**
     *
     */
    generateNewBoard = () =>{
        this.puzzleView.clearSudoku();
        this.stopTimer();
        this.clearTimer();
        if(this.currentMode !== 'solver'){
            this.puzzleView.displayStartBtn(true);
        } else {
            this.setupNewSudoku();
        }

    }

    setupNewSudoku = () => {
        this.currentSudoku = this.Generator.generateSudoku(this.defaultDifficulty);

        if (this.currentMode === 'kids') {
            this.puzzleView.displayKidsSudoku(this.currentSudoku);
        } else {
            this.puzzleView.displaySudoku(this.currentSudoku);
        }

        this.currentSudokuGrid = JSON.parse(JSON.stringify(this.currentSudoku));

        this.sudokuSquares = new Map();
        this.currentSudoku.forEach(square => {
            this.sudokuSquares.set(square.index, square);
        });

        this.filledSquares = new Array<number>();
        this.wrongSquares = new Array<number>();

        this.addSudokuListeners();
    }

    addSudokuListeners = () => {
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

    fillEmptySquare = (event: any) => {
        let squareIndex = event.target.id;
        if (this.eraseMode) {
            let index = this.filledSquares.indexOf(squareIndex);
            this.filledSquares.splice(index, 1);
            this.currentSudoku[squareIndex].value = 0;
            if (this.currentMode === 'kids') {
                this.puzzleView.displayKidsSudoku(this.currentSudoku);
            } else {
                this.puzzleView.displaySudoku(this.currentSudoku);
            }
            this.puzzleView.setClassofFormerEmptySquares(this.filledSquares);
            this.addSudokuListeners();
        } else if (this.helperMode) {
            this.filledSquares.push(squareIndex);
            this.currentSudoku[squareIndex].value = Number(this.currentOption);
            this.puzzleView.displaySudoku(this.currentSudoku);
            this.puzzleView.setClassofFormerEmptySquares(this.filledSquares);

            let validPick = this.Validator.validateSetNumber(this.currentSudoku, squareIndex, this.currentOption);

            if (validPick === false) {
                this.wrongSquares.push(squareIndex);
            } else {
                if (this.wrongSquares.indexOf(squareIndex) !== -1) {
                    let index = this.wrongSquares.indexOf(squareIndex);
                    this.wrongSquares.splice(index, 1);
                }
            }
            this.puzzleView.highlightWrongPick(this.wrongSquares);
            this.addSudokuListeners();
        } else {
            this.filledSquares.push(squareIndex);
            if (this.currentMode === 'kids') {
                this.currentSudoku[squareIndex].value = Number(this.currentOption);
                this.currentSudoku[squareIndex].picture = numberAnimalsMapping.get(Number(this.currentOption));
                this.puzzleView.displayKidsSudoku(this.currentSudoku);
            } else {
                this.currentSudoku[squareIndex].value = Number(this.currentOption);
                this.puzzleView.displaySudoku(this.currentSudoku);
            }
            this.puzzleView.setClassofFormerEmptySquares(this.filledSquares);
            this.addSudokuListeners();
        }


        if (this.finished()) {
            this.validateSudoku();
        }

    }

    finished = () => {
        for (let i = 0; i < this.currentSudoku.length; i++) {
            if (this.currentSudoku[i].value === 0) {
                return false;
            }
        }
        return true;
    }

    setCurrentOption = (event: any) => {
        this.currentOption = event.target.id.slice(2,3);
        this.puzzleView.highlightCurrentOption(event.target.id);
    }

    setCurrentOptionWithKeyboard = (event: any) => {
        this.currentOption = Number(event.key);
        this.puzzleView.highlightCurrentOption(`li${event.key}`);
    }

    validateSudoku = () => {
        if (this.Validator.validate(this.currentSudoku)) {
            this.puzzleView.showValidatorMessage('Super! Deine Lösung ist Richtig :D');
            this.markHighscore(new Date().toLocaleTimeString(), this.seconds);
            this.stopTimer();
        } else {
            this.puzzleView.showValidatorMessage('Leider Falsch. Findest die den Fehler?');
        }
    }

    solveSudoku = () => {
        if(this.currentMode === 'solver'){
            this.Solver.solveSudoku(this.currentSudoku);
            this.puzzleView.displaySudoku(this.currentSudoku);
        } else {
            this.Solver.solveSudoku(this.currentSudokuGrid);
            this.stopTimer();
            if (this.currentMode === 'kids') {
                this.puzzleView.displayKidsSudoku(this.currentSudokuGrid);
            } else {
                this.puzzleView.displaySudoku(this.currentSudokuGrid);
            }
        }

    }

    setDifficulty = (event: any) => {
        this.timeScores = new Array<Array<string | number>>();
        if (event.target.id === 'easyBtn') {
            this.currentMode = 'easy';
            this.defaultDifficulty = 20;
            this.showScoreBoard();
            this.puzzleView.enableBtn();
        } else if (event.target.id === 'advancedBtn') {
            this.currentMode = 'advanced';
            this.defaultDifficulty = 30;
            this.showScoreBoard();
            this.puzzleView.enableBtn();
        } else if (event.target.id === 'hardBtn') {
            this.currentMode = 'hard';
            this.defaultDifficulty = 40;
            this.puzzleView.enableBtn();
            this.showScoreBoard();
        } else if (event.target.id === 'extremeBtn') {
            this.currentMode = 'extreme';
            this.defaultDifficulty = 30;
            this.showScoreBoard();
            this.puzzleView.disableBtn();
        } else if (event.target.id === 'kidsBtn') {
            this.currentMode = 'kids';
            this.defaultDifficulty = 10;
            this.showScoreBoard();
            this.puzzleView.disableBtn();
        } else if (event.target.id === 'solveOptionBtn'){
            this.currentMode = 'solver';
            this.defaultDifficulty = 81;
            this.puzzleView.disableBtn();
        }
        this.puzzleView.displayCurrentLevel(this.currentMode);
        this.puzzleView.clearSudoku();
        this.stopTimer();
        this.clearTimer();
        if(this.currentMode !== 'solver'){
            this.puzzleView.displayStartBtn(true);
            this.puzzleView.showTimer();
            let scoreBoard = JSON.parse(localStorage.getItem(`HighScore${this.currentMode}`));
            this.puzzleView.displayHighScores(scoreBoard);
        } else {
            this.puzzleView.displayStartBtn(false);
            this.startGame();
        }
        if (this.currentMode === 'kids') {
            this.puzzleView.displayKidsOptions();
        } else {
            this.puzzleView.displayOptions();
        }
        this.puzzleView.startSudokuBtn.addEventListener('click', this.startGame);
    }

    extremeMode = () => {
        this.filledSquares = this.filledSquares.map(num => {
            return 80 - num;
        });
        this.puzzleView.setClassofFormerEmptySquares(this.filledSquares);

        this.currentSudoku = this.currentSudoku.reverse().map(square => {
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

    strobo = () => {
        this.puzzleView.displayStrobo('on');
        setTimeout(() => {
            this.puzzleView.displayStrobo('off');
        }, 200);
    }

    timer = () => {
      this.timerFunction = setTimeout(this.addSeconds, 1000);
    }

    addSeconds = () => {
        this.seconds++;
        if(this.currentMode === 'extreme' && this.seconds % 5 === 0){
            this.extremeMode();
            this.strobo();
        } else if (this.currentMode === 'extreme'){
            this.strobo();
        }
        this.puzzleView.displayClock(String(Utility.humanReadable(this.seconds)));
        this.timer();
    }

    stopTimer = () =>{
        clearTimeout(this.timerFunction);
    }

    clearTimer = () =>{
        this.puzzleView.displayClock(String(Utility.humanReadable(0)));
        this.seconds = 0;
    }

    markHighscore = (time: string, seconds: number) => {
        if (localStorage.getItem(`HighScore${this.currentMode}`) === null) {
            this.timeScores.push([time, seconds]);
            let score = JSON.stringify(this.timeScores);
            localStorage.setItem(`HighScore${this.currentMode}`, score);
            this.puzzleView.displayHighScores([[time, seconds]]);
        } else {
            let former = JSON.parse(localStorage.getItem(`HighScore${this.currentMode}`));
            former.push([time, seconds]);
            this.timeScores = former;
            former.sort((a: Array<number>, b: Array<number>) => {
                return a[1] - b[1];
            });
            if (former.length > 10) {
                former = former.slice(0, 3);
            }
            let score = JSON.stringify(former);
            localStorage.setItem(`HighScore${this.currentMode}`, score);
            this.puzzleView.displayHighScores(former);
        }
    }

    activateEraseMode = () => {
        console.log(this.eraseMode);
        this.eraseMode = !this.eraseMode;
        this.puzzleView.markBtn('activeEraser', this.eraseMode);
    }

    activateHelperMode = () => {
        if(this.currentMode !== 'kids' && this.currentMode !== 'extreme' && this.currentMode !== 'solver'){
            this.helperMode = !this.helperMode;
            this.puzzleView.markBtn('activeHelper', this.helperMode);
        } else {

        }

    }

    changeScoreBoard = (event: any) => {
        let scoreBoard = JSON.parse(localStorage.getItem(`HighScore${event.target.innerText.toLowerCase()}`));
        this.puzzleView.displayHighScores(scoreBoard);
        this.puzzleView.markCurrentScoreBoard(event.target.id);
    }

    showScoreBoard = () =>{
        let scoreBoard = JSON.parse(localStorage.getItem(`HighScore${this.currentMode}`));
        this.puzzleView.displayHighScores(scoreBoard);
        this.puzzleView.markCurrentScoreBoard(`${this.currentMode}Scores`);
    }

    openSideBar = () =>{
        this.puzzleView.openSideBar();
    }

    closeSideBar = () =>{
        this.puzzleView.closeSideBar();
    }

}
