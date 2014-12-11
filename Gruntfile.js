module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      dev: {
        files: [
          '<%= pkg.src_folder %>/_js/**/*.js',
          '<%= pkg.src_folder %>/scss/**/*.scss',
          '<%= pkg.src_folder %>/**/*.html',
          '<%= pkg.src_folder %>/**/*.php'
        ],
        tasks: ['dev']
      },
      js: {
        files: ['<%= pkg.src_folder %>/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    sass:{
      dev: {
        options:{
          loadPath: '<%= pkg.src_folder %>/bower_components/'
        },
        files:{
          '<%= pkg.build_folder %>/css/main.css':'<%= pkg.src_folder %>/scss/main.scss'
        }
      }
    },
    copy: {
      js: {
      files:[
        {expand:true,cwd:'<%= pkg.src_folder %>/_js/vendor/',src:['**'],dest:'<%= pkg.build_folder %>/js/vendor/'}
      ]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dev:{
        files: [
          {
            dest:'<%= pkg.build_folder %>/js/main.js',
            src:[
              '<%= pkg.src_folder %>/bower_components/jquery/dist/jquery.js',
              '<%= pkg.src_folder %>/bower_components/jquery.easing/js/jquery.easing.js',
              '<%= pkg.src_folder %>/bower_components/salvattore/dist/salvattore.js',
              '<%= pkg.src_folder %>/bower_components/mustache/mustache.js',
              '<%= pkg.src_folder %>/bower_components/modernizr/modernizr_mod.js',
              '<%= pkg.src_folder %>/bower_components/wow/dist/wow.js',
              '<%= pkg.src_folder %>/_js/plugins.js',
              '<%= pkg.src_folder %>/_js/base.js'
            ]
          }
        ]
      }
    },
    uglify: {
      main: {
        files: {
          '<%= pkg.src_folder %>/js/main.js':'<%= pkg.src_folder %>/js/main.js'
        }
      }
    },
    cssmin: {
      main: {
        files: {
          '<%= pkg.src_folder %>/css/main.css': '<%= pkg.src_folder %>/css/main.css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // User tasks
  grunt.registerTask('dev',['sass:dev','concat', 'copy:js']);
  grunt.registerTask('min',['cssmin','uglify']);
  // Default task(s).
  grunt.registerTask('default', ['watch']);
};