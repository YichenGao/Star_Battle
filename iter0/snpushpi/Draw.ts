// import { Canvas, Image, createCanvas, loadImage } from 'canvas';

// /**
//  * Draws a square with 10x10 gridcells 
//  * @param cellSize, a number denoting size of each cell
//  * @returns the square canvas object
//  */
// export function drawSqureWithGridCells(cellSize:number):Canvas {
//     const canvas = createCanvas(500,500);
//     const ctx = canvas?.getContext("2d");
//     ctx.strokeStyle = "green";
//     // Draw the grid
//     for (let x = 0; x < 10; x++) {
//     for (let y = 0; y < 10; y++) {
//         ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
//     }
//     }
//     return canvas;
// }
// /**
//  * 
//  * @param cellSize a number, size of each cell
//  * @param sqaure a canvas object which we want to modify by coloring a region
//  * @param coodinateList list of coordinates of the region we want to give a certain color to
//  * @param color a string 
//  */
// export function drawColoredRegions(cellSize:number,sqaure:Canvas,coodinateList:[number,number][],color:string):void{
//     sqaure.getContext('2d').fillStyle= color;
//     for (const tuple of coodinateList){
//         sqaure.getContext('2d').fillRect(tuple[0],tuple[1], cellSize, cellSize);
//     }
// }

// /**
//  * 
//  * @param colorMap a map mapping a color to a list of coordinates in a sqaure that will have the color
//  * @param cellSize a number denoti
//  * @returns a canvas object, which is a 10x10 square with 10 colored regions
//  */
// export function drawPuzzle(colorMap:Map<string,[number,number][]>, cellSize:number):Canvas{
//     const square = drawSqureWithGridCells(cellSize);
//     for (const [key,value] of colorMap){
//         drawColoredRegions(cellSize,square,value,key);
//     }
//     return square;
// }

