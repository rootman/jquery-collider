module.exports = (grunt) ->

  grunt.initConfig

    coffee:
      compile:
        files:
          'dist/jquery.collider.js': 'src/jquery.collider.coffee'

    watch:
      js:
        files: ['src/*.coffee']
        tasks: ['coffee']

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'