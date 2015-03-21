(function() {
	'use strict';
	module.exports = function(grunt) {

		grunt.initConfig({

			// Define relevant folders and files, relative to project root
			// Theme
			theme_path: 'wp-content/themes/twentyfourteen',
			theme_css_path: '<%= theme_path %>/css',
			theme_js_path: '<%= theme_path %>/js',
			theme_js : [
				'<%= theme_js_path %>/functions.js'
			],
			theme_js_minified: '<%= theme_js_path %>/scripts.min.js',
			theme_enqueue_file: '<%= theme_path %>/inc/enqueue-scripts.php',
			// Plugin
			plugin_path: 'wp-content/plugins/myplugin',
			plugin_js: [],
			// Optimization
			css_files_to_min: [
				'<%= theme_path %>/style.css',
				'<%= theme_css_path %>/ie.css'
			],
			css_minified: [
				'<%= theme_path %>/style.min.css',
				'<%= theme_css_path %>/ie.min.css'
			],
			// Deployment
			upload_files: [
				'<%= theme_path %>/style.*.min.css',
				'<%= theme_css_path %>/ie.*.min.css',
				'<%= theme_js_path %>/scripts.*.min.js'
			],
			deployment_branch: 'master',

			// JSHint
			jshint: {
				options: {
					jshintrc: '.jshintrc',
					force: true,
					ignores: []
				},
				all: [
					'Gruntfile.js',
					'<%= theme_js %>'
					]
			},

			// Concatenate scripts, to reduce what needs to be loaded for development
			concat: {
				options: {
					separator: ';'
				},
				// Concatenate plugin files into one master plugin file, keep it separate from site scripts for easier debugging
				//plugins: {
				//	src: '<%= theme_js_path %>/plugins/*.js',
				//	dest: '<%= theme_js_path %>/plugins.js'
				//}
			},

			// Javascript concatenation and minification for production server
			uglify: {
				theme: {
					files: {
						'<%= theme_js_minified %>': [
							'<%= theme_js %>'
						]
					}
				}
			},

			// CSS minification
			cssmin: {
				//Specify an individual css file for minification
				//css: {
				//	src: '<%= theme_path %>/style.css',
				//	dest: '<%= theme_path %>/style.min.css'
				//},
				//Combine multiple css files into one minified file
				//combine: {
				//	files: {
				//		'<%= theme_path %>/style.min.css' : ['<%= css_files_to_min %>']
				//	}
				//},
				// Minify multiple files from a source directory into a destination directory
				minify: {
					expand: true,
					cwd: './',
					src: ['<%= css_files_to_min %>'],
					dest: './',
					ext: '.min.css'
				}
			},

			// Cache busting for WordPress enqueued css and javascript
			version: {
				theme: {
					options: {
							algorithm: 'md5',
							length: 8,
							format: false,
							minify: true,
							minifyname: 'min',
							rename: true
					},
					files: {
						'<%= theme_enqueue_file %>': [
							'<%= css_minified %>',
							'<%= theme_js_minified %>'
						]
					}
				}
			},

			// Search code for debugging calls
			search: {
				js: {
					files: {
							src: [
								'<%= theme_path %>/**/*.js',
								'<%= plugin_path =>/**/*.js'
							]
					},
					options: {
							searchString: /(console\.)|(debug)/g,
							logFormat: 'console',
							failOnMatch: true
					}
				},
				php: {
					files: {
							src: [
								'<%= theme_path %>/**/*.php',
								'<%= plugin_path =>/**/*.php'
							]
					},
					options: {
						// Fail if ChromePhp calls or php short tags are found
						searchString: /(ChromePhp::)|(<\?[^p\n])|(<\?$)/g,
						logFormat: 'console',
						failOnMatch: true
					}
				}
			},

			// git push to WP Engine, using arguments for server and branch (see deploy task below)
			shell: {
				gitpush: {
					command: function (server, branch) {
						return 'git push ' + server + ' ' + branch;
					},
					options: {
						stdout: true,
						stderr: true,
						failOnError: true
					}
				}
			},

			// Upload minified assets, using a json file ignored by version control to store password information
			server: grunt.file.readJSON('sftp.json'),
			sftp: {
				test: {
					files: {
						"./": [
							'<%= upload_files %>',
							'<%= theme_enqueue_file %>'
						]
					},
					options: {
						host: '<%= server.host %>',
						username: '<%= server.username %>',
						password: '<%= server.password %>',
						//port: '<%= server.port %>',
						showProgress: true
					}
				}
			},

			// Delete minified cache busting files from local
			clean: ['<%= upload_files %>'],

			// watch files for changes
			watch: {
				options: {
					livereload: true
				},
				php: {
					files: [
						'<%= plugin_path %>/**/*.php',
						'<%= theme_path %>/**/*.php'
					]
				},
				//css: {
				//	files: [ ]
				//}
				js_site: {
					files: [
						'<%= jshint.all %>'
						],
					tasks: ['jshint']
				}
				//js_plugins: {
				//	files: [
				//		'<%= concat.plugins.src %>'
				//		],
				//	tasks: ['concat']
				//}
			}

		});

		// Load all grunt tasks automatically with load-grunt-tasks plugin
		require('load-grunt-tasks')(grunt);

		// register task
		grunt.registerTask('default', [
			'jshint',
			'concat',
			'watch'
		]);

		// Example: `grunt deploy:production:master` will run `git push production master` along with the other specifed tasks
		// use the `--assets-only` option to skip the git push task
		grunt.registerTask('deploy', 'git deployment', function( server, branch ) {
			// Set deployment branch
			var git_branch = branch || '<%= deployment_branch %>';
			// Set grunt tasks for deployment
			var deploy_tasks = [
				'jshint',
				'concat',
				'uglify',
				'search',
				'cssmin',
				'version',
				'sftp',
				'clean'
			];

			// Exclude git push from tasks, if --assets-only option specified
			var assets_only = grunt.option('assets-only');
			if( ! assets_only ) {
				deploy_tasks.push( 'shell:gitpush:' + server + ':' + git_branch );
			}

			grunt.task.run(deploy_tasks);

		});

	};

}());
