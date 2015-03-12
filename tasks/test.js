var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var dragon = require('../');
var plumber = require('gulp-plumber');

function test(done) {
	gulp.src('js/**/*.js')
		.pipe(istanbul())
		.pipe(istanbul.hookRequire())
		.on('finish', function() {
			gulp.src(['js/**/*.spec.js'], { read: false })
				.pipe(plumber())
				.pipe(dragon())
				.pipe(istanbul.writeReports({
					reporters: ['lcov']
				}))
				.on('end', done);
		});
}

module.exports = test;
