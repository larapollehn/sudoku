import Square from "./Square";

export default class Validator{
    private sudoku: Array<Square>

    constructor() {
    }

    private rowIsValid(){
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

    private columnIsValid(){
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

    private subGridIsValid(){
        let subGrid = new Set();
        for (let i = 0 ; i < 81; i += 27){
            for (let j = 0; j < 9; j += 3){
                for (let k = 0; k < 21; k += 9){
                    for (let m = 0; m < 3; m++){
                        if (!subGrid.has(this.sudoku[i+j+k+m].value)){
                            subGrid.add(this.sudoku[i+j+k+m].value);
                        } else {
                            return false;
                        }
                    }
                }
                if (subGrid.size === 9){
                    subGrid.clear();
                }
            }
        }
        return true;
    }

    validate(sudoku: Array<Square>){
        this.sudoku = sudoku;
        let result = this.rowIsValid();
        if (result){
            result = this.columnIsValid();
        }
        if(result){
            return this.subGridIsValid();
        }
        return false;
    }
}