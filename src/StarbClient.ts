import { Puzzle } from './puzzle';
import { Element } from './parser';
import { PuzzleTable } from './drawHTML';
import assert from 'assert';

/**
 * The graphical user interface for a Star Battle puzzle allows the user to interactively modify 
 * the state of the puzzle by clicking on cells. 
 * 
 * The interface is designed to work with an immutable Puzzle object. 
 * The interface displays a grid of cells, where each cell can either be empty or contain a star. 
 * The cells are divided into n regions, where each region is a set of contiguous cells that share an edge.
 * 
 * The interface draws the initial puzzle and updates it as the user interacts with it. 
 * When a cell is clicked, the state of the puzzle is modified accordingly. 
 * If there is a star at the clicked cell, the star is removed, and if the cell is empty, a star is added to it.
 * The drawing on the canvas updates accordingly. (see PuzzleTable ADT spec for drawing info)
 * 
 * The puzzle state can be in one of three states: unsolved, partially-solved, or fully-solved, 
 * and the interface displays the current state of the puzzle in the output area.
 */
export class Client {
    // Abstraction Function:
    //      AF(canvas, outputArea, instructionsArea, cellSize, puzzle) = a client for a Puzzle object 'puzzle' that
    //      displays a puzzle drawing corresponding to puzzle (see PuzzleTable ADT spec) on 'canvas'.
    //      When a clinet clicks on a point (x, y) on the canvas, the puzzle is updated as the following:
    //          - if there is a star at the corresponding cell (x//cellSize, y//cellSize), the star gets removed
    //          - if the cell is empty, the star is added to it
    //      The drawing on the canvas updates accordingly.
    //      the outputArea tells the user if the puzzle has been solved or not, 
    //      and the instructionsArea shows the game instrucitons.
    //
    // Representation Invariant:
    //    - cellSize > 0
    //
    // Safety from Representation Exposure:
    //      - canvas, outputArea, and instructionsArea are private and read-only,
    //           and are never passed to or taken from the user.
    //      - puzzle is private and never passed to or taken from the user.
    //      - cellSize is a private and read-only number, so it can never be changed or reassigned.

    private readonly canvas: HTMLCanvasElement;
    private readonly outputArea: HTMLElement;
    private readonly instructionsArea: HTMLElement;
    private readonly cellSize: number;
    private puzzle: Puzzle;

    /**
     * Creates a new graphical user interface for the given puzzle.
     * 
     * @param puzzleString string representation of the puzzle
     * @throws Error if the string is in invalid format
     */
    public constructor(puzzleString: string) {
        // canvas for drawing
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement ?? assert.fail('missing drawing canvas');
        // output area for printing
        this.outputArea = document.getElementById('outputArea') ?? assert.fail('missing output area');
        this.instructionsArea = document.getElementById('instructionsArea') ?? assert.fail('missing output area');
        this.puzzle = Puzzle.parseFromString(puzzleString);
        this.cellSize = this.canvas.width / this.puzzle.row;
        PuzzleTable.drawPuzzle(this.canvas, this.puzzle, this.cellSize);
        this.instructionsArea.innerText = `Fill some cells with stars so that each row, column, and bold region contains 2 stars. Stars cannot be placed in adjacent cells that share an edge or corner.`
        this.checkRep();
    }

    /**
     * Processes click at a cell with (x,y) co-ordinates. If the cell has a star, this operation removes the star. If the cell
     * doesn;t have a star, this operation adds a star
     * @param x a number
     * @param y a number
     */
    public processClick(x: number, y: number): void {
        const row = Math.floor(y / this.cellSize);
        const column = Math.floor(x / this.cellSize);
        if (this.puzzle.getElement(row, column) === Element.Star) {
            this.puzzle = this.puzzle.changeElement(row, column, Element.Empty);
        }
        else {
            this.puzzle = this.puzzle.changeElement(row, column, Element.Star);
        }
        PuzzleTable.drawPuzzle(this.canvas, this.puzzle, this.cellSize);
        if (this.puzzle.isSolved()) {
            this.printOutput('Yayy, you have solved the puzzle!');
        }
        else {
            this.printOutput('Game is not solved yet');
        }
        this.checkRep();
    }

    /**
    * Print a message by appending it to an HTML element.
    * 
    * @param outputArea HTML element that should display the message
    * @param message message to display
    */
    public printOutput(message: string): void {
        // append the message to the output area
        this.outputArea.innerText = message + '\n';
        // scroll the output area so that what we just printed is visible
        this.outputArea.scrollTop = this.outputArea.scrollHeight;
        this.checkRep();
    }

    /**
     * Renders the user interface to the given DOM element.
     * 
     * @param element The DOM element to render the user interface to.
     */
    public handleClick(): void {
        this.canvas.addEventListener('click', (event: MouseEvent) => {
            this.processClick(event.offsetX, event.offsetY);
        });
    }
    /**
     * checks that the RI is true
     */
    private checkRep():void {
        assert(this.cellSize > 0, "cellSize should be positive");
    }
}

/**
 * Initializes the client by loading the puzzle with the specified ID from the dropdown menu on the HTML page.
 * Once the puzzle is loaded, the client waits for user input in the form of clicks on the puzzle grid.
 * 
 * @param selectPuzzle A HTMLSelectElement that contains the ID of the puzzle to be loaded.
 * @returns A promise that resolves when the client is fully loaded and ready to receive user input.
 */
async function start(selectPuzzle: HTMLSelectElement): Promise<void> {
    const puzzleId = selectPuzzle.value;
    const response = await fetch('http://localhost:8789/' + puzzleId);
    const puzzleString = await response.text();
    const client = new Client(puzzleString);
    client.handleClick();
}

/**
 * Shows a dropdown menu for a difficulty levels and let the user choose the difficulty of the puzzle. Once the difficulty is selected
 * a puzzle with that difficulty is started
 */
async function main(): Promise<void> {
    const selectPuzzle = document.getElementById("difficulty") as HTMLSelectElement;
    selectPuzzle.addEventListener("change", async function () {
        await start(selectPuzzle);
    });
    await start(selectPuzzle);
}
main();