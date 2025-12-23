////////////////////////////////
// Setup
////////////////////////////////

// Gulp and package
const {src, dest, parallel, series, watch} = require('gulp');

// Plugins
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const tildeImporter = require('node-sass-tilde-importer');
const imagemin = require('gulp-imagemin');
const pixrem = require('pixrem');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const reload = browserSync.reload;
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const npmdist = require("gulp-npm-dist");
const cleancss = require("gulp-clean-css");
const rtlcss = require('gulp-rtlcss')

// Relative paths function
function pathsConfig(appName) {
    return {
        vendorsJs: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/@popperjs/core/dist/umd/popper.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/simplebar/dist/simplebar.min.js',
            'node_modules/jquery.counterup/jquery.counterup.min.js',
            'node_modules/waypoints/lib/jquery.waypoints.min.js',
            'node_modules/node-waves/dist/waves.min.js',
            'node_modules/moment/min/moment.min.js',
        ],
        css: `public/css`,
        scss: `public/scss`,
        fonts: `public/fonts`,
        images: `public/images`,
        js: `public/js`,
        libs: `public/libs`,
    };
}

const paths = pathsConfig();

////////////////////////////////
// Tasks
////////////////////////////////

// Styles autoprefixing and minification
function styles() {
    const processCss = [
        autoprefixer(), // adds vendor prefixes
        pixrem(), // add fallbacks for rem units
    ];

    src([`${paths.scss}/config/saas/app.scss`, `${paths.scss}/config/saas/bootstrap.scss`, `${paths.scss}/icons.scss`])
        .pipe(
            sass({
                importer: tildeImporter,
                includePaths: [paths.scss],
            }).on('error', sass.logError),
        )
        .pipe(plumber()) // Checks for errors
        .pipe(postcss(processCss))
        .pipe(dest(paths.css))
        .pipe(cleancss())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(paths.css));

    // rtl css
    return src([`${paths.scss}/config/saas/app.scss`, `${paths.scss}/config/saas/bootstrap.scss`])
        .pipe(
            sass({
                importer: tildeImporter,
                includePaths: [paths.scss],
            }).on('error', sass.logError),
        )
        .pipe(plumber()) // Checks for errors
        .pipe(postcss(processCss))
        .pipe(rtlcss())
        .pipe(rename({suffix: '-rtl'}))
        .pipe(dest(paths.css))
        .pipe(cleancss())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(paths.css));
}

// Javascript minification
function scripts() {
    return src([`${paths.js}/app.js`, `${paths.js}/config.js`, `${paths.js}/layout.js`])
        .pipe(plumber()) // Checks for errors
        .pipe(uglify()) // Minifies the js
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(paths.js));
}

// Vendor Javascript minification
function vendorScripts() {
    return src(paths.vendorsJs, {sourcemaps: true})
        .pipe(concat('vendor.js'))
        .pipe(dest(paths.js))
        .pipe(plumber()) // Checks for errors
        .pipe(uglify()) // Minifies the js
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(paths.js, {sourcemaps: '.'}));
}

const plugins = function () {
    const out = paths.libs
    return src(npmdist(), {base: "./node_modules"})
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(dest(out));
};

// Image compression
function imgCompression() {
    return src(`${paths.images}/*`)
        .pipe(imagemin()) // Compresses PNG, JPEG, GIF and SVG images
        .pipe(dest(paths.images));
}

// Watch
function watchPaths() {
    watch(`${paths.scss}/**/*.scss`, styles);
    watch([`${paths.js}/**/*.js`, `!${paths.js}/**/*.min.js`], scripts).on(
        'change',
        reload,
    );
}

// Generate all assets
const generateAssets = parallel(styles, scripts, vendorScripts, plugins);

// Set up dev environment
const dev = parallel(watchPaths);

exports.default = series(generateAssets, dev);
exports['generate-assets'] = generateAssets;
exports['dev'] = dev;
