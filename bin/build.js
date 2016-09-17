'use strict';

const toExec = require('child_process').exec;
const Async  = require('async');

let Tasks = [];

Tasks.push((doNext) => {
    toExec('tsc', (err, stdout, stderr) => {
        if (err) {
            return doNext(err);
        }
        console.log('Typescript done');
        return doNext(err);
    });
});

Tasks.push((doNext) => {
    toExec('webpack --optimize-minimize', (err, stdout, stderr) => {
        if (err) {
            return doNext(err);
        }
        console.log(stdout);
        doNext(err);
    });
});

Tasks.push((doNext) => {
    toExec('rm -Rf ./dist/.tmp', (err, stdout, stderr) => {
        if (err) {
            return doNext(err);
        }
        return doNext();
    });
});

Tasks.push((doNext) => {
    const fs = require('fs');
    return fs.readFile('./dist/app.js', 'utf8', (err, code) => {
        if (err) {
            return doNext(err);
        }

        code += 'module.exports=Router;';
        return fs.writeFile('./dist/app.js', code, (err) => {
            return doNext(err);
        });
    });
});

Async.waterfall(Tasks, (err) => {
    if (err) {
        throw err;
    }
    console.log('All tasks done');
});