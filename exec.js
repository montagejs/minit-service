'use strict';

const spawn = require("child_process").spawn;

/**
 * Wrap executing a command in a promise
 * @param  {string} command command to execute
 * @param  {Array<string>} args    Arguments to the command.
 * @param  {string} cwd     The working directory to run the command in.
 * @param  {bool} shouldReturnOutput     set to true if stdout should be returned.
 * @return {Promise}        A promise for the completion of the command.
 */
module.exports = function exec(command, args, cwd, shouldReturnOutput) {
    return new Promise((resolve, reject) => {
        const proc = spawn(command, args, {
            cwd: cwd,
            stdio: ['ignore', (shouldReturnOutput ? 'pipe' : 'ignore'), 'pipe']
        });

        let stdout;
        if (shouldReturnOutput) {
            stdout = "";
            proc.stdout.on('data', (chunk) => {
                stdout += chunk.toString("utf8");
            });
        }

        let stderr = "";
        proc.stderr.on("data", (chunk) => {
            stderr += chunk.toString("utf8");
        });

        proc.on("error", (error) => reject(error));

        proc.on("close", (code) => {
            if (code === 0) {
                resolve(shouldReturnOutput ? stdout : undefined);
            } else {
                if (stderr) {
                    console.log("["+proc.pid+"]", "stderr", "*" + stderr.trim() + "*");
                }
                reject(new Error("'" + command + " " + args.join(" ") + "' in " + cwd + " exited with code " + code));
            }
        });
    });
};
