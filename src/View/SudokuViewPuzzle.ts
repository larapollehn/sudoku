import Square from "../Sudoku/Square";
import Utility from "../Sudoku/Utility";

// @ts-ignore
import cat from "./../../public/assets/png/1.png";
// @ts-ignore
import bee from "./../../public/assets/png/2.png";
// @ts-ignore
import elephant from "./../../public/assets/png/3.png";
// @ts-ignore
import frog from "./../../public/assets/png/4.png";
// @ts-ignore
import ladybug from "./../../public/assets/png/5.png";
// @ts-ignore
import monkey from "./../../public/assets/png/6.png";
// @ts-ignore
import pig from "./../../public/assets/png/7.png";
// @ts-ignore
import bunny from "./../../public/assets/png/8.png";
// @ts-ignore
import whale from "./../../public/assets/png/9.png";
// @ts-ignore
import eraserIcon from "./../../public/assets/png/eraser.png";
// @ts-ignore
import helperIcon from "./../../public/assets/png/warning.png";
// @ts-ignore
import solutionIcon from "./../../public/assets/png/checkmark.png";

export default class SudokuViewPuzzle {
    public sudokuSection: HTMLElement = document.getElementById('puzzleSection');
    public sudokuList: HTMLElement = document.getElementById('sudokuList');
    public optionsList: HTMLElement = document.getElementById('optionsList');
    public generateBtn: HTMLElement = document.getElementById('generateBtn');
    public solveBtn: HTMLElement = document.getElementById('solveBtn');
    public solutionIcon: HTMLElement = document.getElementById('solutionIcon');
    public easyBtn: HTMLElement = document.getElementById('easyBtn');
    public eraseIcon: HTMLElement = document.getElementById('eraserIcon')
    public advancedBtn: HTMLElement = document.getElementById('advancedBtn');
    public hardBtn: HTMLElement = document.getElementById('hardBtn');
    public extremeBtn: HTMLElement = document.getElementById('extremeBtn');
    public timer: HTMLElement = document.getElementById('timer');
    public scoreList: HTMLElement = document.getElementById('highScores');
    public eraseBtn: HTMLElement = document.getElementById('eraseBtn');
    public helperModeBtn: HTMLElement = document.getElementById('helperMode');
    public helperIcon: HTMLElement = document.getElementById('helperIcon');
    public kidsBtn: HTMLElement = document.getElementById('kidsBtn');
    public startSudokuBtn: HTMLElement = document.getElementById('startSudokuBtn');
    public levelDropBtn: HTMLElement = document.getElementById('dropBtn');
    public kidsScoreBtn: HTMLElement = document.getElementById('kidsScores');
    public easyScoreBtn: HTMLElement = document.getElementById('easyScores');
    public advancedScoreBtn: HTMLElement = document.getElementById('advancedScores');
    public hardScoreBtn: HTMLElement = document.getElementById('hardScores');
    public extremeScoreBtn: HTMLElement = document.getElementById('extremeScores');
    public solverOptionBtn: HTMLElement = document.getElementById('solveOptionBtn');

    constructor() {
        this.setIcons = this.setIcons.bind(this);
        this.displaySudoku = this.displaySudoku.bind(this);
        this.displayOptions = this.displayOptions.bind(this);
        this.highlightCurrentOption = this.highlightCurrentOption.bind(this);
        this.showValidatorMessage = this.showValidatorMessage.bind(this);
        this.displayClock = this.displayClock.bind(this);
        this.displayHighScores = this.displayHighScores.bind(this);
        this.showTimer = this.showTimer.bind(this);
        this.highlightWrongPick = this.highlightWrongPick.bind(this);
        this.displayKidsSudoku = this.displayKidsSudoku.bind(this);
        this.markBtn = this.markBtn.bind(this);
        this.clearSudoku = this.clearSudoku.bind(this);
        this.displayStartBtn = this.displayStartBtn.bind(this);
        this.displayCurrentLevel = this.displayCurrentLevel.bind(this);
        this.markCurrentScoreBoard = this.markCurrentScoreBoard.bind(this);
    }

    setIcons() {
        this.eraseIcon.style.backgroundImage = 'url("' + eraserIcon + '")';
        this.eraseIcon.style.backgroundSize = '100% 90%';
        this.eraseIcon.style.backgroundRepeat = 'no-repeat';

        this.helperIcon.style.backgroundImage = 'url("' + helperIcon + '")';
        this.helperIcon.style.backgroundSize = '100% 90%';
        this.helperIcon.style.backgroundRepeat = 'no-repeat';

        this.solutionIcon.style.backgroundImage = 'url("' + solutionIcon + '")';
        this.solutionIcon.style.backgroundSize = '100% 90%';
        this.solutionIcon.style.backgroundRepeat = 'no-repeat';
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
        });
    }

    clearSudoku(){
        while (this.sudokuList.hasChildNodes()) {
            this.sudokuList.removeChild(this.sudokuList.firstChild);
        }
    }

    displayKidsSudoku(sudoku: Array<Square>) {
        while (this.sudokuList.hasChildNodes()) {
            this.sudokuList.removeChild(this.sudokuList.firstChild);
        }
        sudoku.forEach(square => {
            let li = document.createElement('li');
            li.classList.add('sudokuLiElement');
            li.id = String(square.index);
            if (square.value !== 0) {
                li.style.backgroundImage = 'url("' + square.picture + '")';
                li.style.backgroundSize = 'cover';
            } else {
                li.classList.add('emptySquare');
            }
            this.sudokuList.appendChild(li);
        });
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

    displayKidsOptions() {
        while (this.optionsList.hasChildNodes()) {
            this.optionsList.removeChild(this.optionsList.firstChild);
        }
        let options = [cat, bee, elephant, frog, ladybug, monkey, pig, bunny, whale];
        for (let i = 0; i < 9; i++) {
            let li = document.createElement('li');
            li.style.backgroundImage = 'url("' + options[i] + '")';
            li.style.backgroundSize = 'cover';
            li.id = `li${i + 1}`;
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
        msgContainer.style.backgroundColor = '#003232';
        setTimeout(function () {
            msgContainer.innerText = '';
            msgContainer.style.backgroundColor = 'transparent';
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
        for (let i = 0; i < 3; i++) {
            let th = document.createElement('th');
            th.innerText = titles[i];
            th.classList.add('trHeader');
            tr.appendChild(th);
        }
        this.scoreList.appendChild(tr);
        if (scores !== null && scores.length !== 0) {
            for (let i = 0; i < scores.length; i++) {
                let tr = document.createElement('tr');
                let place = document.createElement('td');
                place.classList.add('timeTd');
                place.innerText = `${i + 1}`;
                let date = document.createElement('td');
                date.classList.add('timeTd');
                date.innerText = String(scores[i][0]);
                let time = document.createElement('td');
                time.classList.add('timeTd');
                time.innerText = Utility.humanReadable(Number(scores[i][1]));

                tr.appendChild(place);
                tr.appendChild(date);
                tr.appendChild(time);

                this.scoreList.appendChild(tr);
            }
        }
    }

    showTimer() {
        this.timer.style.color = 'black';
    }

    highlightWrongPick(squares: Array<number>) {
        let li = document.getElementsByClassName('sudokuLiElement');
        squares.forEach(square => {
            li[square].classList.add('wrongPick');

        })
    }

    markBtn(className: string, activated: boolean) {
        if (className === 'activeEraser') {
            if (activated) {
                this.eraseBtn.classList.add('activeEraser');
            } else {
                this.eraseBtn.classList.remove('activeEraser');
            }
        } else if (className === 'activeHelper') {
            if (activated) {
                this.helperModeBtn.classList.add('activeHelper');
            } else {
                this.helperModeBtn.classList.remove('activeHelper');
            }
        }
    }

    displayStartBtn(show: boolean){
        if(show === true){
            this.startSudokuBtn.style.display = 'block';
        } else {
            this.startSudokuBtn.style.display = 'none';
        }
    }

    displayCurrentLevel(level: string){
        this.levelDropBtn.innerHTML = `${level.toUpperCase()} <i class="fa fa-caret-down"></i>`;
    }

    markCurrentScoreBoard(id: string){
        let marked = document.getElementsByClassName('selectedScoreOption');
        if (marked[0]){
            marked[0].classList.remove('selectedScoreOption')
        }

        let currentBoard = document.getElementById(id);
        currentBoard.classList.add('selectedScoreOption')
    }



}