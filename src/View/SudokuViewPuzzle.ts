import Square from "../Sudoku/Square";

export default class SudokuViewPuzzle {
    public sudokuList: HTMLElement = document.getElementById('sudokuList');
    public optionsList: HTMLElement = document.getElementById('optionsList');
    public generateBtn: HTMLElement = document.getElementById('generateBtn');
    public validateBtn: HTMLElement = document.getElementById('validateBtn');

    constructor() {
        this.displaySudoku = this.displaySudoku.bind(this);
        this.displayOptions = this.displayOptions.bind(this);
        this.highlightCurrentOption = this.highlightCurrentOption.bind(this);
        this.showValidatorMessage = this.showValidatorMessage.bind(this);
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

    displayOptions(){
        while(this.optionsList.hasChildNodes()){
            this.optionsList.removeChild(this.optionsList.firstChild);
        }
        for (let i = 1; i < 10; i++){
            let li = document.createElement('li');
            li.innerText = String(i);
            li.id = `li${i}`;
            li.classList.add('optionsList')
            this.optionsList.appendChild(li);
        }
    }

    highlightCurrentOption(id: string){
        let oldOption = document.getElementsByClassName('highlightCurrentOption');
        if (oldOption[0]){
            oldOption[0].classList.remove('highlightCurrentOption');
        }

        let currentOption = document.getElementById(id);
        currentOption.classList.add('highlightCurrentOption');
    }

    setClassofFormerEmptySquares(squares: Array<number>){
        let li = document.getElementsByClassName('sudokuLiElement');
        squares.forEach(square => {
            li[square].classList.add('emptySquare');
        })
    }

    showValidatorMessage(msg: string){
        let msgContainer = document.getElementById('validationMsg');
        msgContainer.innerText = msg;
        setTimeout(function () {
            msgContainer.innerText = '';
        }, 5000);
    }

}