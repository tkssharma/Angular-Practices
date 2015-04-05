module.exports = function (grunt)
{
	var continuousIntegrationMode = grunt.option('ci') || false;
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),



		    uglify: {
		      dist: {

		        files: {
		          'src/**/*.js': [ 'build/<%= pkg.name %>-Components.js' ] 
		              }
		            
		        }
		        
		      
		    },
		concat: {
			options: {
				separator: "\n\n"
			},
			dist: {
				src: ['app.js' , 'src/**/*.js' ],
				dest: 'build/<%= pkg.name %>-angularcomponents.js'
			},
			deps: {
				src: [
					'lib/angular/angular.js',
					'lib/angular/angular-touch.js',
					'lib/angular/angular-route.js',
					'lib/angular/schema-form.js',
					'lib/angular/bootstrap-decorator.min.js',
					'lib/angular/angular-resource.js',
					'lib/angular/angular-cookies.js',
					'lib/bootstrap/bootstrap.min.js',
				],
				dest: 'build/<%= pkg.name %>-angular_bootstrap.js'
					},
				css:
				{
				src: ['css/bootstrap.min.css','css/styles.css'],
				dest: 'build/<%= pkg.name %>-bootstrap.css'
				},
				js:
				{
				src: ['lib/angular/angular.js','lib/angular/angular-route.js','lib/angular/angular-resource.js','lib/angular/angular-sanitize.js' ,'lib/angular/schema-form.js','lib/angular/bootstrap-decorator.min.js'],
				dest: 'build/<%= pkg.name %>-angular.js'
				}
			
				},

			karma: {
            options: {
		        configFile: 'karma.conf.js'
		      },
		      unit: {
		        singleRun: true
		      },
		      
		      continuous: {
		        singleRun: false,
		        autoWatch: true
		      }
        },
         
		watch: 
		{
      		dev:
      		 {
        	files: ['src/**/*.js', 'app.js' ,'css/*.css' , 'lib/**/*.js'],
        	tasks: [ 'concat:dist' , 'concat:css' ,'concat:js'],
        	options: 
        		{
          		atBegin: true
        		}
            },
      		min: 
       		{
        	files: ['src/**/*.js', 'app.js' ,'css/*.css', 'lib/**/*.js'],
        	tasks: [ 'concat:dist' , 'concat:css' ,'concat:js'],
        	options: 
        		{
          		atBegin: true
        		}
       		},
    	},

	});

	//npm tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ngdocs');
	grunt.loadNpmTasks('grunt-karma');

	//tasks
	 grunt.registerTask('default',  ['watch:dev' , 'karma']);
	 grunt.registerTask('test', [ 'karma:continuous' ]);
	 grunt.registerTask('dev', [ 'watch:dev' ]);
  	 grunt.registerTask('minified', [ 'watch:min' ]);
	// grunt.registerTask('uglify',  ['uglify:dist' ,'uglify:css', 'uglify:js']);

	
}