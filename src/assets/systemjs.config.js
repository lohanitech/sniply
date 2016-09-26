/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'v:': 'scripts/vendor/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'v:core.umd.js',
      '@angular/common': 'v:common.umd.js',
      '@angular/compiler': 'v:compiler.umd.js',
      '@angular/platform-browser': 'v:platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'v:platform-browser-dynamic.umd.js',
      '@angular/http': 'v:http.umd.js',
      '@angular/router': 'v:router.umd.js',
      '@angular/forms': 'v:forms.umd.js',
      'pouchdb':'v:pouchdb',
      // other libraries
      'rxjs':                       'v:rxjs',
      'angular2-in-memory-web-api': 'v:angular2-in-memory-web-api',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
