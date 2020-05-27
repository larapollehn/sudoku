import Square from "./Square";
import Utility from "./Utility";

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

export default class Generator {
    private squares: Array<Square>;
    private available: Array<Array<number>>;
    private count: number;
    private freeSquares: number;
    private numberAnimalsMapping: Map<number, string> = new Map<number, string>();

    constructor() {
    }

    private setUp(): void {
        this.squares = new Array<Square>(81);
        this.available = new Array<Array<number>>(81);
        this.count = 0;

        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i] = new Square();
        }
        for (let i = 0; i < this.squares.length; i++) {
            this.available[i] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
        this.numberAnimalsMapping = new Map<number, string>([
            [1, cat],
            [2, bee],
            [3, elephant],
            [4, frog],
            [5, ladybug],
            [6, monkey],
            [7, pig],
            [8, bunny],
            [9, whale]
        ])
    }

    private createSquare(index: number, value: number): Square {
        let square = new Square();
        square.column = Utility.getColumn(index + 1);
        square.row = Utility.getRow(index + 1);
        square.subGrid = Utility.getSubGrid(index + 1);
        square.value = value;
        square.index = index;
        square.picture = this.numberAnimalsMapping.get(value);
        return square;
    }

    private static hasConflict(squares: Array<Square>, option: Square): boolean {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].column === option.column ||
                squares[i].row === option.row ||
                squares[i].subGrid === option.subGrid) {
                if (squares[i].value === option.value) {
                    return true;
                }
            }
        }
        return false;
    }

    private generateGrid() {
        this.setUp();
        while (this.count < 81) {
            if (this.available[this.count].length !== 0) { //if there are possible values left for the current square
                let nextIndex = Utility.getRandomNumber(this.available[this.count].length) //get random number/index of between 0 and last index of array
                let value = this.available[this.count][nextIndex];

                if (Generator.hasConflict(this.squares, this.createSquare(this.count, value)) === false) { //if the randomly chosen value provides no conflict
                    this.squares[this.count] = this.createSquare(this.count, value); //generate a square and add to squares at current count/index
                    this.available[this.count].splice(nextIndex, 1); //remove the value for this square
                    this.count += 1;
                } else {
                    this.available[this.count].splice(nextIndex, 1);
                }
            } else { //if no possible values for the current square are left
                this.available[this.count] = [1, 2, 3, 4, 5, 6, 7, 8, 9];  //make all possible values in range 1-9 available for this square
                this.squares[this.count - 1] = new Square(); // backtrack to square before the current one
                this.count -= 1;
            }
        }
    }

    generateSudoku(freeSquares: number){
        this.generateGrid();
        let erased = new Set<number>();
        while (freeSquares > 0){
            let index = Utility.getRandomNumber(81);
            if (!erased.has(index)) {
                erased.add(index);
                this.squares[index].value = 0;
                freeSquares--;
            }
        }
        return this.squares;
    }
}