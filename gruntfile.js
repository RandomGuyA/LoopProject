module.exports = function(grunt) {
	require('jit-grunt')(grunt);
	
	grunt.initConfig({
		less: {
			development: {
				options: {
					paths: ["assets/css"]
				},
				files: {
					"css/style.css": "less/*.less"
				}
			}
		},
		uglify: {
			build: {
				src: 'js/app.js',
				dest: 'js/app.min.js'
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: ['scripts/**/*.js'],
				// the location of the resulting JS file
				dest: 'js/app.js'
			}
		},
		 jsdoc : {
			dist : {
				src: ['scripts/*.js'],
				options: {
					destination: 'documentation'
				}
			}
		},
		phpdocumentor: {
			dist: {
				options: {
					directory : 'php',
					target : 'documentation'
				}
			}
		},
		watch: {	
			scripts: {
				files: 'scripts/**/*.js',
				tasks: ['concat', 'uglify:build'],
				options: {
					atBegin: true
				}
			},
			styles: {
				files: ['less/**/*.less'], // which files to watch
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-phpdocumentor');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	  
	  
	grunt.registerTask('default', ['less', 'concat', 'watch', 'uglify']);
	grunt.registerTask('docs', ['jsdoc', 'phpdocumentor']);

};