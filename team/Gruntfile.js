module.exports = function(grunt) {

    grunt.initConfig({
        sass: { // Task
            dist: { // Target
                options: { // Target options
                    style: 'expanded'
                },
                files: { // Dictionary of files
                    'css/main.css': 'css/main.scss' // 'destination': 'source'
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'css/main.css': 'css/main.css'
                }
            }
        },
        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['main.css'],
                    dest: 'css/'
                }]
            }
        },
        watch: {
            styles: {
                files: ['css/main.scss','css/main.css'],
                tasks: ['sass','autoprefixer','cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('complete', ['sass','autoprefixer','cssmin','watch']);


}
