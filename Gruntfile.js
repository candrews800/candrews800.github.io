module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat_css: {
            options: {},
            all:{
                src: ["css/normalize.css", "css/skeleton.css", "css/main.css"],
                dest: "css/style.css"
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'css/style.min.css': ['css/style.css']
                }
            }
        },

        image_resize: {
            options: {
                width: 425,
                height: 260,
                overwrite: true
            },
            your_target: {
                src: ['img/projects/*.{jpg,png}'],
                dest: 'img/projects/thumbnails/'
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', [ 'concat_css', 'cssmin', 'image_resize']);

};