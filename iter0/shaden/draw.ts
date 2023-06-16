import assert from 'assert';
import fs from 'fs';
import { Image, createCanvas, loadImage, Canvas} from 'canvas';

//you can run this file with 'npm run draw-shaden'

export class PuzzleTable {
    private readonly canvas:Canvas; //drawing canvas
    private readonly context;
    private readonly tableSize:number;

    /**
     * 
     * @param n number of cells
     * @param cellSize width and height of each cell
     */
    public constructor(public readonly n:number, public readonly cellSize:number) {
        const tableSize:number = n*cellSize
        const canvas = createCanvas(tableSize, tableSize);
        this.tableSize = tableSize;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }
    public getCanvas(fileName:string):Canvas {
        //it's better to return a copy of the canvas
        const pngData = this.canvas.toBuffer('image/png');
        fs.writeFileSync(fileName, pngData);
        return this.canvas;
    }

    public drawTable():void {
        for (let i=0; i<this.n+1; i++) {
            //draw vertical line 
            const x = i*this.cellSize;
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.tableSize);
            this.context.stroke();
            //draw horizontal line 
            const y = i*this.cellSize;
            this.context.moveTo(0, y);
            this.context.lineTo(this.tableSize, y);
            this.context.stroke();
        }
    }

    public drawStar(row:number, column:number):void {
        const STAR = '☆';//I am using a star symbol, but you can use * too
        const x = (column+0.5)*this.cellSize;
        const y = (row+0.5)*this.cellSize;

        this.context.font = `${this.cellSize}px Arial`;
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText(STAR, x, y);
    }

    public drawBoundries(regions:Array<number>):void {
        (this.context).lineWidth = 4;
        const context = this.context;
        const cellSize = this.cellSize;
        for (let row = 0; row < this.n; row++) {
            for (let col = 0; col <  this.n; col++) {
              const region = regions[row * this.n + col];

              if (col < this.n - 1 && regions[row *  this.n + col + 1] !== region) {
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
}
//you can run this file with 'npm run draw-shaden'

function main(){
    const table= new PuzzleTable(3, 50);
    // The table is 
    // +----+----+----+
    // | ⭐ |    ||   |    
    // +----+----+----+
    // |____|____||   |    
    // +----+----+----+
    // |    |    | ⭐ |    
    // +----+----+----+

    table.drawTable();
    table.drawStar(0, 0);
    table.drawStar(2, 2);
    table.drawBoundries([1, 1, 2, 1, 1, 2, 2, 2, 2]);
    table.getCanvas('my-board.png');
}

main()