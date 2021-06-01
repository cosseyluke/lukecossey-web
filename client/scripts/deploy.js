'use strict';

const { spawn } = require("child_process");

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('../config/env');

const transfer = spawn("rsync", ["-azP", "--delete", `./build/`, `${process.env.DEPLOY_SCP}`]);

transfer.stdout.on("data", data => {
    console.log(`${data}`);
});

transfer.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});

transfer.on('error', (error) => {
    console.log(`error: ${error.message}`);
});
