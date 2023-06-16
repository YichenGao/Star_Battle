import assert from 'assert';
import * as parserlib from 'parserlib';
import {PuzzleTable} from '../src/drawHTML';
import {Puzzle} from '../src/puzzle';
import { Image, createCanvas, loadImage} from 'canvas';
import {parse, parseFromFile, puzzleToString, PuzzleInfo, Element} from '../src/parser';
// import only the types from 'canvas', not the implementations
import type {Canvas, CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from 'canvas';

/**
 * Tests the draw functions
 */

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

describe('draw', function () {

    /*
     * Testing strategy is to cover the subdomains of the following partitions
     * 
     *      Partition based on the size of the board: 0, 1, >1
     *      Partition based on the number of stars: 0, 1, >1
     *      Partition based on the number of regions: 0, 1, >1
     *      Partition based on the action: add, remove a star
     *
     */
    it("draw a puzzle", () => {
        const desc =  "10x10\n1,2  1,5  | 1,1 1,3 1,4 1,6 1,7 1,8 2,1 2,2 2,3 2,4 2,5 2,6 2,8 3,5\n2,9  4,10 | 1,9 1,10 2,10 3,9 3,10 4,9 5,9 5,10 6,9 6,10 7,10 8,10\n3,2  3,4  | 3,3\n2,7  4,8  | 3,6 3,7 3,8\n6,1  9,1  | 3,1 4,1 4,2 4,3 4,4 5,1 5,2 5,3 6,2 7,1 7,2 8,1 8,2 8,3 8,4 8,5 8,6\n5,4  5,6  | 4,5 5,5 6,4 6,5 6,6\n6,8  8,7  | 4,6 4,7 5,7 5,8 6,7 7,6 7,7 7,8 8,8\n7,3  7,5  | 6,3 7,4\n8,9 10,10 | 7,9 9,9 9,10\n9,3  10,6 | 9,2 9,4 9,5 9,6 9,7 9,8 10,1 10,2 10,3 10,4 10,5 10,7 10,8 10,9\n";
        const canvas = createCanvas(10, 10);
        const puzzle = Puzzle.parseFromString(desc);
        PuzzleTable.drawPuzzle(canvas, puzzle, 25);
        const context = canvas.getContext("2d");
        if(context){
            const imageData1 = context.getImageData(0, 0, 2, 2);
            assert.deepStrictEqual(
                [...imageData1.data],
                [1,   1,   1, 255, 1,   1,
                    1, 255,   1,   1, 1, 255,
                  197, 195, 198, 255],
                "pixels should be the same"
            );

            const imageData2 = context.getImageData(7, 7, 9, 9);
            assert.deepStrictEqual(
                [...imageData2.data],
                [197, 195, 198, 255, 197, 195, 198,
                255, 197, 195, 198, 255, 197, 195,
                198, 255, 197, 195, 198, 255, 197,
                195, 198, 255, 197, 195, 198, 255,
                197, 195, 198, 255, 197, 195, 198,
                255],
                "pixels should be the same"
            );

            const imageData3 = context.getImageData(3, 0, 4, 5);
            assert.deepStrictEqual(
                [...imageData3.data],
                [1,   1,   1, 255,   1,   1,   1, 255,   1,   1,   1, 255,
                1,   1,   1, 255, 197, 195, 198, 255, 197, 195, 198, 255,
                197, 195, 198, 255, 197, 195, 198, 255, 197, 195, 198, 255,
                197, 195, 198, 255, 197, 195, 198, 255, 197, 195, 198, 255,
                197, 195, 198, 255, 197, 195, 198, 255, 197, 195, 198, 255,
                197, 195, 198, 255, 197, 195, 198, 255, 197, 195, 198, 255,
                197, 195, 198, 255, 197, 195, 198, 255],
                "pixels should be the same"
            );
        }else{
            throw Error("shoudld have canvas data");
        }
    });

    it("puzzle form a file", () => {
        const desc = "10x10\n1,5  | 1,1 1,2 1,3 1,4 1,6 1,7 1,8 2,1 2,2 2,3 2,4 2,5 2,6 2,8 3,5\n2,9  4,10 | 1,9 1,10 2,10 3,9 3,10 4,9 5,9 5,10 6,9 6,10 7,10 8,10\n3,2  3,4  | 3,3\n2,7  4,8  | 3,6 3,7 3,8\n6,1  9,1  | 3,1 4,1 4,2 4,3 4,4 5,1 5,2 5,3 6,2 7,1 7,2 8,1 8,2 8,3 8,4 8,5 8,6\n5,4  5,6  | 4,5 5,5 6,4 6,5 6,6\n6,8  8,7  | 4,6 4,7 5,7 5,8 6,7 7,6 7,7 7,8 8,8\n7,3  7,5  | 6,3 7,4\n8,9 10,10 | 7,9 9,9 9,10\n9,3  10,6 | 9,2 9,4 9,5 9,6 9,7 9,8 10,1 10,2 10,3 10,4 10,5 10,7 10,8 10,9\n";
        const canvas = createCanvas(10, 10);
        const puzzle = Puzzle.parseFromString(desc);
        PuzzleTable.drawPuzzle(canvas, puzzle, 25);
        const context = canvas.getContext("2d");
        if(context){
            const imageData1 = context.getImageData(4, 4, 5, 5);
            assert.deepStrictEqual(
                [...imageData1.data],
                [ 197, 195, 198, 255, 197, 195, 198, 255, 197, 195, 198,
                    255, 197, 195, 198, 255, 197, 195, 198, 255, 197, 195,
                    198, 255, 197, 195, 198, 255, 197, 195, 198, 255, 197,
                    195, 198, 255, 197, 195, 198, 255, 197, 195, 198, 255,
                    197, 195, 198, 255, 197, 195, 198, 255, 197, 195, 198,
                    255, 197, 195, 198, 255, 197, 195, 198, 255, 197, 195,
                    198, 255, 197, 195, 198, 255, 197, 195, 198, 255, 197,
                    195, 198, 255, 197, 195, 198, 255, 197, 195, 198, 255,
                    197, 195, 198, 255, 197, 195, 198, 255, 197, 195, 198,
                    255],
                "pixels should be the same"
            );

            const imageData2 = context.getImageData(6, 0, 7, 3);
            assert.deepStrictEqual(
                [...imageData2.data],
                [1,   1,   1, 255,   1,   1,   1, 255,   1,   1,
                1, 255,   1,   1,   1, 255, 197, 195, 198, 255,
                197, 195, 198, 255, 197, 195, 198, 255, 197, 195,
                198, 255, 197, 195, 198, 255, 197, 195, 198, 255,
                197, 195, 198, 255, 197, 195, 198, 255],
                "pixels should be the same"
            );

            const imageData3 = context.getImageData(8, 0, 10, 2);
            assert.deepStrictEqual(
                [...imageData3.data],
                [1,   1,   1, 255,   1,   1,
                    1, 255, 197, 195, 198, 255,
                  197, 195, 198, 255],
                "pixels should be the same"
            );
        }else{
            throw Error("shoudld have canvas data");
        }
    });

    

});