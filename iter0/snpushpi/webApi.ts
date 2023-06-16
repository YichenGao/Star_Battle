/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

import assert from 'assert';
import process from 'process';
import { Server } from 'http';
import express, { Application } from 'express';
import asyncHandler from 'express-async-handler';
import HttpStatus from 'http-status-codes';
//import { Puzzle } from './Puzzle'; ,uncomment once you have the puzzle board

// Start server on port 8789
const PORT = 8789;
/**
 * Start a puzzle server using the given argument and then send a blank puzzle to the client
 * A little recommendation for implementer: For generating a blank puzzle from a specific file, write a factory function inside puzzle ADT. 
 * And then inside here you just await that response and send that instance to the client.
 * 
 * Command-line usage:
 *     npm start FILENAME
 * where:
 *   - FILENAME is the path to a valid puzzle file, which will be sent to the client upon
 *     request
 * 
 * For example, to start a web server on port 8879 using the
 * puzzle in `puzzles/kd-1-1-1.starb:
 *     npm start boards/kd-1-1-1.starb
 * 
 * @throws Error if an error occurs parsing a file or starting a server
 */
async function main(): Promise<void> {
    throw new Error("implement me senpai");
}


/**
 * HTTP web game server.
 */
export class WebServer {

    private readonly app: Application;
    private readonly server: Server|undefined;

    /**
     * Make a new web game server using puzzle that listens for connections on port 8789
     * 
     * @param puzzle the puzzle board
     */
    public constructor(
        //private readonly puzzle: Puzzle, uncomment later
    ) {
        throw new Error("Implement Me Senpai");
    }

    /**
     * Start this server.
     * 
     * @returns (a promise that) resolves when the server is listening
     */
    public start(): Promise<void> {
        throw new Error("Implement me senpai");
    }

    /**
     * Stop this server. Once stopped, this server cannot be restarted.
     */
     public stop(): void {
        this.server?.close();
        console.log('server stopped');
    }

}


if (require.main === module) {
    void main();
}
