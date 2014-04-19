var gulp = require('gulp');
var liveScript = require('gulp-livescript');
var concat = require('gulp-concat');

var paths = {
    liveScripts: './assets/ls/*.ls',
};

// compile react scripts and concat into one
gulp.task('liveScripts', function(){
    // place code for your default task here
    // gulp.src(paths.liveScripts)
    //     .pipe(react())
    //     .pipe(concat('expr.react.all.js'))
    //     .pipe(gulp.dest('./static/js/v2/build'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['liveScripts']);