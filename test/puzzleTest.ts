import assert from 'assert';
import {Puzzle} from '../src/puzzle';
import {parse, parseFromFile, PuzzleInfo, Element, puzzleToString} from '../src/parser';
/**
 * Tests the parser functions
 */

describe('puzzle tests', function(){
    /**
     * Testing Strategy
     * 
     * parseBlankFromFile():
     * Implemented with glue code, correctness tested via parseFromFile function test in parseTest.ts
     * 
     * parseFromString():
     * Implemented with glue code, correctness tested via parse function test in parseTest.ts
     * 
     * getElement():
     * Partition on outputs - empty cell or cell with a star on it
     * 
     * changeElement():
     * Partition on existing elements that the cell has - empty or has a star
     * 
     * isSolved():
     * Partition on puzzle state - solved and unsolved
     * 
     * equalValue():
     * partition on equality state - equal or unequal
     */

    it('test getElement with a star in the cell, change element for an empty cell', function(){
        const puzzleString = "10x10\n1,2  1,5  | 1,1 1,3 1,4 1,6 1,7 1,8 2,1 2,2 2,3 2,4 2,5 2,6 2,8 3,5\n2,9  4,10 | 1,9 1,10 2,10 3,9 3,10 4,9 5,9 5,10 6,9 6,10 7,10 8,10\n3,2  3,4  | 3,3\n2,7  4,8  | 3,6 3,7 3,8\n6,1  9,1  | 3,1 4,1 4,2 4,3 4,4 5,1 5,2 5,3 6,2 7,1 7,2 8,1 8,2 8,3 8,4 8,5 8,6\n5,4  5,6  | 4,5 5,5 6,4 6,5 6,6\n6,8  8,7  | 4,6 4,7 5,7 5,8 6,7 7,6 7,7 7,8 8,8\n7,3  7,5  | 6,3 7,4\n8,9 10,10 | 7,9 9,9 9,10\n9,3  10,6 | 9,2 9,4 9,5 9,6 9,7 9,8 10,1 10,2 10,3 10,4 10,5 10,7 10,8 10,9\n";
        const puzzle = Puzzle.parseFromString(puzzleString);
        assert(Element.Star,puzzle.getElement(0,1));
        assert(Element.Empty, puzzle.changeElement(0,1,Element.Empty).getElement(0,1));
    });
    it('test getElement for an empty cell, change element for a star cell', function(){
        const puzzleString = "10x10\n1,2  1,5  | 1,1 1,3 1,4 1,6 1,7 1,8 2,1 2,2 2,3 2,4 2,5 2,6 2,8 3,5\n2,9  4,10 | 1,9 1,10 2,10 3,9 3,10 4,9 5,9 5,10 6,9 6,10 7,10 8,10\n3,2  3,4  | 3,3\n2,7  4,8  | 3,6 3,7 3,8\n6,1  9,1  | 3,1 4,1 4,2 4,3 4,4 5,1 5,2 5,3 6,2 7,1 7,2 8,1 8,2 8,3 8,4 8,5 8,6\n5,4  5,6  | 4,5 5,5 6,4 6,5 6,6\n6,8  8,7  | 4,6 4,7 5,7 5,8 6,7 7,6 7,7 7,8 8,8\n7,3  7,5  | 6,3 7,4\n8,9 10,10 | 7,9 9,9 9,10\n9,3  10,6 | 9,2 9,4 9,5 9,6 9,7 9,8 10,1 10,2 10,3 10,4 10,5 10,7 10,8 10,9\n";
        const puzzle = Puzzle.parseFromString(puzzleString).changeElement(0,0,Element.Star);
        assert(Element.Star, puzzle.getElement(0,0));
    });
    it('puzzle is solved',function(){
        const puzzle = Puzzle.parseSolvedPuzzle('puzzles/kd-1-1-1.starb');
        assert(puzzle.isSolved());
    });
    it('blank puzzle should be unsolved',function(){
        const puzzleString = "10x10\n1,5  | 1,1 1,2 1,3 1,4 1,6 1,7 1,8 2,1 2,2 2,3 2,4 2,5 2,6 2,8 3,5\n2,9  4,10 | 1,9 1,10 2,10 3,9 3,10 4,9 5,9 5,10 6,9 6,10 7,10 8,10\n3,2  3,4  | 3,3\n2,7  4,8  | 3,6 3,7 3,8\n6,1  9,1  | 3,1 4,1 4,2 4,3 4,4 5,1 5,2 5,3 6,2 7,1 7,2 8,1 8,2 8,3 8,4 8,5 8,6\n5,4  5,6  | 4,5 5,5 6,4 6,5 6,6\n6,8  8,7  | 4,6 4,7 5,7 5,8 6,7 7,6 7,7 7,8 8,8\n7,3  7,5  | 6,3 7,4\n8,9 10,10 | 7,9 9,9 9,10\n9,3  10,6 | 9,2 9,4 9,5 9,6 9,7 9,8 10,1 10,2 10,3 10,4 10,5 10,7 10,8 10,9\n";
        const puzzle = Puzzle.parseFromString(puzzleString);
        assert(!puzzle.isSolved());
    });
    it('equal puzzles', function(){
        const puzzle1 = Puzzle.parseSolvedPuzzle('puzzles/kd-1-1-1.starb');
        const puzzle2 = Puzzle.parseSolvedPuzzle('puzzles/kd-1-1-1.starb');
        assert(puzzle1.equalvalue(puzzle2));
    });
    it('unequal puzzles', function(){
        const puzzle1 = Puzzle.parseSolvedPuzzle('puzzles/kd-1-1-1.starb');
        const puzzle2 = Puzzle.parseSolvedPuzzle('puzzles/kd-1-1-1.starb').changeElement(0,0,Element.Star);
        assert(!puzzle1.equalvalue(puzzle2));
    })
})