var gulp = require('gulp');
var liveScript = require('gulp-livescript');
var concat = require('gulp-concat');

var paths = {
    liveScripts: './assets/ls/*.ls',
    liveScriptsDest: './assets/js/',
};

gulp.task('liveScripts', function(){
    gulp.src(paths.liveScripts)
         .pipe(liveScript({bare: true}))
         .pipe(gulp.dest(paths.liveScriptsDest));
});

gulp.task('build', ['liveScripts'],  function(){
});

gulp.task('dev', ['build'],  function(){
    var watcher = gulp.watch(paths.liveScripts, ['liveScripts']);
    watcher.on('change', function(event) {
        console.log('File '+event.path+' was '+event.type+', running tasks...');
    });

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['liveScripts']);
