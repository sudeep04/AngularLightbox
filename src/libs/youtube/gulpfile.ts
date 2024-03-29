const gulp = require('gulp');
const sass = require('node-sass');
const inlineTemplates = require('gulp-inline-ng2-template');
const exec = require('child_process').exec;

const INLINE_TEMPLATES = {
    SRC: [
        '!./src/**/*spec.ts',
        './src/**/*.ts'
    ],
    DIST: 'tmp',
    CONFIG: {
        base: './src',
        target: 'es6',
        useRelativePaths: true,
        styleProcessor: compileSass
    }
};

gulp.task('inline-templates', () => {
    return gulp.src(INLINE_TEMPLATES.SRC)
        .pipe(inlineTemplates(INLINE_TEMPLATES.CONFIG))
        .pipe(gulp.dest(INLINE_TEMPLATES.DIST));
});

gulp.task('publish:esm', ['inline-templates'], (callback) => {
    exec('npm run ngcompile', function (error, stdout, stderr) {
        console.log(stdout, stderr);
        callback(error)
    });
});

function compileSass(path, ext, file, callback) {
    let compiledCss = sass.renderSync({
        file: path,
        outputStyle: 'compressed',
    });
    callback(null, compiledCss.css);
}
