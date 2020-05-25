import Square from "../Sudoku/Square";

export default class SudokuViewPuzzle {
    public sudokuList: HTMLElement = document.getElementById('sudokuList');
    public optionsList: HTMLElement = document.getElementById('optionsList');
    public generateBtn: HTMLElement = document.getElementById('generateBtn');

    constructor() {
        this.displaySudoku = this.displaySudoku.bind(this);
        this.displayOptions = this.displayOptions.bind(this);
    }

    displaySudoku(sudoku: Array<Square>) {
        while (this.sudokuList.hasChildNodes()) {
            this.sudokuList.removeChild(this.sudokuList.firstChild);
        }

        sudoku.forEach(square => {
            let li = document.createElement('li');
            li.classList.add('sudokuLiElement');
            li.id = String(square.index);
            let span = document.createElement('span');
            if (square.value !== 0) {
                span.innerText = String(square.value);
            } else {
                li.classList.add('emptySquare');
            }
            li.appendChild(span);
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
            li.id = String(i);
            li.classList.add('optionsList')
            this.optionsList.appendChild(li);
        }
    }

}