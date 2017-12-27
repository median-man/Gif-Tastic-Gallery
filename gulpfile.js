/* global require */
const connect = require('gulp-connect');
const gulp = require('gulp');
const mocha = require('gulp-mocha');

// start locoalhost server
gulp.task('connect', () => {
  return connect.server({ port: 3000 });
});

// disconnect localhost server after tests have finished
gulp.task('disconnect', ['mocha'], () => {
  return connect.serverClose();
});

// run task to start the localhost server before running mocha tests
gulp.task('mocha', ['connect'], () => {
  return gulp.src('test/js/integration-test.js', {read: false})
    // `gulp-mocha` needs filepaths so you can't have any plugins before it 
    .pipe(mocha())
    .once('error', () => process.exit(1))
    .once('end', () => process.exit(0));
});

// runs connect, moch, and disconnect tasks sequentially
gulp.task('test', ['disconnect']);
