import assert from 'assert';
import * as parserlib from 'parserlib';
import {parse, parseFromFile, puzzleToString, PuzzleInfo, Element} from '../src/parser';
/**
 * Tests the parser functions
 */
describe('parse, parseFromFile, and puzzleToString', function () {

    /*
     * Testing strategy is to cover the subdomains of the following partitions
     * 
     * parse(), parseFromFile(), and puzzleToString():
     *      Partition based on the size of the board: 0, 1, >1
     *      Partition based on the number of stars: 0, 1, >1
     *      Partition based on the number of regions: 0, 1, >1
     *      Partition based on the state of the board: solved, partially-solved, blank
     *
     */
    it('parserlib needs to be version 3.2.x', function() {
        assert(parserlib.VERSION.startsWith("3.2"));
    });
    /**
     * Assert that parse and puzzleToString are compatable meaning that
     * parse(puzzleToString(info)) is deep-equal to info
     * 
     * @param info any valid PuzzleInfo according to parse spec
     */
    function assertValid(info:PuzzleInfo):void {
        const equivInfo:PuzzleInfo = parse(puzzleToString(info));
        assert.strictEqual(equivInfo.rowsNum, info.rowsNum);
        assert.strictEqual(equivInfo.columnsNum, info.columnsNum);
        assert.deepStrictEqual(equivInfo.regions, info.regions);
        assert.deepStrictEqual(equivInfo.board, info.board);
    }
    const S = Element.Star;
    const _ = Element.Empty;
    it('covers 10x10 fully-solved puzzle with 10 regions and two stars in each row, column, and region', function() {
        const info:PuzzleInfo = parseFromFile('puzzles/kd-1-1-1.starb');
        assert.strictEqual(info.rowsNum, 10);
        assert.strictEqual(info.columnsNum, 10);
        assert.deepStrictEqual(info.regions,[0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                                             0, 0, 0, 0, 0, 0, 3, 0, 1, 1,
                                             4, 2, 2, 2, 0, 3, 3, 3, 1, 1,
                                             4, 4, 4, 4, 5, 6, 6, 3, 1, 1,
                                             4, 4, 4, 5, 5, 5, 6, 6, 1, 1,
                                             4, 4, 7, 5, 5, 5, 6, 6, 1, 1, 
                                             4, 4, 7, 7, 7, 6, 6, 6, 8, 1, 
                                             4, 4, 4, 4, 4, 4, 6, 6, 8, 1,
                                             4, 9, 9, 9, 9, 9, 9, 9, 8, 8,
                                             9, 9, 9, 9, 9, 9, 9, 9, 9, 8]);

        assert.deepStrictEqual(info.board,[_, S, _, _, S, _, _, _, _, _,
                                          _, _, _, _, _, _, S, _, S, _,
                                          _, S, _, S, _, _, _, _, _, _,
                                          _, _, _, _, _, _, _, S, _, S,
                                          _, _, _, S, _, S, _, _, _, _,
                                          S, _, _, _, _, _, _, S, _, _,
                                          _, _, S, _, S, _, _, _, _, _,
                                          _, _, _, _, _, _, S, _, S, _,
                                          S, _, S, _, _, _, _, _, _, _,
                                          _, _, _, _, _, S, _, _, _, S]);
        assertValid(info);
    });
    it("covers partially-solved 3x3 puzzle with one region and one star", () => {
        const desc =  "3x3\n1,3 | 1,1 1,2 2,1 2,2 2,3 3,1 3,2 3,3\n";
        const info = parse(desc);
        assert.strictEqual(info.rowsNum, 3);
        assert.strictEqual(info.columnsNum, 3);
        assert.deepStrictEqual(info.board, [_, _, S, 
                                            _, _, _, 
                                            _, _, _]);
        assert.deepStrictEqual(info.regions, [0, 0, 0,
                                              0, 0, 0,
                                              0, 0, 0]);
        assertValid(info);
    });
    it("covers blank 2x3 puzzle with one region and no star", () => {
        const desc =  "2x3\n | 1,1 1,2 2,1 2,2 2,3 1,3\n";
        const info = parse(desc);
        assert.strictEqual(info.rowsNum, 2);
        assert.strictEqual(info.columnsNum, 3);
        assert.deepStrictEqual(info.board, [_, _, _, 
                                            _, _, _]);
        assert.deepStrictEqual(info.regions, [0, 0, 0,
                                              0, 0, 0]);
        assertValid(info);
    });
    it("covers empty puzzle with zeros regions stars", () => {
        const desc =  "0x0\n";
        const info = parse(desc);
        assert.strictEqual(info.rowsNum, 0);
        assert.strictEqual(info.columnsNum, 0);
        assert.deepStrictEqual(info.board, []);
        assert.deepStrictEqual(info.regions, []);
        assertValid(info);
    });
});