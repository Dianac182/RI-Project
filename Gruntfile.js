/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

	grunt.initConfig({

		responsive_images: {
			dev: {
				options: {
					engine: 'im',
					sizes: [{
						name: "small_cropped",
						width: '50%',
						height: '50%',
						aspectRatio: false,
					},{	
						name: "small",
						width: '500',
						quality: 30
					},{
						name: "medium_cropped",
						width: '65%',
						height: '65%',
						aspectRatio: false,
					},{
						name: "medium",
						width: 600,
						quality: 30
					},{
						name: "large",
						width: 800,
						suffix: "_1x",
						quality: 40
					},{
						name: "large",
						width: 1600,
						suffix: "_2x",
						quality: 40
					}]
				},

				/*
				You don't need to change this part if you don't change
				the directory structure.
				*/
				files: [{
					expand: true,
					src: ['*.{gif,jpg,png}'],
					cwd: 'images_src/',
					dest: 'images/'
				}]
			}
		},

		/* Clear out the images directory if it exists */
		clean: {
			dev: {
				src: ['images'],
			},
		},

		/* Generate the images directory if it is missing */
		mkdir: {
			dev: {
				options: {
					create: ['images']
				},
			},
		},

		/* Copy the "fixed" images that don't go through processing into the images/directory */
		copy: {
			dev: {
				files: [{
					expand: true,
					src: 'images_src/fixed/*.{gif,jpg,png}',
					dest: 'images/'
				}]
			},
		},
	
		/* Configure the official image minification plug-in */
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/build/'
				}]
			}
		},
	});

	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'imagemin']);
};