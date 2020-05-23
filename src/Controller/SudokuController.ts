import SudokuViewPuzzle from "../View/SudokuViewPuzzle";
import SudokuViewMenu from "../View/SudokuViewMenu";

export default class SudokuController{
    private puzzleView: SudokuViewPuzzle;
    private menuView: SudokuViewMenu;

    constructor() {
        this.puzzleView = new SudokuViewPuzzle();
        this.menuView = new SudokuViewPuzzle();
    }

    setup(){
        this.puzzleView.initialize();
        this.menuView.initialize();
    }

}