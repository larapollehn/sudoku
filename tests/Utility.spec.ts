import Utility from "../src/Sudoku/Utility";

test('the utility method -getRow- works as expected', () => {
       let firstRow = Utility.getRow(1);
       expect(firstRow).toBe(1);
});
