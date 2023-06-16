export class Client{
    // Abstraction function
    //    AF(name) = a client that has name 'name' who can play the puzzle,
    //                   and if isSolved then the client solved the puzzle.
    // Rep invariant
    //    true
    // Safety from rep exposure
    //    all fields are immutable and unreassignable

    private isSolved: boolean = false;

    //constructer for a client.
    public constructor(private readonly name: string) {
    }

    /**
     * Updates the display according to the client's click. Could be add or remove.
     * @param row the row of the location to add the star
     * @param col the row of the location to add the star
     */
    public click(row: number, col: number): void{
        throw Error;
    }

    /** Determines whether the current puzzle is solved, and displays 
     * a message to the user indicating whether they have solved the puzzle or not.
     * @param that any Expression
     * @returns true if and only if this puzzle is solved by the client
     */
    public isPuzzleSolved(): boolean{
        return this.isSolved;
    }
}