/*global module:false*/
module.exports = function (grunt) {
    var newConfig, tgtDependencyArray, dependencyPathArray, srcDependencyArray;
    // Project configuration.

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks("grunt-image-embed");
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-zopfli');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-groundskeeper');
    grunt.loadNpmTasks('grunt-htmlcompressor');

    //Additional libs/setup

    //Read in jsonpath support library
    eval(grunt.file.read('core/libs/jsonpath.js'));

    //Read in app config file and prepare to modify it
    eval(grunt.file.read('application/configs/app-config.js'));

    (function(){
        //Clone config
        newConfig = JSON.parse(JSON.stringify(intv));
        //Grab the dependency paths and arrays from the config object
        dependencyPathArray = jsonPath(newConfig.config,"$..dependencies",{resultType:"PATH"});
        srcDependencyArray   = jsonPath(newConfig.config,"$..dependencies");

        //Loop through the dependency path array and build:
        //    1) A map into the dependency array
        //    2) A filenames for the concatenated resources
        var i = dependencyPathArray.length, p, q, r;
        grunt.log.writeln("Entering while loop");
        while(i--){
            p = dependencyPathArray[i];
            q = p.replace('$','newConfig.config');
            r = p.replace("$['","=['js/").replace(/\'\]\[\'/g,".").replace("']",".js") +"']";
            eval(q + r);
        }
        tgtDependencyArray = jsonPath(newConfig.config,"$..dependencies");
    })();

    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },

        //Remove previous files before performing new build
        clean: {
            publish: "publish/*"
        },

        //TODO:  Loop through dependencies instead of hardcoding  src/destination pair indexes.
        //       Something akin to https://gist.github.com/brianfeister/4294776
        //TODO: Create a task to determine if output goes to publish(production) or public(dev) directories
        //Remove console log statements and concatenate files into corelibs, coredependencies and view specific "packages"
        groundskeeper: {
            corelibs: {  //Primarily third party libs that seldom change
                files: [
                    { src: srcDependencyArray[0], dest: 'publish/' + tgtDependencyArray[0] }
                ],
                options: {  // this options only affect the corelibs sub=task
                    console: true //[true] Don't try to strip out console.log reference, it's required
                }
            },
            application: {
                files: [
                    // Bootstrap
                    { src: 'application/bootstrap.js', dest: 'publish/application/bootstrap.js' },
                    //Core Dependencies moderate rate of change
                    { src: srcDependencyArray[1], dest: 'publish/' + tgtDependencyArray[1] },

                    //View specific dependencies, more frequent file change/ file additions
                    { src: srcDependencyArray[2], dest: 'publish/' + tgtDependencyArray[2]}
                ],
                options: {  // this options only affect the compile sub-task
                    console: false //[false], Do try to strip out console.log reference
                }
            }
        },

        //Minification
        uglify: {
            bootstrap: {
                files: [
                    { src: 'publish/application/bootstrap.js', dest: 'publish/application/bootstrap.js' },
                    { src: 'core/libs/modernizr-custom.js', dest: 'publish/core/libs/modernizr-custom.js' }
                ]
            },
            main: {
                files: [{
                    expand: true,
                    src: 'publish/js/*.js',
                    dest: '',
                    cwd: ''
                }]
            }
        },

        // gzip assets 1-to-1 for production
        compress: {
            javascript: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: '',
                src: ['publish/**/*.js'],
                dest: ''
            },
            css: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: '',
                src: ['publish/**/*.css'],
                dest: '',
                ext: ['.css.gz']
            },
            html: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: '',
                src: ['publish/index.html'],
                dest: '',
                ext: ['.html.gz']
            }
        },

        // html compression (partials/templates only)
        htmlcompressor: {
            partials: {
                files: [{
                    expand: true,
                    src: ['**/*.ptl.html'],
                    dest: 'publish/application',
                    cwd: 'application/'
                }],
                options: {
                    type: 'html',
                    preserveServerScript: true
                }
            },
            prerenders: {
                files: [{
                    expand: true,
                    src: ['index.html'],
                    dest: 'publish/',
                    cwd: ''
                }],
                options: {
                    type: 'html',
                    preserveServerScript: true
                }
            },
        },

        //Compile SCSS into the publish folder as CSS
        sass: {
            publish: {
                options: {
                    style: 'compressed',
                    cache: false
                },
                files: [{
                    expand: true,
                    src: ['core-styles.scss'],
                    dest: 'publish/css/',
                    cwd: 'sass',
                    ext: '.css'
                }]
            }
        },

        //Copy remaining required resources
        copy: {
            publish: {
                files: [{
                    expand: true,
                    src: ['images/**/*'],
                    dest: 'publish/',
                    cwd: ''
                }]
            }
        },

        //Embed images in CSS files to reduce connections/mobile latency
        imageEmbed: {
            publish: {
                src: ["publish/css/core-styles.css"],
                dest: "publish/css/core-styles.css",
                options: {
                    baseDir : './publish',
                    maxImageSize: '32768',
                    deleteAfterEncoding: true
                }
            }
        },

        // Generate application cache
        manifest: {
            generate: {
                options: {
                    basePath: "publish/",
                    network:  ["*"],
                    verbose: true,
                    timestamp: true
                },
                src: [
                    //JavaScript
                    "**/*.js",

                    //Styles
                    "**/*.css",

                    //partials
                    "**/*.ptl.html",

                    //Images

                    //Fonts

                    //Exclusions
                    "!node_modules/**/*"
                ],
                dest: "publish/cache.manifest"
            }
        }
    });

    // Default task.
    grunt.registerTask('default', [
        'clean',
        'writeConfig',
        'groundskeeper',
        'uglify',
        'htmlcompressor',
        'sass',
        'copy',
        'imageEmbed',
        'compress',
        'manifest'
    ]);

    grunt.registerTask('writeConfig',
        'Rewrite the config file with minimized assets',
        function() {
            var configStr = "var intv = " + JSON.stringify(newConfig);
            grunt.file.write('publish/application/configs/app-config.js', configStr);
            grunt.log.writeln("wrote 'publish/application/configs/app-config.js'", configStr);
        });

};
