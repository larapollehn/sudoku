import Square from "./Square";
import Utility from "./Utility";

export default class Solver {
    private emptySquares: Array<number>;
    private cellCount: number;
    private available: Array<Array<number>> = new Array<Array<number>>();
    private count: number = 0;
    public sudoku: Array<Square>;

    constructor(sudoku: Array<Square>) {
        this.sudoku = sudoku;
    }

    private setUp() {
        this.findEmptySquares();
        for (let i = 0; i < this.cellCount; i++) {
            this.available.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        }
    }

    private findEmptySquares() {
        let indices = [];
        for (let i = 0; i < 81; i++) {
            if (this.sudoku[i].value === 0) {
                indices.push(i);
            }
        }
        this.emptySquares = indices;
        this.cellCount = indices.length;
    }

    private checkRow(index: number, value: number): boolean {
        let row = Utility.getRow(index + 1) - 1;
        let begin = (row * 9);
        for (let i = begin; i < begin + 9; i++) {
            if (this.sudoku[i].value === value) {
                return true;
            }
        }
        return false;
    }

    private checkColumn(index: number, value: number): boolean {
        let column = Utility.getColumn(index + 1);
        for (let i = column - 1; i < 81; i += 9) {
            if (this.sudoku[i].value === value) {
                return true;
            }
        }
        return false;
    }

    private checkSubGrid(index: number, value: number): boolean {
        let region = Utility.getSubGrid(index + 1);
        let start;
        let end;
        switch (region) {
            case 1:
                start = 0;
                end = 21;
                break;
            case 2:
                start = 3;
                end = 24;
                break;
            case 3:
                start = 6;
                end = 27;
                break;
            case 4:
                start = 27;
                end = 48;
                break;
            case 5:
                start = 30;
                end = 51;
                break;
            case 6:
                start = 33;
                end = 54;
                break;
            case 7:
                start = 54;
                end = 75;
                break;
            case 8:
                start = 57;
                end = 78;
                break;
            case 9:
                start = 60;
                end = 81;
                break;
        }
        for (let i = start; i < end; i += 9) {
            for (let j = 0; j < 3; j++) {
                if (this.sudoku[i + j].value === value) {
                    return true;
                }
            }
        }
        return false;
    }

    private conflictForOption(index: number, value: number) {
        let conflict = this.checkRow(index, value);
        if (!conflict) {
            conflict = this.checkColumn(index, value);
        }
        if (!conflict) {
            return this.checkSubGrid(index, value);
        }
        return true;
    }

    solveSudoku() {
        this.setUp();
        while (this.count < this.cellCount) {
            if (this.available[this.count].length !== 0) {
                let nextIndex = Utility.getRandomNumber(this.available[this.count].length)
                let value = this.available[this.count][nextIndex];

                if (this.conflictForOption(this.emptySquares[this.count], value) === false) {
                    this.sudoku[this.emptySquares[this.count]].value = value;
                    this.available[this.count].splice(nextIndex, 1);
                    this.count += 1;
                } else {
                    this.available[this.count].splice(nextIndex, 1);
                }
            } else {
                this.available[this.count] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                this.sudoku[this.emptySquares[this.count - 1]] = new Square();
                this.count -= 1;
            }
        }
    }

}