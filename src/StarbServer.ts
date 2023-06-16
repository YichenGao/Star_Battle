/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This file runs in Node.js, see the `npm server` script.
// Remember that you will *not* be able to use DOM APIs in Node, only in the web browser.
import assert from 'assert';
import { Server } from 'http';
import express, {Application} from 'express';
import HttpStatus from 'http-status-codes';
import fs from 'fs';
const PORT = 8789;
/**
 * Start a puzzle server using the given argument and then send a blank puzzle to the client
 * where FILENAME is the name of a valid puzzle file, which will be sent to the client upon
 *     request
 * 
 * For example, to start a web server on port 8789 using the
 * puzzle in `puzzles/kd-1-1-1.starb:
 *     npm run server
 *     Then navigate to http://localhost:8789/kd-1-1-1
 * 
 * @throws Error if an error occurs parsing a file or starting a server
 */

async function main(): Promise<void> {
    const server = new WebServer();
    server.start();
}

/**
 * HTTP web puzzle server.
 */
export class WebServer {

    private readonly app: Application = express();
    private server: Server|undefined;
    private readonly port:number;
    
    // Abstraction Function:
    // AF(app, server, port) = a server that holds the puzzle and sends stirng puzzles to the clients with port 'port'
    //                          through http://localhost:{port}/puzzleName
    // Representation Invariant:
    //      port === 8789
    //
    // Safety from Representation Exposure:
    //      all fields are private and clients cannot modify them

    // Check the representation of the WebServer
    private checkRep(): void{
        assert(this.port === PORT);
    }

    /**
     * Make a new web puzzle server using puzzle that listens for connections on port 8789.
     * 
     * @param puzzle shared game board
     */
    public constructor() {
        this.port = PORT;
        this.checkRep();

        this.app.use((request, response, next) => {
            // allow requests from web pages hosted anywhere
            response.set('Access-Control-Allow-Origin', '*');
            next();
        });
        // send the puzzle as a string to the client
        this.app.get('/:filename', function(req, res, next) {
            const puzzlename = req.params.filename;
            const filename = `puzzles/${puzzlename}.starb`;
            const puzzleString = fs.readFileSync(filename, { encoding: 'utf-8' });
            res.status(HttpStatus.OK) // 200
            .type('text')
            .send(puzzleString)
            .end();
        });
    }

    /**
     * Start this server.
     * 
     * @returns (a promise that) resolves when the server is listening
     */
    public start(): Promise<void> {
        this.checkRep();
        const port = this.port;
        return new Promise(resolve => {
            this.server = this.app.listen(this.port, function() {
                console.log(`Puzzle web server listening on http://localhost:${port}`);
            });

            resolve();
        });
    }

    /**
     * Stop this server. Once stopped, this server cannot be restarted.
     */
     public stop(): void {
        this.checkRep();
        this.server?.close();
        console.log('server stopped');
    }
}

if (require.main === module) {
    void main();
}