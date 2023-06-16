import assert from 'assert';
import process from 'process';
import { Server } from 'http';
import express, { Request, Response, Application } from 'express';
import asyncHandler from 'express-async-handler';
import HttpStatus from 'http-status-codes';
import { Puzzle } from './Puzzle';
import fs from 'fs';


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
    
}

/**
 * HTTP web puzzle server.
 */
export class WebServer {

    private readonly app: Application;
    private readonly server: Server|undefined;

    /**
     * Make a new web puzzle server using puzzle that listens for connections on port 8789.
     * 
     * @param puzzle shared game board
     */
    public constructor(
        private readonly puzzle: Puzzle 
    ) {
        this.app = express();
        this.app.use((request, response, next) => {
            // allow requests from web pages hosted anywhere
            response.set('Access-Control-Allow-Origin', '*');
            next();
        });

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
    void main();
}