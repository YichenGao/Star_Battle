
/**
 * Tests for the Puzzle abstract data type.
 */
describe('Puzzle', function () {

    /*
     * Testing strategy for Expression
     * 
     * Testing strategy for each operation of Puzzle: cover the subdomains of the following partitions
     * 
     * parseFromFile(), getElement(), getRegion(), changeElement(), remove():
     *      Partition based on the size of the board: 0, 1, >1 (or just 10 for now)
     *      Partition based on the state of the puzzle: unsolved, partially-solved, or fully-solved
     *      Partition based on the number of stars in the puzzle: 0, 1, >1
     *      Partition based on the min([number_of_stars for region in regions]): 0, 1, 2, >2
     */

});

/**
 * Tests for the Clinet abstract data type.
 */
describe('Clinet', function () {

    /*
     * Testing strategy for Expression
     * 
     * Testing strategy for each operation of Clinet: cover the subdomains of the following partitions
     * 
     * click(), addCellClickListener(), getPuzzle(), isSolved(), size():
     *      Partition based on the size of the board: 0, 1, >1 (or just 10 for now)
     *      Partition based on the state of the puzzle: unsolved, partially-solved, or fully-solved
     *      Partition based on the number of stars in the puzzle: 0, 1, >1
     *      Partition based on the min([number_of_stars for region in regions]): 0, 1, 2, >2
     */

});