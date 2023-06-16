import assert from 'assert';
import process from 'process';
import { Server } from 'http';
import express, { Request, Response, Application } from 'express';
import asyncHandler from 'express-async-handler';
import HttpStatus from 'http-status-codes';
import { Puzzle } from './Puzzle';

// Start server on port 8789
const PORT = 8789;

/**
 * Make a new Puzzle by parsing a file.
 *
 * @param filename Path to puzzle board file.
 * @returns A new Puzzle with the size and configuration from the '.starb' file.
 * @throws Error if the file cannot be read or is not a blank puzzle.
 */
function generateBlankPuzzle(filename:string):Puzzle {
  throw Error('not implemented yet');

}


/**
 * Start a puzzle server using the given arguments.
 * Command-line usage:
 *     npm start FILENAME
 * where:
 * 
 *   - FILENAME is the path to a valid board file, which will be loaded as
 *     the starting puzzle board.
 * 
 * PORT is fixed to 8789
 * For example, to start a web server on port 8789 using the puzzle in `boards/hearts.txt`:
 *     npm run server puzzles/kd-1-1-1.starb
 * 
 * @throws Error if an error occurs parsing a file or starting a server
 */
async function main(): Promise<void> {
    throw Error('not implemented yet');
}

/**
 * HTTP web game server.
 */
export class WebServer {

    private readonly app: Application;
    private server: Server|undefined;

    /**
     * Make a new web puzzle server using puzzle that listens for connections on port 8789.
     * 
     * @param puzzle shared game board
     */
    public constructor(
        private readonly puzzle: Puzzle 
    ) {
        throw Error('not implemented yet');
    }

    /**
     * Start this server.
     * 
     * @returns (a promise that) resolves when the server is listening
     */
    public start(): Promise<void> {
        throw Error('not implemented yet');
    }

    /**
     * Stop this server. Once stopped, this server cannot be restarted.
     */
     public stop(): void {
        throw Error('not implemented yet');
    }
}


if (require.main === module) {
    main();
}