
enum Element {Star='*', Dot = '.', Empty=' '};

enum State {Unsolve='partially-solved', 
            PartiallySolved = 'partially-solved',
            Solved = 'fully-solved'};

/**
 * An immutable Star Battle puzzle, consisting of an n x n grid divided into n regions. 
 * Each region is a set of contiguous cells that share an edge.
 * 
 * Each cell in the grid is either empty, contains a star, or contains a dot.
 * The puzzle can be in one of three states: unsolved, partially-solved, or fully-solved.
 * 
 * The puzzle is initally in the unsolved state, where all cells are empty.
 * The puzzle state can be modified by adding or removing stars or dots. 
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
    // Abstraction Function:

    //Abstraction Function (AF):
    //     AF(size, board, regions) = A Puzzle object represents a Star Battle puzzle with a board consisting 
    //        of size x size cells, where each cell is represented by an element in the type Element, 
    //        which can either be empty, contain a star, or contain a dot.
    //          The board is stored as a one-dimensional array board, where cell (i, j) 
    //        is represented by board[j + sizei], for integers i, j in [0, size). 
    //          Each region of the puzzle is represented by a set of its cell coordinates in regions,
    //        where the set contains pairs of numbers representing the row and column numbers of the cells in the region.
    //          The puzzle is solved if the number of star elements in board is exactly 2*size, such that 
    //        each row, column, and region of the puzzle has exactly 2 stars, and no two stars are vertically, 
    //        horizontally, or diagonally adjacent. 
    //  
    // Representation Invariant:
    //      - size must be a non-negative integer.
    //      - board must be an array with length size * size
    //      - regions must be an array with length size
    //      - [row, column] pair must be a valid pair of indices within the bounds of the board for all elements in a region of regions.
    //      - The union of all of the sets in region is the set of all possible pairs (row, column) in [0, size)x[0, size)
    //      - The sets in regions are distjoint.
    //      - All cells in the same region must be contiguous for each region of regions.
    //
    // Safety and Robustness Exceptions (SRE):
    //      - size is public and readonly, so it remains immutable and unreassignable.
    //      - The board and regions are private and readonly. However, they are never taken, shared or returned to clients, 
    //          ensuring external modifications are prevented. 
    //          Note that the constructor method is private, so it can only be called from parseFromFile, addStar, and removeStar.
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
    private constructor(
      public readonly size: number,
      private readonly board: Element[],
      private readonly regions: Set<[number, number]>[]
    ) {
        throw Error('not implemented yet');
    }
  
    /**
     * Make a new Puzzle by parsing a file.
     *
     * @param filename Path to puzzle board file.
     * @returns A new Puzzle with the size and configuration from the '.starb' file.
     * @throws Error if the file cannot be read or is not a valid game board.
     */
    public static parseFromFile(filename: string): Puzzle {
        throw Error('not implemented yet');
    }

    /**
     * Gets the state of the puzzle: unsolved, partially-solved, or fully-solved.
     */
    public get state(): State {
        throw Error('not implemented yet');
    } 

    /**
     * Gets the element at the specified cell in the puzzle grid.
     *
     * @param row The row number of the cell, indexed from the top of the board.
     * @param column The column number of the cell, indexed from the left of the board.
     * @returns The element at the specified cell.
     */
    public getElement(row: number, column: number): Element {
        throw Error('not implemented yet');
    }

    /**
     * Adds a star or a dot to the specified cell.
     *
     * @param row The row number of the cell, indexed from the top of the board.
     * @param column The column number of the cell, indexed from the left of the board.
     * @param element must be a star or a dot.
     * 
     * @throws Error if the cell is not empty.
     * @returns A new Puzzle with the star added to the specified cell.
     */
    public changeElement(row: number, column: number, element:Element): Puzzle {
        throw Error('not implemented yet');
    }
  
    /**
     * Removes the element in the specified cell. The cell must contain a star or a dot.
     *
     * @param row The row number of the cell, indexed from the top of the board.
     * @param column The column number of the cell, indexed from the left of the board.
     * 
     * @throws Error if the cell does not contain a star or a dot.
     * @returns A new Puzzle with the star removed from the specified cell.
     */
    public remove(row: number, column: number): Puzzle {
        throw Error('not implemented yet');
    }
  
    /**
     * Gets all of the cells in the same region as the specified cell.
     *
     * @param row The row number of the cell, indexed from the top of the board.
     * @param column The column number of the cell, indexed from the left of the board.
     * @returns A set of all of the coordinates in the format [row_i, column_i] for all cells in the same region.
     */
    public getRegion(row:number, column:number): Set<[number, number]> {
        throw Error('not implemented yet');
    }

    /**
     * @inheritdoc
     */
    public toString() {
        throw Error('not implemented yet');
    }
}