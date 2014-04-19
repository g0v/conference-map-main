gulp = require 'gulp'

liveScript = require 'gulp-livescript'

concat = require 'gulp-concat'

paths = {
  liveScripts: './assets/ls/*.ls'
  liveScriptsDest: './assets/js/'
}

gulp.task 'liveScripts', -> ((gulp.src paths.liveScripts).pipe liveScript {bare: true}).pipe gulp.dest paths.liveScriptsDest

gulp.task 'build', ['liveScripts'], ->

gulp.task 'dev', ['build'], ->
  watcher = gulp.watch paths.liveScripts, ['liveScripts']
  watcher.on 'change', (event) -> console.log 'File ' + event.path + ' was ' + event.type + ', running tasks...'

gulp.task 'default', ['liveScripts']
