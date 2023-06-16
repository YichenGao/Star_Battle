describe('Game', function () {
    // Testing strategy
    // Parition on the action: placing a star, removing a star
    // Partition on how dots arrive after putting a star in a row/col: First star in any row/col puts dots in surrounding cells, Second star in any row/col puts dots in surrounding cells 
    // and in every cell other than star cell along the row/col. //TODO:Third star logic and what we want to do with that generally
    // Partition on how dots disappear after clicking a star: If that's the only star in some row and col, then dots from surrounding cells. If that's the second star in a row and first star in a column, then dots from 
    // surroding cells and along the row other than the cells surrounding the other star. Similar logic goes for when its' second star along a column and first star along a row. 
    // Partitioin on the location that the client is going to put a star: 
    //      empty cell, a cell that already contains a star, a cell with a dot
    //
    // Parition on the game states: partially solved, solved, blank
    // Partition on the number of stars that can be placed on a row of the board: 0, 10, inbetween
    // Partition on the number of stars that can be placed on a column of the board: 0, 10, inbetween
    // 
});