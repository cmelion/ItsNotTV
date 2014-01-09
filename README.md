Directory structure notes:

/its-not-tv
  /application
    - this is where its-not-tv specific code is located
    /configs:
        - this is where its-not-tv specific json configuration files are located
    /controllers:
        - this is where its-not-tv specific controllers that are not view/module specific are located
    /layouts:
        - this is where its-not-tv specific partials that are not view/module specific are located
    /models:
        - this is where its-not-tv specific models that are not view/module specific are located
    /services:
        - this is where its-not-tv specific services that are not view/module specific are located
    /views:
        -  this is where individual view resources are organized (controllers, partials, etc.)
    /index.html:
        - acts as a template for SEO pre-render
        - acts as a template for 404 pages in production
        - acts as a template for html pages in the un-built (via grunt) development environment
    /bootstrap.js:
        - this is the application entry point for all DEV and PRODUCTION versions
          this file has environment specific configs and defines/declares resource locations
          the build process alters this file to point to optimized (concat/minify/gzip) resources
  /core:
    -  code that may be shared across applications or views
    -  includes third party libs
  /public:
    - this is where grunt builds an optimized development version of the site
  /publish:
    - this is where grunt builds a production version of the site
      for example there may tests and test data that you don't want to deploy
      or files in production that you don't want to overwrite
  /scripts:
    -  support/configuration/shell scripts
  /temp:
    - place to store temporary files, possibly used during grunt builds
  /tests:
    - unit tests go here