module.exports = function(grunt) {
	var DEBUG = !!grunt.option("debug");
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			files: ['views/**/*.*', 'routes/**/*.*', 'public/**/*.*'],
			tasks: ['build'],
			options: {
				spawn: false
			}
		},
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: "public/scss",
					src: [
						"*.scss"
					],
					dest: "public/stylesheets/",
					ext: ".css"
				}]
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('build', ['sass']);
};
