import Square from "../Sudoku/Square";

export default class SudokuViewPuzzle {
    public sudokuSection: HTMLElement = document.getElementById('puzzleSection');
    public sudokuList: HTMLElement = document.getElementById('sudokuList');
    public optionsList: HTMLElement = document.getElementById('optionsList');
    public generateBtn: HTMLElement = document.getElementById('generateBtn');
    public validateBtn: HTMLElement = document.getElementById('validateBtn');
    public solveBtn: HTMLElement = document.getElementById('solveBtn');
    public easyBtn: HTMLElement = document.getElementById('easyBtn');
    public advancedBtn: HTMLElement = document.getElementById('advancedBtn');
    public hardBtn: HTMLElement = document.getElementById('hardBtn');
    public extremeBtn: HTMLElement = document.getElementById('extremeBtn');
    public timer: HTMLElement = document.getElementById('timer');
    public scoreList: HTMLElement = document.getElementById('highScores');

    constructor() {
        this.setBackgroundImages = this.setBackgroundImages.bind(this);
        this.displaySudoku = this.displaySudoku.bind(this);
        this.displayOptions = this.displayOptions.bind(this);
        this.highlightCurrentOption = this.highlightCurrentOption.bind(this);
        this.showValidatorMessage = this.showValidatorMessage.bind(this);
        this.displayClock = this.displayClock.bind(this);
        this.displayHighScores = this.displayHighScores.bind(this);
        this.showTimer = this.showTimer.bind(this);
    }

    setBackgroundImages() {
    }

    displaySudoku(sudoku: Array<Square>) {
        while (this.sudokuList.hasChildNodes()) {
            this.sudokuList.removeChild(this.sudokuList.firstChild);
        }

        sudoku.forEach(square => {
            let li = document.createElement('li');
            li.classList.add('sudokuLiElement');
            li.id = String(square.index);
            if (square.value !== 0) {
                li.innerText = String(square.value);
            } else {
                li.classList.add('emptySquare');
            }
            this.sudokuList.appendChild(li);
        })
    }

    displayOptions() {
        while (this.optionsList.hasChildNodes()) {
            this.optionsList.removeChild(this.optionsList.firstChild);
        }
        for (let i = 1; i < 10; i++) {
            let li = document.createElement('li');
            li.innerText = String(i);
            li.id = `li${i}`;
            li.classList.add('optionsList')
            this.optionsList.appendChild(li);
        }
    }

    highlightCurrentOption(id: string) {
        let oldOption = document.getElementsByClassName('highlightCurrentOption');
        if (oldOption[0]) {
            oldOption[0].classList.remove('highlightCurrentOption');
        }

        let currentOption = document.getElementById(id);
        currentOption.classList.add('highlightCurrentOption');
    }

    setClassofFormerEmptySquares(squares: Array<number>) {
        let li = document.getElementsByClassName('sudokuLiElement');
        squares.forEach(square => {
            li[square].classList.add('emptySquare');
        })
    }

    showValidatorMessage(msg: string) {
        let msgContainer = document.getElementById('validationMsg');
        msgContainer.innerText = msg;
        setTimeout(function () {
            msgContainer.innerText = '';
        }, 5000);
    }

    displayClock(time: string) {
        this.timer.innerText = time;
    }

    displayStrobo(state: string) {
        let listElements = document.getElementsByClassName('sudokuLiElement');
        if (state === 'on') {
            for (let listElement of listElements) {
                listElement.classList.add('strobo');
            }
        } else {
            for (let listElement of listElements) {
                listElement.classList.remove('strobo');
            }
        }
    }

    displayHighScores(scores: Array<Array<string | number>>) {
        while (this.scoreList.hasChildNodes()) {
            this.scoreList.removeChild(this.scoreList.firstChild);
        }

        scores.forEach(score => {
            let li = document.createElement('li');
            li.innerText = `${score[0]} - ${score[1]}`;
            li.classList.add('scoreListEntry');
            this.scoreList.appendChild(li);
        })
    }

    showTimer() {
        this.timer.style.color = 'white';
    }


}