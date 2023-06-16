export class Puzzle{
    // Abstraction function
    //    AF() = a new empty 10x10 puzzle.
    // Rep invariant
    //    board.length = 100.
    // Safety from rep exposure
    //    some fields are immutable but clients can never access them directly.
    private isSolved: boolean = false;

    // record the board. boolean is true if there is a star in that location.
    // The order is form left to right, top to bottom.
    private board: Array<boolean> = new Array<boolean>(100);

    // similar to board, but only if the solution has a star at the location, set
    // that boolean to true.
    private solution: Array<boolean> = new Array<boolean>(100);

    // create a new empty puzzle.
    public constructor(private readonly name: string) {
    }

    /**
     * @returns the size of the board as a tuple of integers representing the number of rows and columns.
     */
    public getStars(): Array<number> {
        throw Error;
    }

    /**
     * Updates the display according to the client's click. Could be add or remove.
     * @param row the row of the location to add the star
     * @param col the row of the location to add the star
     */
    public click(row: number, col: number): void{
        throw Error;
    }

    /**
     * Adds a star to the puzzle at the specified row and column, and updates the display accordingly.
     * @param row the row of the location to add the star
     * @param col the row of the location to add the star
     */
    private addStar(row: number, col: number): void{
        throw Error;
    }

    /**
     * Remove a star to the puzzle at the specified row and column, and updates the display accordingly.
     * @param row the row of the location to add the star
     * @param col the row of the location to add the star
     */
    private removeStar(row: number, col: number): void{
        throw Error;
    }

    /**
     * show a hint to the client that help them solve the puzzle.
     */
    public gethint(): void {

    }

    /**
     * @return the solution of the board.
     */
    public getSolution(): Array<number> {
        throw Error;
    }
}