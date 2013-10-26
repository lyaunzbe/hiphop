/*global module:false*/

var exec = require('child_process').exec,
    child;


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          "require": true,
          "module" : true
        },
        reporter: 'checkstyle'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'tap']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tap test task
  grunt.registerTask('tap', 'Used for running node-tap', function(){
    var done = this.async();

    child = exec('npm test',
      function (error, stdout, stderr) {
        grunt.log.write(stdout);
        grunt.log.error(stderr);
        if (error !== null) {
          grunt.log.error(error);
        }
        done();
      });

  });
  // Default task.
  grunt.registerTask('default', ['jshint','tap']);
  grunt.registerTask('test', ['tap']);


};
