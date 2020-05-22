export default class Utility {
    constructor() {
    }

    /**
     * returns a random number [0, max)
     * @param max
     */
    static getRandomNumber(max: number): number{
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * @param index is number [1, 81]
     */
    static getRow(index: number): number {
        let row;
        if (index % 9 === 0) { //original: getColumn(n)
            row = Math.floor(index / 9);
        } else {
            row = Math.floor(index / 9) + 1;
        }
        return row;
    }

    /**
     * @param index is number [1, 81]
     */
    static getColumn(index: number): number{
        let column = index % 9;
        return (column === 0) ? 9 : column;
    }

    /**
     * @param index is number between 1 and 81
     */
    static getSubGrid(index: number): number{
        let row = this.getRow(index);
        let column = this.getColumn(index);
        if (row < 4) {
            return 1 + (Math.ceil(column / 3)) - 1;
        } else if (row < 7) {
            return 4 + (Math.ceil(column / 3)) - 1;
        } else if (row < 10) {
            return 7 + (Math.ceil(column / 3)) - 1;
        }
    }
}