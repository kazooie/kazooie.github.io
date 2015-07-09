var gulp = require('gulp');
var concat = require('gulp-concat');
var template = require('gulp-template');
var shell = require('gulp-shell');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');


var LIVE_CONFIG = {
    scripts: ['./assets/bundle.js'],
    stylesheets: ['./assets/bundle.css'],
    dest: './'
}, DEV_CONFIG = {
    scripts: [
        'http://localhost:8090/webpack-dev-server.js',
        'http://localhost:8090/assets/bundle.js'
    ],
    stylesheets: [
        'http://localhost:8090/src/css/normalize.css',
        'http://localhost:8090/src/css/skeleton.css',
        'http://localhost:8090/src/css/page.css'
    ],
    dest: './dev'
};



gulp.task('minify-css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(concat('bundle.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('assets'));
});

gulp.task('http-server', shell.task(['"node_modules/.bin/http-server" ./dev -p 8080']));
gulp.task('webpack-dev-server', shell.task(['webpack-dev-server --progress --colors --port 8090']));
gulp.task('webpack', shell.task(['webpack --progress --colors']));

gulp.task('watch-css', function () {
    gulp.watch('./src/css/*.css', ['minify-css']);
});

/**
 * Compiles HTML template into dev or live
 */
function compileHTML(config) {
    return function () {
        return gulp.src('src/html/index.html')
            .pipe(template({
                scripts: config.scripts,
                stylesheets: config.stylesheets
            }))
            .pipe(gulp.dest(config.dest));
    }
}
gulp.task('compile-html', compileHTML(LIVE_CONFIG));
gulp.task('compile-html-dev', compileHTML(DEV_CONFIG));

/** npm start **/
gulp.task('watch', ['watch-css', 'webpack-dev-server', 'http-server', 'compile-html-dev']);

/** npm run compile **/
gulp.task('default', ['minify-css', 'webpack', 'compile-html']);