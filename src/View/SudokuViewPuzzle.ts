import Square from "../Sudoku/Square";
import Utility from "../Sudoku/Utility";

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
    public eraseBtn: HTMLElement = document.getElementById('eraseBtn');
    public helperModeInput: HTMLInputElement = document.getElementById('helperMode');

    constructor() {
        this.setBackgroundImages = this.setBackgroundImages.bind(this);
        this.displaySudoku = this.displaySudoku.bind(this);
        this.displayOptions = this.displayOptions.bind(this);
        this.highlightCurrentOption = this.highlightCurrentOption.bind(this);
        this.showValidatorMessage = this.showValidatorMessage.bind(this);
        this.displayClock = this.displayClock.bind(this);
        this.displayHighScores = this.displayHighScores.bind(this);
        this.showTimer = this.showTimer.bind(this);
        this.highlightWrongPick = this.highlightWrongPick.bind(this);
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
        let tr = document.createElement('tr');
        let titles = ['Place', 'Date', 'Time'];
        for (let i = 0; i < 3; i++){
            let th = document.createElement('th');
            th.innerText = titles[i];
            tr.appendChild(th);
        }
        this.scoreList.appendChild(tr);

        for (let i = 1; i < 4; i++){
            let tr = document.createElement('tr');
            let place = document.createElement('td');
            place.innerText = `${i}`;
            let date = document.createElement('td');
            date.innerText = String(scores[i][0]);
            let time = document.createElement('td');
            time.innerText = Utility.humanReadable(Number(scores[i][1]));

            tr.appendChild(place);
            tr.appendChild(date);
            tr.appendChild(time);

            this.scoreList.appendChild(tr);
        }

    }

    showTimer() {
        this.timer.style.color = 'white';
    }

    highlightWrongPick(squares: Array<number>, index: number){
        let li = document.getElementsByClassName('sudokuLiElement');
        squares.forEach(square => {
            if(square === index){
                li[square].classList.add('wrongPick');
            }
        })
    }


}