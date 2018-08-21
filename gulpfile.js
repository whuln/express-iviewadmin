const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const { exec } = require('child_process');
const del = require('del');

var serverjs = {
    es6_paths: ['server/es6/*.js', 'server/es6/**/*.js'],
    coffee_paths: ['server/es6/*.coffee', 'server/es6/**/*.coffee'],
    destlib: 'server'
};
gulp.task('build-es6', () => {
    return gulp.src(serverjs.es6_paths)
        .pipe(plugins.babel())
        .pipe(gulp.dest(serverjs.destlib));

});

gulp.task('build-coff', () => {
    return gulp.src(serverjs.coffee_paths)
        .pipe(plugins.coffee())
        .pipe(gulp.dest(serverjs.destlib));

});

gulp.task('watch', function () {
    gulp.watch(serverjs.es6_paths, ['build-es6']);
    gulp.watch(serverjs.coffee_paths, ['build-coff']);
});

gulp.task('start', function () {
    plugins.nodemon({
        script: './server/server.js',
        env: { 'NODE_ENV': 'development' }
    })
});

gulp.task('build-client', function () {

    exec('npm run build', {
        cwd: process.cwd(),
        maxBuffer: 1000 * 1024,
    }, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(stdout);
        console.log("build client done");
        gulp.src('./server/public/index.html')
            .pipe(gulp.dest('./server/views'));
        del(['./server/public/index.html']);
    });
});

gulp.task('dev', ['build-es6', 'build-coff', 'watch', 'start']);
gulp.task('build', ['build-client', 'build-es6', 'build-coff', 'start']);