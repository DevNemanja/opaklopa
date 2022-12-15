const url = 'https://opaklopa.local/';

const { series, src, dest, watch, parallel } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');

function styles() {
    return src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(cleanCss({ compatibility: 'ie11' }))
        .pipe(sourcemaps.write())
        .pipe(dest('./theme/assets/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return src(['src/js/app.js'])
        .pipe(webpack(require('./webpack.config')))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(dest('./theme/assets/js'))
        .pipe(browserSync.stream());
}

function optImages() {
    return src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
        .pipe(imagemin())
        .pipe(dest('theme/assets/images'));
}

function copyImages() {
    return src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
        .pipe(dest('theme/assets/images'));
}

function cleanImages() {
    return src('theme/assets/images', {
        read: false,
        allowEmpty: true
    }).pipe(clean());
}

function watchForChanges() {
    browserSync.init({
        proxy: url
    });
    watch('src/scss/**/*.scss', styles);
    watch('src/js/**/*.js', scripts);
    watch("**/*.php").on('change', browserSync.reload);
    watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', copyImages);
}

exports.watch = series(cleanImages, parallel(scripts, styles, copyImages), watchForChanges);
exports.default = series(cleanImages, parallel(scripts, styles, optImages));
