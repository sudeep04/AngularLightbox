const gulp = require('gulp');
const sass = require('node-sass');
const inlineTemplates = require('gulp-inline-ng2-template');
const exec = require('child_process').exec;

/**
 * Inline templates configuration.
 * @see  https://github.com/ludohenin/gulp-inline-ng2-template
 */
const YOUTUBE_INLINE_TEMPLATES = {
  SRC: './src/libs/youtube/**/*.ts',
  DIST: './tmp/youtube',
  CONFIG: {
    base: '/src/libs/youtube',
    target: 'es6',
    useRelativePaths: true,
    styleProcessor: compileSass
  }
};

/**
 * Inline external HTML and SCSS templates into Angular component files.
 * @see: https://github.com/ludohenin/gulp-inline-ng2-template
 */
gulp.task('youtube-inline-templates', () => {
  return gulp.src(YOUTUBE_INLINE_TEMPLATES.SRC)
    .pipe(inlineTemplates(YOUTUBE_INLINE_TEMPLATES.CONFIG))
    .pipe(gulp.dest(YOUTUBE_INLINE_TEMPLATES.DIST));
});

/**
 * Build ESM by running npm task.
 * This is a temporary solution until ngc is supported --watch mode.
 * @see: https://github.com/angular/angular/issues/12867
 */
gulp.task('publish:youtube:esm', ['youtube-inline-templates'], (callback) => {
  exec('npm run ngcompile:youtube', function (error, stdout, stderr) {
    console.log(stdout, stderr);
    callback(error)
  });
});

/**
 * Implements ESM build watch mode.
 * This is a temporary solution until ngc is supported --watch mode.
 * @see: https://github.com/angular/angular/issues/12867
 */
// gulp.task('build:esm:watch', ['build:esm'], () => {
//   gulp.watch('src/**/*', ['build:esm']);
// });

/**
 * Compile SASS to CSS.
 * @see https://github.com/ludohenin/gulp-inline-ng2-template
 * @see https://github.com/sass/node-sass
 */
function compileSass(path, ext, file, callback) {
  let compiledCss = sass.renderSync({
    file: path,
    outputStyle: 'compressed',
  });
  callback(null, compiledCss.css);
}
