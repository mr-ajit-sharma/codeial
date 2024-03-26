// const gulp =require('gulp');
// const sass=require('gulp-sass')
// const cssnano=require('gulp-cssnano')
// const rev=require('gulp-rev')
// const uglify=require('gulp-uglify-es')
// const imagemin=require('gulp-imagemin')
// const del=require('del')
// // import gulp from 'gulp';
// // import sass from 'gulp-sass';
// // import cssnano from 'gulp-cssnano';
// // import rev from 'gulp-rev';
// // import uglify from 'gulp-uglify-es';
// // import imagemin from 'gulp-imagemin';
// // import del from 'del';


// // it is for the css
// gulp.task('css',function(done){
//     console.log("minifying the css...")
//     gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets.css'))
//      gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./public/assets'))
//     done();
// })

// // it is for the js
// gulp.task('js',function(done){
//     console.log("minifying the js....")
//     gulp.src('./assets/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./public/assets'))
//     done()
// })

// // it is for the images
// gulp.task('image',function(done){
//     console.log("minifying the images....")
//     gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')  
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./public/assets'))
//     done();
// })

// // empty the public /assets directory
// gulp.task('clean:assets',function(done){
//     del.sync('./public/assets')
//     done()
// })

// // build task
// gulp.task('build',gulp.series('clean:assets','css','image','js'),function(done){
//     console.log("building assets")
//     done()
// })

// // default task
// gulp.task('default',gulp.series("build"))
const gulp = require("gulp");

//converts sass to css
const sass = require("gulp-dart-sass");
//CSS minification tool that optimizes and compresses CSS code
const cssnano = require("gulp-cssnano");
var plumber = require("gulp-plumber");

//append content hashes to the filenames of assets (CSS, JS, images, etc.) during the build process. This is useful for cache-busting purposes.
const rev = require("gulp-rev");
//used to minify javascript
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const del = require("del");

gulp.task("css", () => {
    console.log("minifying css...");
    //** means any folder and every subfolder inside it and *.scss means every file with .scss
    return (
        gulp
            .src("./assets/sass/**/*.scss")
            .pipe(plumber()) // Add plumber to handle errors ---> good practice to handle errors during the build process to prevent Gulp from crashing and provide meaningful error messages
            .pipe(sass().on("error", sass.logError))
            .pipe(cssnano())
            .pipe(gulp.dest("./assets.css"))
            .pipe(gulp.src("./assets/**/*.css"))
            //gulp-rev also creates a manifest file(by default named rev-manifest.json)
            .pipe(rev())
            .pipe(gulp.dest("./public/assets")) //write rev'd assets to build dir
            .pipe(
                rev.manifest({
                    base: "./public/assets",
                    merge: true,
                })
            )
            .pipe(gulp.dest("./public/assets"))
    );
});

gulp.task("js", (done) => {
    console.log("minifying js...");

    gulp
        .src("./assets/**/*.js")
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("./public/assets")) //write rev'd assets to build dir
        .pipe(
            rev.manifest({
                base: "./public/assets",
                merge: true,
            })
        )
        .pipe(gulp.dest("./public/assets"));
    done();
});

gulp.task("images", (done) => {
    console.log("compressing images...");

    gulp
        .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest("./public/assets")) //write rev'd assets to build dir
        .pipe(
            rev.manifest({
                base: "./public/assets",
                merge: true,
            })
        )
        .pipe(gulp.dest("./public/assets"));
    done();
});

//empty the public/assets directory (clear the previous build and build agin from scratch)
gulp.task("clean:assets", (done) => {
    del.sync("./public/assets");
    del.sync("./rev-manifest.json");
    done();
});

gulp.task(
    "build",
    gulp.series("clean:assets", "css", "js", "images"),
    (done) => {
        console.log("Building assets");
        done();
    }
);