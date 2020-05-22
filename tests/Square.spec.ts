import Square from "../src/Sudoku/Square";
import {unwatchFile} from "fs";

test('Square works as expected', () => {
    let square = new Square();
    expect(square.column).toBe(undefined);
    expect(square.row).toBe(undefined);
    expect(square.subGrid).toBe(undefined);
    expect(square.value).toBe(undefined);
    expect(square.index).toBe(undefined);
    expect(square.picture).toBe(undefined);

    square.column = 3;
    square.row = 7;
    square.subGrid = 2;
    square.value = 4;
    square.index = 37;
    square.picture = 'pic.jpg';
    expect(square.column).toBe(3);
    expect(square.row).toBe(7);
    expect(square.subGrid).toBe(2);
    expect(square.value).toBe(4);
    expect(square.index).toBe(37);
    expect(square.picture).toBe('pic.jpg');
});