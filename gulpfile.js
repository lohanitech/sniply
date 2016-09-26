var gulp = require('gulp'),
    del = require('del'),
    browserify = require('browserify'),
    rename = require('gulp-rename'),
    flatten = require('gulp-flatten'),
    browserSync = require('browser-sync').create(),
    tsify = require('tsify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    runSeq = require('run-sequence');

gulp.task('clean', function(){
    return del('dist/frontend/**/*', {force:true});
});
gulp.task('copy:scripts', function(){
    return gulp.src([
            "node_modules/reflect-metadata/Reflect.js",
            "node_modules/zone.js/dist/zone.js",
            "node_modules/monaco-editor/min/**/*"
          ])
        .pipe(gulp.dest('./dist/frontend/js'));
});
gulp.task('browserify',function(){
  return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/frontend/app/main.ts'],
        cache: {},
        insertGlobals : true,
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist/frontend/js"));
});
gulp.task('build-css', function() {
  return gulp.src('./src/frontend/app/styles/app.core.scss')
    .pipe(plumber())
    .pipe(sass())
      .pipe(sourcemaps.init())
       .pipe(autoprefixer())
       .pipe(rename('styles.css'))
       .pipe(concat('styles.css'))
       .pipe(sourcemaps.write('.'))
       .pipe(gulp.dest('./dist/frontend/css'));
});
gulp.task('copy:html',function(){
  return gulp.src([
    './src/frontend/**/*.html',
  ])
  .pipe(flatten())
  .pipe(gulp.dest('./dist/frontend'));
});
gulp.task('frontend', function(done){
    return runSeq('clean', ['build-css','copy:scripts','copy:html','browserify'], done);
});
gulp.task('clean-electron', function(){
    return del('dist/electron-package/**/*', {force: true});
});
gulp.task('copy:electron-manifest', function(){
   return gulp.src('./src/assets/package.json')
       .pipe(gulp.dest('./dist/electron-package'));
});
gulp.task('copy:electron-scripts', function(){
    return gulp.src('./src/main/**/*')
        .pipe(gulp.dest('./dist/electron-package'));
});
gulp.task('copy:spa-for-electron', function(){
    return gulp.src("./dist/frontend/**/*")
        .pipe(gulp.dest('dist/electron-package'));
});
gulp.task('electron', function(done){
    return runSeq('clean-electron','frontend', ['copy:electron-manifest', 'copy:electron-scripts', 'copy:spa-for-electron'], done);
});
gulp.task('frontend-watch',['frontend'],function(done) {
  browserSync.reload();
  done();
});
gulp.task('js-watch',['browserify'],function(done){
  browserSync.reload();
  done();
})
gulp.task('sass-watch',['build-css'],function(done){
  browserSync.reload();
  done();
})
gulp.task('html-watch',['copy:html'],function(done){
  browserSync.reload();
  done();
})
gulp.task('serve', ['frontend'], function (done) {
    browserSync.init({
        server: {
            baseDir: "./dist/frontend/"
        }
    });
    gulp.watch('./src/**/*.ts',['js-watch'],function(event){
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp.watch('./src/**/*.html',['html-watch'],function(event){
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp.watch('./src/**/*.scss',['sass-watch'],function(event){
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
