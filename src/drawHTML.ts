
import assert from 'assert';
import {PuzzleInfo, parse, Element} from './parser';
import {Puzzle} from './puzzle';

// import only the types from 'canvas', not the implementations
import type { Canvas, CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from 'canvas';

/**
 * Either: a CanvasRenderingContext2D in the web browser,
 *      or a NodeCanvasRenderingContext2D in Node (for testing)
 */
type WebOrNodeCanvasRenderingContext2D = CanvasRenderingContext2D | NodeCanvasRenderingContext2D;

/**
 * Either: a HTMLCanvasElement representing a `<canvas>` on the web page,
 *      or a Canvas representing a canvas in Node (for testing)
 */
type WebOrNodeCanvas = Omit<HTMLCanvasElement | Canvas, 'getContext'> & {
    getContext(contextId: '2d'): WebOrNodeCanvasRenderingContext2D | null;
};

/**
 * An Star Battle Puzzle Table object, consisting of a canvas and its content
 * represents a puzzle state. The size of the puzzle is depends on the parameter CellSize.
 * 
 * The clients can choose to call the funciton that draws the star, table, or the colorRegions 
 * seperately, or call public drawPuzzle function that create a new PuzzleTable object and
 * draw a puzzle compeletely.
 * 
 * The canvas is initally empty.
 * The canvas can be modified by adding or removing symble, regions, or draw a new table. 
 * This creates a new partially-solved puzzle instance.
 * 
 * This puzzle is mutable, the clients cannot modify the content of the canvas directly, 
 * but the content can be changed by calling the fucntions.
 *
 */
export class PuzzleTable {
    private readonly canvas: WebOrNodeCanvas; //drawing canvas
    private readonly context: WebOrNodeCanvasRenderingContext2D;
    private readonly tableSize: number;

    // Abstraction Function:
    // AF(canvas, context, tableSize) = a 'canvas' that shows the 'content' of a Star Battle Puzzle
    // with the broad size of 'tableSize'.
    //
    // Representation Invariant:
    //      tableSize >= 0
    //
    // Safety from Representation Exposure:
    //      all fields are immutable, private and readonly, so it can never be
    //      modified or reassigned by the clients.

    /**
     * Draw the puzzle based on a Puzzle object
     * 
     * @param canvas a canvas to draw puzzle on
     * @param puzzle a Star Battle Puzzle 
     * @param cellSize the cell size of the puzzle that we want draw on the canvas
     * @returns a PuzzleTable that contains a canvas that represents the puzzle
     */
    public static drawPuzzle(canvas: WebOrNodeCanvas, puzzle: Puzzle, cellSize:number): PuzzleTable {
        const symbol = (puzzle.isSolved())? '⚔️':'⭐';
        const info: PuzzleInfo = parse(puzzle.toString());
        assert(info.rowsNum===info.columnsNum, 'puzzle must be a square');
        const size: number = info.rowsNum;
        const table = new PuzzleTable(canvas, size, cellSize);
        table.colorRegions(info.regions);
        table.drawTable();
        table.drawBoundaries(info.regions);
        for (let row = 0; row < size; row++) {
            for (let col = 0; col <  size; col++) {
                if (info.board[row*size + col]===Element.Star){
                    const x = (col+0.5) * cellSize;
                    const y = (row+0.5) * cellSize;
                    table.drawStar(symbol, x, y);
                }
            }
        }
        return table;
    }

    // Check the representation of the PuzzleTable
    private checkRep(): void{
        assert(this.tableSize >= 0, "tableSize should be nonnegative!");
    }
    /**
     * Create a PuzzleTable object with the cavans, cellsize and board size of n
     * @param canvas a canvas to draw puzzle on
     * @param n number of cells
     * @param cellSize width and height of each cell
     */
    public constructor(canvas: WebOrNodeCanvas, public readonly n: number, public readonly cellSize: number) {
        const tableSize: number = n * this.cellSize;
        this.tableSize = tableSize;
        this.canvas = canvas;
        const context = canvas.getContext('2d');
        assert(context, 'unable to get canvas drawing context');
        this.context = context;
        this.checkRep();
    } 
    /**
     * Draw the empty puzzle board on the canvas accoridng to number of cells and cell size
     */
    public drawTable(): void {
        this.checkRep();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 0.5;
        for (let i = 0; i < this.n + 1; i++) {
            const x = i * this.cellSize;
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.tableSize);
            this.context.stroke();
            const y = i * this.cellSize;
            this.context.moveTo(0, y);
            this.context.lineTo(this.tableSize, y);
            this.context.stroke();
        }
    }

    /**
     * Darw a symbol according to the locaiton (x, y) on the canvas. The star will be draw 
     * at the center of the cell that the location is in. The symbol can be any string.
     * 
     * @param symbol a stirng to be draw on the canvas
     * @param x the x coordinate of location
     * @param y the y coordinate of location
     */
    public drawStar(symbol:string, x: number, y: number): void {
        this.checkRep();
        this.context.fillStyle = "black";
        this.context.strokeStyle = 'black';
        x = (Math.floor(x/this.cellSize)+0.5) * this.cellSize;
        y = (Math.floor(y/this.cellSize)+0.5) * this.cellSize;
        this.context.font = `${this.cellSize * 0.7}px Arial`;
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText(symbol, x, y);
    }

    /**
     * Darw the boundaries according to the puzzle region. The boundaries will be represented
     * by a wider line around the cell edges.
     * 
     * @param regions a list that represents the puzzle regions
     */
    public drawBoundaries(regions: number[]): void {
        this.checkRep();
        this.context.strokeStyle = 'black';
        const lineWidth = 5.5;
        const context = this.context;
        const cellSize = this.cellSize;
      
        context.lineWidth = lineWidth;
      
        for (let row = 0; row < this.n; row++) {
          for (let col = 0; col < this.n; col++) {
            const region = regions[row * this.n + col];
      
            if (col < this.n - 1 && regions[row * this.n + col + 1] !== region) {
              // draw a thick line on the right edge of the cell
              context.beginPath();
              context.moveTo((col + 1) * cellSize, row * cellSize);
              context.lineTo((col + 1) * cellSize, (row + 1) * cellSize);
              context.stroke();
            }
      
            if (row < this.n - 1 && regions[(row + 1) * this.n + col] !== region) {
              // draw a thick line on the bottom edge of the cell
              context.beginPath();
              context.moveTo(col * cellSize, (row + 1) * cellSize);
              context.lineTo((col + 1) * cellSize, (row + 1) * cellSize);
              context.stroke();
            }
          }
        }
    }

    /**
     * Color the regions according to the puzzle regions. The regions will be filled
     * with color from a chosen set of colors.
     * 
     * @param regions a list that represents the puzzle regions
     */
    public colorRegions(regions: number[]): void {
        this.checkRep();
        const colors = ['#C5C3C6','#ABD1DC', '#D7DBDD', '#F2E8D9', '#D9C7B6', 
        '#EAE7DC', '#BDC0BA', '#8B8D8A', '#9D9C9F', '#C1CDCD'];

        const context = this.context;
        const cellSize = this.cellSize;

        for (let row = 0; row < this.n; row++) {
            for (let col = 0; col < this.n; col++) {
                const region = regions[row * this.n + col]??assert.fail('index out of range');
                const color = colors[region % colors.length]??assert.fail('index out of range');
                context.fillStyle = color;
                context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
        context.fillStyle = 'rgba(0, 0, 0, 0)';
    }
}
