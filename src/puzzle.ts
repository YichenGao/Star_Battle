
import { parse, parseFromFile, PuzzleInfo, Element, puzzleToString } from './parser';
import assert from 'assert';

/**
 * An immutable Star Battle puzzle, consisting of an n x n grid divided into n regions. 
 * Each region is a set of contiguous cells that share an edge.
 * 
 * Each cell in the grid is either empty or contains a star.
 * 
 * The puzzle is initally blank, where all cells are empty.
 * The puzzle state can be modified by adding or removing stars. 
 * This creates a new partially-solved puzzle instance.
 * 
 * A puzzle is fully-solved if it has 2n stars such that each row, column, and region of the puzzle has exactly 2 stars, 
 * and no two stars are vertically, horizontally, or diagonally adjacent.
 * 
 * This puzzle is immutable, i.e., once created, it cannot be modified. 
 * Instead, creating a new puzzle instance with the modified state is required.
 *
 */
export class Puzzle {
    //Abstraction Function (AF):
    //     AF(row: number, column:number, board:Element[], regions:number[], solutions:Element[]) = A Puzzle object that represents a Star Battle puzzle with a board consisting 
    //        of row x column cells, where each cell is represented by an element in the type Element, which can either be empty or contain a star. The elements are stored in board,
    //        which is an one-dimensional array of elements of all cells. Regions is an array of number representing the regions in the board.
    //        Solutions is the array representing the unique solution of the puzzles we are considering for our project. This array is an array of elements of all cells when the puzzle
    //        is solved.
    //        The puzzle is solved if the number of star elements in board is exactly 2*size, such that 
    //        each row, column, and region of the puzzle has exactly 2 stars, and no two stars are vertically, 
    //        horizontally, or diagonally adjacent. 
    //  
    // Representation Invariant (RI):
    //      - row,col must be a non-negative integer.
    //      - board must be an array with length =  row * col
    //      - regions must be an array with length  = row * col 
    //      - All cells in the same region must be contiguous for each region of regions.
    //
    // Safety from Representation Exposure (SRE):
    //      - row and column are public and readonly numbers, so they remains immutable and unreassignable.
    //      - The board, regions and solutions are private and readonly. They are never returned from any method 
    //        or used as parameters of any methods of the ADT
    //      - Note that the constructor method is private, so it can only be called from the static functions of the ADT
    /**
     * Create a Star Battle puzzle.
     *
     * @param size The dimension of the puzzle, such that this puzzle uses a `size` x `size`
     *             grid. Must be non-negative.
     * @param board The array of elements in the puzzle grid, in row-major order.
     * @param regions The array of sets of cell coordinates representing the regions of the
     *                puzzle. Each set contains pairs of numbers, where the first number is
     *                the row number and the second number is the column number of a cell in
     *                the region.
     */

    private readonly board: Element[];
    private readonly regions: number[];
    private readonly solution: Element[];
    /**
     * checks that the RI is true
     */
    private checkRep(): void {
        assert(this.row > 0);
        assert(this.column > 0);
        assert(this.board.length === this.row * this.column);
        assert(this.regions.length === this.row * this.column);
    }
    /**
     * 
     * @param row a positive integer
     * @param column a positive integer
     * @param board an array of elements of the puzzle board
     * @param regions an array of numbers representing the regions of the board
     * @param solution an array of elements of the solved version of the puzzle
     */
    private constructor(public readonly row: number, public readonly column: number, 
                       board: Element[], regions: number[], solution: Element[]) {
        this.board = board.slice();
        this.regions = regions.slice();
        this.solution = solution.slice();
        this.checkRep();
    }

    /**
     * Make a new Puzzle by parsing a file.
     *
     * @param filename Path to puzzle a solved board file
     * @returns A new Puzzle with the size and configuration from the '.starb' file.
     * @throws Error if the file cannot be read or is not a valid game board.
     */
    public static parseBlankFromFile(filename: string): Puzzle {
        const info: PuzzleInfo = parseFromFile(filename);
        const boardElements: Element[] = new Array<Element>(info.rowsNum * info.columnsNum).fill(Element.Empty);
        return new Puzzle(info.rowsNum, info.columnsNum, boardElements, info.regions, info.board);
    }

    /**
     * Make a new Puzzle by parsing a string.
     * @param puzzleString a string representation of the puzzle
     * @returns A new Puzzle with the size and configuration from the '.starb' file.
     * @throws Error if the file cannot be read or if the string is not in a valid format.
     */
    public static parseFromString(puzzleString: string): Puzzle {
        const info: PuzzleInfo = parse(puzzleString);
        const boardElements: Element[] = new Array<Element>(info.rowsNum * info.columnsNum).fill(Element.Empty);
        return new Puzzle(info.rowsNum, info.columnsNum, boardElements, info.regions, info.board);
    }
    /**
     * 
     * @param fileName filename of the puzzle
     * @returns a solved puzzle object
     * @throws Error if the file is not found or the puzzle is in invalid format
     */
    public static parseSolvedPuzzle(fileName: string): Puzzle {
        const info: PuzzleInfo = parseFromFile(fileName);
        return new Puzzle(info.rowsNum, info.columnsNum, info.board, info.regions, info.board);
    }

    /**
     * Gets the element at the specified cell in the puzzle grid. Note that we consider it to be 0 indexed here
     *
     * @param row The row number of the cell, indexed from the top of the board.
     * @param column The column number of the cell, indexed from the left of the board.
     * @throws Error for invalid index 
     * @returns The element at the specified cell.
     */
    public getElement(row: number, column: number): Element {
        if (row >= this.row || column >= this.column || row < 0 || column < 0) throw new Error("Invalid Index");
        const elt = this.board[(row * this.column + column)];
        if (elt !== undefined)
            return elt;
        else throw new Error("Incorrect Indexing");
    }

    /**
     * Adds or removes a star to the specified cell.
     *
     * @param row The row number of the cell, indexed from the top of the board.
     * @param column The column number of the cell, indexed from the left of the board.
     * @param element must be a star or a dot.
     * @throws error for invalid indexing.
     * @returns A new Puzzle with change reflected to the specified cell.
     */
    public changeElement(row: number, column: number, element: Element): Puzzle {
        if (row >= this.row || column > this.column || row < 0 || column < 0) throw new Error("Invalid Index");
        const newElementArray = this.board.slice();
        newElementArray[row * this.column + column] = element;
        if (this.isSolved()) return new Puzzle(this.row, this.column, newElementArray, this.regions, this.solution);
        else return new Puzzle(this.row, this.column, newElementArray, this.regions, this.solution);

    }

    /**
     * Retruns the regions of the puzzle
     * @returns the regions of the puzzle
     */
    public getRegions(): number[] {
        const regions = this.regions.slice();
        return regions;
    }


    /**
     * 
     * @returns the elements of a puzzle instance
     */
    public getBoardElements(): Element[] {
        const elements = this.board.slice();
        return elements;
    }

    /**
    * @returns true if the puzzle is solved, false otherwise
    */
    public isSolved(): boolean {
        for (let i = 0; i < this.solution.length; i++) {
            if (this.board[i] !== this.solution[i]) return false;
        }
        return true;
    }

    /**
     * @inheritdoc
     */
    public toString(): string {
        const info: PuzzleInfo = {
            regions: this.regions,
            board: this.board,
            rowsNum: this.row,
            columnsNum: this.column
        };
        return puzzleToString(info);
    }
    
    /**
     * @inheritdoc
     */
    public equalvalue(that: Puzzle): boolean {
        return ((this.row === that.row) && (this.column === that.column) && (JSON.stringify(this.getRegions()) === JSON.stringify(that.getRegions())) && (JSON.stringify(this.getBoardElements()) === JSON.stringify(that.getBoardElements())));
    }
}