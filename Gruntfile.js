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

    //https://github.com/vkadam/grunt-jsbeautifier
    jsbeautifier: {
        //all file from assets/js/, except program.json.js
        files: ['assets/js/*.js', '!assets/js/program.json.js']

    },

    jshint: {
      options: {
        curly: true,
        //eqeqeq: true,
        immed: true,
        latedef: true,
        //newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        devel: true,
        globals: {
          jQuery: false,
          $: false
        }
      },
      //files: ['Gruntfile.js', 'assets/js/*.js', '!assets/js/program.json.js'],
      files: [
        'Gruntfile.js',
        'assets/js/chat-map.js',
        'assets/js/facebook.js',
        'assets/js/coscup-2013.js',
        /*'!assets/js/program.json.js'*/
        ],

    },
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: ['assets/js/lib/*.js'],
        dest: 'assets/js/js_plugins.min.js',
      },
    },

  });

  grunt.loadNpmTasks('grunt-cssbeautifier');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('cssbu',['cssbeautifier']);
  grunt.registerTask('jsbu', ['jsbeautifier']);
  grunt.registerTask('jshi', ['jshint']);
  grunt.registerTask('cc', ['concat']);


};
