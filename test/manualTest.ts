/** 
 * Manual Test for Interaction which also covers the tests for clients
 * 
 * Testing Strategy is to cover the subdomains of the following test partitions:
 *      - partition on game difficulty: easy, hard
 *      - partition on number of clicks: 0, 1, >1
 *      - partition on click type: add a star, remove a star
 *      - partition on the state of the puzzle: blank, partially solved, solved
 * 
 * Test 1 - Covers game difficulty easy, number of clicks is 0, blank puzzle:
 *      1. Start the server by running the command 'npm run server' in the console
 *      2. Open 'starb-client.html' in a web browser
 *      3. Assert that the page shows puzzle instructions, a dropdown menu to choose puzzle difficulty
 *      4. Assert that the page shows a default puzzle of level easy (which should be kd-1-1-1) 
 *      5. Assert that all cells in the puzzle are empty
 *      6. Choose 'Easy' from the dropdown list => assert that the puzzle view remains the same
 *      7. Assert that there are no comments in the output box
 * 
 * Test 2 - Covers game difficulty hard, number of clicks is 1, click type add a star, puzzle is partially-solved:
 *      1. Start the server by running the command 'npm run server' in the console
 *      2. Open 'starb-client.html' in a web browser
 *      3. Assert that the page shows puzzle instructions, a dropdown menu to choose puzzle difficulty
 *      4. Choose 'Hard' from the dropdown list => assert that the puzzle view changes to kd-6-31-6 
 *      5. Assert that all cells in the puzzle are empty
 *      6. Click on cell (4, 5) => assert that a star appears in the same cell
 *      7. Assert that there a comment appears in the output box stating that the puzzle has not been solved yet
 * 
 * Test 3 - Covers number of clicks is >1, click type remove a star, puzzle is solved:
 *      1. Start the server by running the command 'npm run server' in the console
 *      2. Open 'starb-client.html' in a web browser
 *      3. Click on cell (3, 3) and then (1,2) => assert that a star appears in both cells
 *      4. Assert that there a comment appears in the output box stating that the puzzle has not been solved yet
 *      5. Click again on cell (3, 3) => assert that a star disappears from the cell
 *      6. Click on the rest of the cells to solve the puzzle (refer to 'puzzles/kd-1-1-1.starb' for the solution)
 *      7. Assert that the stars symbols change to swords, and a message in the output box state that you won
 *      8. click any of the swords => assert that sword disapper; the other swords symbols update back to stars;
 *          and output box states that the puzzle has not been solved yet.
*/