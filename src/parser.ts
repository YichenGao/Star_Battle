import fs from 'fs';
import assert from 'assert';
import { Parser, ParseTree, compile } from 'parserlib';

//the grammer for the puzzles in a string fromat
const grammar = `
@skip whitespace {
    table ::= comments size (row)*;
    comments ::= ('#' text newLine)*;
    size ::= number 'x' number newLine;
    row ::= (star)* '|' (empty)* newLine;
    star ::= cell;
    empty ::= cell;
    cell ::= number ',' number;
}
number ::= [0-9]+;
newLine ::= '\\n';
text ::= [^\\n\\r]*;
whitespace ::= [ \\t]+;
`;

// the nonterminals of the grammar
export enum PuzzleGrammar {
   Table, Size, Row, Star, Empty, Cell, Number, NewLine, Whitespace, Comments, Text
}

// compile the grammar into a parser
export const parser: Parser<PuzzleGrammar> = compile(grammar, PuzzleGrammar, PuzzleGrammar.Table);
export enum Element {Star='*', Empty=' '}

/**
 * Puzzle information type.
 *
 * @property {Array<number>} regions an array that maps each cell index to its region label.
 * @property {Array<Element>} board an array that maps each cell index to the presence or absence of a star in the board.
 * @property {number} rowsNum the number of rows in the puzzle.
 * @property {number} columnsNum the number of columns in the puzzle.
 */
export type PuzzleInfo = {
    regions: Array<number>;
    board: Array<Element>;
    rowsNum: number;
    columnsNum: number;
};

/**
 * Parses a puzzle file and returns a PuzzleInfo object containing puzzle information.
 * 
 * @param fileName name of the file to parse.
 * @returns PuzzleInfo object containing the parsed puzzle information.
 * @throws error if the file cannot be read or if the parse function fails to parse the puzzle.
 */
export function parseFromFile(fileName:string): PuzzleInfo {
    const puzzleInput:string = fs.readFileSync(fileName, { encoding: 'utf-8' });    
    return parse(puzzleInput);
}

/**
 * Creates a PuzzleInfo object that describes the puzzle.
 * 
 * @param input the puzzle in a string format
 * @returns PuzzleInfo object containing the parsed puzzle string. 
 */
export function parse(input: string): PuzzleInfo {
    // parse the example into a parse tree
    const parseTree: ParseTree<PuzzleGrammar> = parser.parse(input);
    const {row:rowsNum, column:columnsNum} = parseSize(parseTree);
    const toIndex = ([r, c]:[number, number]):number=> ((r-1)*columnsNum+ (c-1));
    
    const regions:number[] = new Array<number>(rowsNum * columnsNum).fill(-1);
    const solution:Element[] = new Array<Element>(rowsNum * columnsNum).fill(Element.Empty);

    const rows: Array<ParseTree<PuzzleGrammar>> = parseTree.childrenByName(PuzzleGrammar.Row);
    for (const [labelIdx, row] of rows.entries()) {
        const stars1d = row.childrenByName(PuzzleGrammar.Star).map(parseCell).map(toIndex);
        const empty1d = row.childrenByName(PuzzleGrammar.Empty).map(parseCell).map(toIndex);

        stars1d.forEach((idx) => (solution[idx] = Element.Star));
        [...stars1d, ...empty1d].forEach((index) => (regions[index] = labelIdx));

    }
    assert.strictEqual(regions.length, rowsNum * columnsNum);
    regions.forEach((label:number)=> assert(label>=0, 'missing label'));
    return {
        regions: regions, board: solution,
        rowsNum: rowsNum, columnsNum: columnsNum
    };
}

/**
 * Converts a puzzle object to a string representation that can be parsed.
 * 
 * @param info of the puzzle object containing the board, its dimensions, and the regions.
 * @returns a string representing the board, such that parse(puzzleToString(info)) is deep-equal to info
 */
export function puzzleToString(info:PuzzleInfo):string {
    const toCoordinates = (index:number):string =>
     `${Math.floor(index/info.columnsNum)+1},${(index%info.columnsNum)+1}`;
    const regionsNum = new Set(info.regions).size;
    
    type LineInfo = {stars:string[], empty:string[]};
    const lines:LineInfo[] = [];
    for (let i=0; i<regionsNum; i++){
        lines.push({stars:[], empty:[]});
    }
    info.board.forEach((element, index) => {
        const region = info.regions[index] ?? assert.fail("index out of range");
        const line = lines[region] ?? assert.fail("line is missing");
        if (element === Element.Star) {
          line.stars.push(toCoordinates(index));
        } else {
          line.empty.push(toCoordinates(index));
        }
    });
    let board = `${info.rowsNum}x${info.columnsNum}\n`;
    board += lines.map(line => `${line.stars.join(" ")} | ${line.empty.join(" ")}\n`).join("");
    return board;
}

/**
 * Parses the size of the puzzle from the given parse tree.
 * 
 * @param parseTree - the parse tree of the puzzle
 * @returns an object containing the number of rows and columns in the puzzle
 * @throws an error if the parse tree does not contain a size element 
 *          or if the size element has invalid children
 */
function parseSize(parseTree:ParseTree<PuzzleGrammar>): {row:number, column:number} {
    const sizeElement = parseTree.childrenByName(PuzzleGrammar.Size)[0];
    assert(sizeElement !== undefined, 'Table should start with size');

    const numberElements:ParseTree<PuzzleGrammar>[] = sizeElement.childrenByName(PuzzleGrammar.Number);
    assert(numberElements.length === 2, 'Size element should contain two number elements');

    const dim: number[] = numberElements.map((child:ParseTree<PuzzleGrammar>):number => parseInt(child.text));
    assert(dim[0]!== undefined && dim[1]!==undefined);
    return {row:dim[0], column:dim[1]};
}

/**
 * Parses a cell in the puzzle input and returns its (row, column) coordinates.
 * 
 * @param element parse tree node representing the element to parse (either Star of Empty).
 * @returns an array with two elements, the row and column coordinates of the cell.
 * @throws error if the input parse tree node doesn't have exactly two child nodes.
 *         or if the row or column coordinate is not a valid integer.
 */
function parseCell(element:ParseTree<PuzzleGrammar>):[number, number] {
    const cell : ParseTree<PuzzleGrammar> = element.childrenByName(PuzzleGrammar.Cell)[0]?? assert.fail('element should be a cell');
    const children: ParseTree<PuzzleGrammar>[] = cell.childrenByName(PuzzleGrammar.Number);
    const coordinates= children.map((child:ParseTree<PuzzleGrammar>):number => parseInt(child.text));
    assert(coordinates.length===2);
    return coordinates as [number, number];
}