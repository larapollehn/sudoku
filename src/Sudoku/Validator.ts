import Square from "./Square";
import Utility from "./Utility";

export default class Validator {
    private sudoku: Array<Square>

    constructor() {
    }

    private rowIsValid() {
        let row = new Set();
        for (let i = 0; i < this.sudoku.length; i++) {
            if (!row.has(this.sudoku[i].value)) {
                row.add(this.sudoku[i].value);
            } else {
                return false;
            }
            if (row.size === 9) {
                row.clear();
            }
        }
        return true;
    }

    private validInRow(index: number, value: number) {
        let row = Utility.getRow(index + 1) - 1;
        for (let i = row * 9; i < (row * 9) + 9; i++) {
            if (this.sudoku[i].value === value) {
                return false;
            }
        }
        return true;
    }

    private columnIsValid() {
        let column = new Set();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 81; j += 9) {
                if (!column.has(this.sudoku[i + j].value)) {
                    column.add(this.sudoku[i + j].value);
                } else {
                    return false;
                }
            }
            if (column.size === 9) {
                column.clear();
            }
        }
        return true;
    }

    private validInColumn(index: number, value: number) {
        let column = Utility.getColumn(index + 1) - 1;
        for (let i = column; i < 81; i += 9) {
            if (this.sudoku[i].value === value) {
                return false;
            }
        }
        return true;
    }

    private subGridIsValid() {
        let subGrid = new Set();
        for (let i = 0; i < 81; i += 27) {
            for (let j = 0; j < 9; j += 3) {
                for (let k = 0; k < 21; k += 9) {
                    for (let m = 0; m < 3; m++) {
                        if (!subGrid.has(this.sudoku[i + j + k + m].value)) {
                            subGrid.add(this.sudoku[i + j + k + m].value);
                        } else {
                            return false;
                        }
                    }
                }
                if (subGrid.size === 9) {
                    subGrid.clear();
                }
            }
        }
        return true;
    }

    private validInSubGrid(index: number, value: number) {
        let subGrid = Utility.getSubGrid(index + 1);
        let start;
        if (subGrid === 1) {
            start = 0;
        } else if (subGrid === 2) {
            start = 3;
        } else if (subGrid === 3) {
            start = 6;
        } else if (subGrid === 4) {
            start = 27;
        } else if (subGrid === 5) {
            start = 30;
        } else if (subGrid === 6) {
            start = 33;
        } else if (subGrid === 7) {
            start = 54;
        } else if (subGrid === 8) {
            start = 57;
        } else if (subGrid === 9) {
            start = 60;
        }

        for (let i = start; i < (i + (2 * 9) + 1); i += 9) {
            for (let j = 0; j < 3; j++){
                if (this.sudoku[i+j].value === value) {
                    return false;
                }
            }
        }
        return true;
    }

    validate(sudoku: Array<Square>) {
        this.sudoku = sudoku;
        let result = this.rowIsValid();
        if (result) {
            result = this.columnIsValid();
        }
        if (result) {
            return this.subGridIsValid();
        }
        return false;
    }

    validateSetNumber(index: number, value: number){
        let valid = this.validInRow(index, value);
        if(valid){
            valid = this.validInColumn(index, value);
        }
        if(valid){
            return this.validInSubGrid(index, value);
        }
        return false;
    }


}