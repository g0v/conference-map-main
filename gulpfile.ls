gulp = require 'gulp'
connect = require 'gulp-connect'
gutil = require 'gulp-util'

liveScript = require 'gulp-livescript'

paths = {
  liveScripts: './assets/ls/*.ls'
  liveScriptsDest: './assets/js/'
}

var http-server

gulp.task \httpServer, <[build]> ->
  port = 3333
  connect.server {root:'./', livereload: true, port: port}
  gutil.log "You can now connect to " + gutil.colors.bold.inverse "http://localhost:#{port}/"

gulp.task \liveScripts, ->
  gulp.src paths.liveScripts
    .pipe liveScript {bare: true}
    .pipe gulp.dest paths.liveScriptsDest

gulp.task \build, <[liveScripts]>, ->

gulp.task \dev, <[httpServer]>, ->
  watcher = gulp.watch paths.liveScripts, <[liveScripts]>
  watcher.on \change, (event) ->
    console.log 'File ' + event.path + ' was ' + event.type + ', running tasks...'
    connect.reload!

gulp.task \default, <[dev]>
