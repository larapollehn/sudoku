import Square from "../Sudoku/Square";

export default class SudokuViewPuzzle{
    public sudokuList: HTMLElement = document.getElementById('sudokuList');
    public generateBtn: HTMLElement = document.getElementById('generateBtn');

    constructor() {
        this.displaySudoku = this.displaySudoku.bind(this);
    }

    displaySudoku(sudoku: Array<Square>){
        sudoku.forEach(square => {
            let li = document.createElement('li');
            li.classList.add('sudokuLiElement');
            let span = document.createElement('span');
            span.innerText = String(square.value);
            li.appendChild(span);
            this.sudokuList.appendChild(li);
        })
    }

}