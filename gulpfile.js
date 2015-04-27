var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');


/* Copy */
gulp.task('copy-normalize', function() {

    gulp.src('bower_components/normalize.css/normalize.css')

    .pipe(rename({prefix: '_', extname: '.scss'}))

    .pipe(gulp.dest('resources/styles/vendor'));

});


/* Styles */
gulp.task('styles', ['copy-normalize'], function() {
  return sass('resources/styles/app.scss', { style: 'expanded', noCache: true })
    .on('error', function (err) {
      console.error('Error!', err.message)
    })

    .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))

    .pipe(minifycss())

    .pipe(rename({suffix: '.min'}))

    .pipe(gulp.dest('public/css'));
});


/* Default task */
gulp.task('default', function() {
    gulp.start('styles');
});


/* Watch task */
gulp.task('watch', function() {

    // Default task
    gulp.start('default');

    // Watch .scss files
    gulp.watch('resources/styles/**/*.scss', ['styles']);

});