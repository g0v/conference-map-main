/*jshint node: true*/
"use strict";

module.exports = function(grunt){

  grunt.initConfig({
    //metadata
    pkg: grunt.file.readJSON('package.json'),

    //Task Configutation
    cssbeautifier: {
      //files: ['test/*.css'],
      files: [
        'assets/css/1200.css',
        'assets/css/720.css',
        'assets/css/default.css',
        'assets/css/master.css',
        'assets/css/mobile.css'
      ],
      options: {
        indent: '  ',
        openbrace: 'end-of-line',
        autosemicolon: true
      }
    },
  });

  grunt.loadNpmTasks('grunt-cssbeautifier');
  grunt.registerTask('cssbu',['cssbeautifier']);


};
