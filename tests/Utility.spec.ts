import Utility from "../src/Sudoku/Utility";

test('the utility method -getRow- works as expected', () => {
    let row = Utility.getRow(1);
    expect(row).toBe(1);

    row = Utility.getRow(10);
    expect(row).toBe(2);

    row = Utility.getRow(23);
    expect(row).toBe(3);

    row = Utility.getRow(29);
    expect(row).toBe(4);

    row = Utility.getRow(37);
    expect(row).toBe(5);

    row = Utility.getRow(47);
    expect(row).toBe(6);

    row = Utility.getRow(55);
    expect(row).toBe(7);

    row = Utility.getRow(70);
    expect(row).toBe(8);

    row = Utility.getRow(80);
    expect(row).toBe(9);

    row = Utility.getRow(9);
    expect(row).toBe(1);
});

test('the utility method -getColumn- works as expected', () => {
    let column = Utility.getColumn(1);
    expect(column).toBe(1);

    column = Utility.getColumn(38);
    expect(column).toBe(2);

    column = Utility.getColumn(75);
    expect(column).toBe(3);

    column = Utility.getColumn(4);
    expect(column).toBe(4);

    column = Utility.getColumn(14);
    expect(column).toBe(5);

    column = Utility.getColumn(33);
    expect(column).toBe(6);

    column = Utility.getColumn(16);
    expect(column).toBe(7);

    column = Utility.getColumn(26);
    expect(column).toBe(8);

    column = Utility.getColumn(81);
    expect(column).toBe(9);

    column = Utility.getColumn(9);
    expect(column).toBe(9);
});

test('the utility method -getSubGrid- works as expected', () => {
    let subGrid = Utility.getSubGrid(10);
    expect(subGrid).toBe(1);

    subGrid = Utility.getSubGrid(22);
    expect(subGrid).toBe(2);

    subGrid = Utility.getSubGrid(8);
    expect(subGrid).toBe(3);

    subGrid = Utility.getSubGrid(46);
    expect(subGrid).toBe(4);

    subGrid = Utility.getSubGrid(31);
    expect(subGrid).toBe(5);

    subGrid = Utility.getSubGrid(45);
    expect(subGrid).toBe(6);

    subGrid = Utility.getSubGrid(57);
    expect(subGrid).toBe(7);

    subGrid = Utility.getSubGrid(76);
    expect(subGrid).toBe(8);

    subGrid = Utility.getSubGrid(81);
    expect(subGrid).toBe(9);
});

test('the utility method -getRandomNumber- works as expected', () => {
    let allowed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 100; i++){
        let rand = Utility.getRandomNumber(10);
        expect(allowed).toContain(rand);
    }

    allowed = [0, 1, 2, 3, 4, 5, 6];
    for (let i = 0; i < 100; i++){
        let rand = Utility.getRandomNumber(7);
        expect(allowed).toContain(rand);
    }
});