////////////////////////////////
// Setup
////////////////////////////////

// Gulp and package
const { src, dest, parallel, series, watch } = require('gulp');

// Plugins
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const pixrem = require('pixrem');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const npmdist = require("gulp-npm-dist");

// Relative paths function
function pathsConfig() {

  const vendorsRoot = 'node_modules';

  return {
    vendorsRoot,

    vendorsJs: [
      `${vendorsRoot}/jquery/dist/jquery.min.js`,
      `${vendorsRoot}/@popperjs/core/dist/umd/popper.js`,
      `${vendorsRoot}/bootstrap/dist/js/bootstrap.js`,
      `${vendorsRoot}/simplebar/dist/simplebar.min.js`,
      `${vendorsRoot}/node-waves/dist/waves.min.js`,
      `${vendorsRoot}/waypoints/lib/jquery.waypoints.min.js`,
      `${vendorsRoot}/jquery.counterup/jquery.counterup.min.js`,
    ],

    css: 'wwwroot/css',
    scss: 'wwwroot/scss',
    js: 'wwwroot/js',
    libs: 'wwwroot/libs'
  };
}

const paths = pathsConfig();

////////////////////////////////
// Tasks
////////////////////////////////

const processCss = [
  autoprefixer(), // adds vendor prefixes
  pixrem(), // add fallbacks for rem units
];

const minifyCss = [
  cssnano({ preset: 'default' }), // minify result
];

// Styles autoprefixing and minification
function styles() {
  return src([`${paths.scss}/config/material/app.scss`, `${paths.scss}/config/material/bootstrap.scss`, `${paths.scss}/icons.scss`])
    .pipe(
      sass().on('error', sass.logError),
    )

    .pipe(dest(paths.css))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss(minifyCss)) // Minifies the result
    .pipe(dest(paths.css));
}

// Vendor Javascript minification
function vendorScripts() {
  return src(paths.vendorsJs, { sourcemaps: true })
    .pipe(concat('vendors.js'))
    .pipe(dest(paths.js))
    .pipe(plumber()) // Checks for errors
    .pipe(uglify()) // Minifies the js
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.js));
}

function plugins() {
  return src(npmdist(), { base: paths.vendorsRoot })
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
    }))
    .pipe(dest(paths.libs));
};

// Watch
function watchPaths() {
  watch(`${paths.scss}/**/**.scss`, styles);
}

// Generate all assets
const generateAssets = parallel(styles, vendorScripts, plugins);

// Set up dev environment
const dev = parallel(watchPaths);

exports.default = series(generateAssets, dev);
exports['build'] = generateAssets;