# Star_Battle
In a Star Battle puzzle, a n×n grid is divided into n regions. To solve the puzzle, the player must find a placement of 2n stars such that each row, each column, and each region of the puzzle has exactly 2 stars, and no stars are vertically, horizontally, or diagonally adjacent. Other size variations are possible, but we’ll use 10×10 2-star puzzles for this project. We will also assume that valid puzzles have a single unique solution.

This logic puzzle was designed by Hans Eendebak in 2003. You can search the web for many more examples. Here is a site by Jim Bumgardner with tutorials, a web app, and pages and pages of Star Battle puzzle PDFs.

In this project, my group construct a system that sends puzzles over the network and provides a graphical user interface for players to solve them.

We implemented a client/server architecture; we use ParserLib to parse puzzles; and we develop our own abstract data types to represent different aspects of the system.