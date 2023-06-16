import { Puzzle } from './Puzzle';

/**
 * A graphical user interface for a Star Battle puzzle.
 * 
 * The user interface consists of a grid of cells, where each cell can either be empty, contain a star,
 * or contain a dot. The cells are divided into n regions, where each region is a set of contiguous cells 
 * that share an edge.
 * 
 * The user interface allows the user to interactively modify the state of the puzzle by clicking on cells.
 * The puzzle state can be in one of three states: unsolved, partially-solved, or fully-solved.
 * 
 * This interface is designed to work with an immutable Puzzle object.
 *
 */
export class Clinet {
    // Abstraction Function:
    // AF(puzzle) = a clinet for an an immutable Puzzle object that represents the current state of the puzzle
    //
    // Representation Invariant:
    //      true
    //
    // Safety and Robustness Exceptions:
    // - puzzle is immutable public and readonly, so it can never be modified or reassigned

    /**
     * Creates a new graphical user interface for the given puzzle.
     * 
     * @param puzzle The puzzle to display.
     */
    constructor(public readonly puzzle: Puzzle) {
        throw new Error('not implemented yet');
    }

    /**
     * Renders the user interface to the given DOM element.
     * 
     * @param element The DOM element to render the user interface to.
     */
    public click(element: HTMLElement): void {
        throw new Error('not implemented yet');
    }

    /**
     * Returns the current state of the puzzle.
     * 
     * @returns The current state of the puzzle in a string format.
     */
    public getPuzzle(): string {
        throw new Error('not implemented yet');
    }

    /**
     * Adds a click event listener to the given cell.
     * 
     * @param row The row number of the cell to add the listener to.
     * @param column The column number of the cell to add the listener to.
     * @param listener The listener function to add.
     */
    public addCellClickListener(row: number, column: number, listener: () => void): void {
        throw new Error('not implemented yet');
    }
    
    /**
     * @returns true if and only if the puzzle represented by puzzle is fully solved.
     */
    public get isSolved():boolean {
        throw new Error('not implemented yet');
    }
    /**
     * @returns the dimension of the puzzle grid
     */
    public get size():boolean {
        throw new Error('not implemented yet');
    }
}
