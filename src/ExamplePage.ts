// This code is loaded into example-page.html, see the `npm watchify-example` script.
// Remember that you will *not* be able to use Node APIs like `fs` in the web browser.

// Import necessary modules from Canvas, assert, and other files
import { PuzzleTable } from './drawHTML';
import assert from 'assert';
import {Puzzle} from './puzzle';
import { Element } from './parser';
const cellSize = 25;

/** 
 * @param canvas canvas to draw on
 * @param x x position of center of box
 * @param y y position of center of box
 */
function click(canvas:HTMLCanvasElement, puzzle:Puzzle, x: number, y: number): Puzzle {
    const row = Math.floor(y/cellSize);
    const column = Math.floor(x/cellSize);
    if (puzzle.getElement(row, column) === Element.Star){
        puzzle = puzzle.changeElement(row, column, Element.Empty);
    }
    else {
        puzzle = puzzle.changeElement(row, column, Element.Star);
    } 
    PuzzleTable.drawPuzzle(canvas, puzzle, cellSize);
    return puzzle;
}
/**
 * Print a message by appending it to an HTML element.
 * 
 * @param outputArea HTML element that should display the message
 * @param message message to display
 */
function printOutput(outputArea: HTMLElement, message: string): void {
    // append the message to the output area
    outputArea.innerText += message + '\n';

    // scroll the output area so that what we just printed is visible
    outputArea.scrollTop = outputArea.scrollHeight;
}

/**
 * Set up the example page.
 */
function main(): void {
    
    // output area for printing
    const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // canvas for drawing
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement ?? assert.fail('missing drawing canvas');
    const puzzleString = "10x10\n1,2  1,5  | 1,1 1,3 1,4 1,6 1,7 1,8 2,1 2,2 2,3 2,4 2,5 2,6 2,8 3,5\n2,9  4,10 | 1,9 1,10 2,10 3,9 3,10 4,9 5,9 5,10 6,9 6,10 7,10 8,10\n3,2  3,4  | 3,3\n2,7  4,8  | 3,6 3,7 3,8\n6,1  9,1  | 3,1 4,1 4,2 4,3 4,4 5,1 5,2 5,3 6,2 7,1 7,2 8,1 8,2 8,3 8,4 8,5 8,6\n5,4  5,6  | 4,5 5,5 6,4 6,5 6,6\n6,8  8,7  | 4,6 4,7 5,7 5,8 6,7 7,6 7,7 7,8 8,8\n7,3  7,5  | 6,3 7,4\n8,9 10,10 | 7,9 9,9 9,10\n9,3  10,6 | 9,2 9,4 9,5 9,6 9,7 9,8 10,1 10,2 10,3 10,4 10,5 10,7 10,8 10,9\n";

    let puzzle = Puzzle.parseFromString(puzzleString);
    let table = PuzzleTable.drawPuzzle(canvas, puzzle, cellSize);

    canvas.addEventListener('click', (event: MouseEvent) => {
       puzzle = click(canvas, puzzle, event.offsetX, event.offsetY);
    });

    // add initial instructions to the output area
    printOutput(outputArea, `Click in the canvas above to draw a box centered at that point`);
}

main();
