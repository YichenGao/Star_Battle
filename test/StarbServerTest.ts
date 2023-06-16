/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This test file runs in Node.js, see the `npm test` script.
// Remember that you will *not* be able to use DOM APIs in Node, only in the web browser.
// See the *Testing* section of the project handout for more advice.

import assert from 'assert';
import { WebServer } from '../src/StarbServer';
import fetch from 'node-fetch';
import HttpStatus from 'http-status-codes';
import fs from 'fs';

// Start server on port 8789
const PORT = 8789;

describe('server', function () {
    /*
     * Testing strategy is to cover the subdomains of the following partitions
     *      Partition based on the file: exist in the library, not exist in the library,
     *                                   contians invalid grammar
     *
     */

    it('covers generate blank board from file', async function () {
        const server = new WebServer();
        await server.start();

        const url = `http://localhost:${PORT}/kd-1-1-1`;

        // in this test, we will just assert correctness of the server's output
        const response = await fetch(url);
        assert.strictEqual(await response.text(), await fs.readFileSync("puzzles/kd-1-1-1.starb").toString('utf-8'));
        server.stop();
    });

    it('covers generate blank board from an invalid file', async function () {
        const server = new WebServer();
        await server.start();

        const url = `http://localhost:${PORT}/x`;

        // in this test, we will just assert correctness of the response code
        const response = await fetch(url);
        assert.strictEqual(response.status, HttpStatus.INTERNAL_SERVER_ERROR);

        server.stop();
    });

    it('covers get an existing file that is not a Puzzle', async function () {
        const server = new WebServer();
        await server.start();

        const url = `http://localhost:${PORT}/notPuzzle`;

        // in this test, we will just assert correctness of the response code
        const response = await fetch(url);
        assert.strictEqual(await response.text(), await fs.readFileSync("puzzles/notPuzzle.starb").toString('utf-8'));
        assert.strictEqual(response.status, HttpStatus.OK);
        server.stop();
    });


});
