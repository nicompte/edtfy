const gulp = require('gulp');

gulp.task('peg', () => {
  const peg = require('gulp-peg');
  return gulp.src('edtfy.pegjs')
    .pipe(peg({
      optimize: 'speed',
      trace: false
    }))
    .pipe(gulp.dest('tmp'));
});

gulp.task('build', gulp.series('peg', () => {
  const uglify = require('gulp-uglify');
  const rename = require('gulp-rename');
  const browserify = require('browserify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');
  const sourcemaps = require('gulp-sourcemaps');
  const b = browserify('./edtfy.js', {
    standalone: 'edtfy',
    plugin: [
      ["browserify-derequire"]
    ]
  });
  return b.bundle()
    .pipe(source('edtfy.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
}));

gulp.task('test', () => {
  var mocha = require('gulp-mocha');
  return gulp.src('tests/**/*.js')
    .pipe(mocha());
});