#!/bin/bash -e

# Change to top level directory of project
cd $(dirname $0)/..

# Install karma globally
npm uninstall -g karma
npm uninstall -g generator-angular
npm uninstall karma
npm uninstall -g grunt-karma
npm uninstall -g karma-chrome-launcher
npm uninstall -g karma-coffee-preprocessor
npm uninstall -g karma-firefox-launcher
npm uninstall -g karma-html2js-preprocessor
npm uninstall -g karma-jasmine
npm uninstall -g karma-phantomjs-launcher
npm uninstall -g karma-requirejs
npm uninstall -g karma-script-launcher

# Uninstall any previous version of grunt
npm uninstall -g grunt

# Install command line interface globally
npm install -g grunt-cli

# Install local grunt
rm -fr ./node_modules
npm install grunt@${GRUNT_VERSION} --save-dev

# Install karma globally
npm install -g karma
npm install -g generator-angular

# Uninstall old dependencies
npm uninstall grunt-sass
npm uninstall grunt-contrib-sass
npm uninstall grunt-contrib-uglify
npm uninstall grunt-contrib-compress
npm uninstall grunt-contrib-copy
npm uninstall grunt-clean
npm uninstall grunt-contrib-clean
npm uninstall grunt-string-replace
npm uninstall grunt-remove-logging
npm uninstall grunt-image-embed
npm uninstall grunt-jslint
npm uninstall grunt-angular-templates
npm uninstall grunt-exec
npm uninstall grunt-contrib-manifest
npm uninstall grunt-manifest
npm uninstall grunt-htmlcompressor
npm uninstall grunt-zopfli
npm uninstall grunt-contrib-concat
npm uninstall grunt-contrib-uglify
npm uninstall grunt-groundskeeper
npm uninstall grunt-karma
npm uninstall karma-junit-reporter
npm uninstall karma-html2js-preprocessor
npm uninstall karma-ng-html2js-preprocessor
npm uninstall karma-jasmine
npm uninstall karma-phantomjs-launcher
npm uninstall karma-coverage
npm uninstall grunt-s3

# Install dependencies
npm install grunt-contrib-sass --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-compress --save-dev
npm install grunt-contrib-copy --save-dev
npm install grunt-contrib-clean --save-dev
npm install grunt-string-replace --save-dev
npm install grunt-image-embed --save-dev
npm install grunt-jslint --save-dev
npm install grunt-angular-templates --save-dev
npm install grunt-exec --save-dev
npm install grunt-manifest --save-dev
npm install grunt-htmlcompressor --save-dev
npm install grunt-zopfli --save-dev
npm install grunt-groundskeeper --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-s3 --save-dev
#npm install grunt-karma --save-dev
#npm install karma-junit-reporter --save-dev
#npm install karma-html2js-preprocessor --save-dev
#npm install karma-ng-html2js-preprocessor --save-dev
#npm install karma-jasmine --save-dev


# Install/override local karma (currently we need 0.8.6)
npm uninstall grunt-karma
npm uninstall karma-chrome-launcher
npm uninstall karma-coffee-preprocessor
npm uninstall karma-firefox-launcher
npm uninstall karma-html2js-preprocessor
npm uninstall karma-jasmine
npm uninstall karma-phantomjs-launcher
npm uninstall karma-requirejs
npm uninstall karma-script-launcher

npm install karma --save-dev
npm install grunt-karma --save-dev
npm install karma-coverage --save-dev
npm install karma-phantomjs-launcher --save-dev
cd node_modules/karma-phantomjs-launcher
npm install phantomjs@1.9.1-0 --save-dev
cd ../..