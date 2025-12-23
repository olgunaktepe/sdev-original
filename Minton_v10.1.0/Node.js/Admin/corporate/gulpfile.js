const { series, src, dest, parallel, watch } = require("gulp");

const autoprefixer = require("gulp-autoprefixer");
const babel = require('gulp-babel');
const browsersync = require("browser-sync");
const concat = require("gulp-concat");
const CleanCSS = require("gulp-clean-css");
const del = require("del");
const fileinclude = require("gulp-file-include");
//const imagemin = require("gulp-imagemin");
const npmdist = require("gulp-npm-dist");
const newer = require("gulp-newer");
const rename = require("gulp-rename");
const rtlcss = require("gulp-rtlcss");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");


const paths = {
    baseSrcAssets: "assets/",   // source assets directory
    baseDistAssets: "public/assets/",  // build assets directory
};

const vendor = function () {
    const out = paths.baseDistAssets + "libs/";
    return src(npmdist(), { base: "./node_modules" })
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(dest(out));
};


const javascript = function () {
    const out = paths.baseDistAssets + "js/";

    // vendor.min.js
    src([
        paths.baseDistAssets + "libs/jquery/jquery.min.js",
        paths.baseDistAssets + "libs/bootstrap/js/bootstrap.bundle.min.js",
        paths.baseDistAssets + "libs/jquery-mask-plugin/jquery.mask.min.js",
        paths.baseDistAssets + "libs/simplebar/simplebar.min.js",

        // Form Advance Plugin
        paths.baseDistAssets + "libs/select2/js/select2.min.js",   // select2
        paths.baseDistAssets + "libs/jquery.counterup/jquery.counterup.min.js", //counter up 
        paths.baseDistAssets + "libs/waypoints/lib/jquery.waypoints.min.js", //waypoints
        paths.baseDistAssets + "libs/node-waves/waves.min.js", // waves 
        paths.baseDistAssets + "libs/tippy.js/tippy.all.min.js",
    ])
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(out));

        return src(paths.baseSrcAssets + "js/**/*.js")
        .pipe(uglify())
        // .pipe(rename({ suffix: ".min" }))
        .pipe(dest(out));


};

const data = function () {
    const out = paths.baseDistAssets + "data/";
    return src([paths.baseSrcAssets + "data/**/*"])
        .pipe(dest(out));
};

const fonts = function () {
    const out = paths.baseDistAssets + "fonts/";
    return src([paths.baseSrcAssets + "fonts/**/*"])
        .pipe(newer(out))
        .pipe(dest(out));
};

const images = function () {
    var out = paths.baseDistAssets + "images";
    return src(paths.baseSrcAssets + "images/**/*")
        // .pipe(newer(out))
        // .pipe(imagemin())
        .pipe(dest(out));
};

const scss = function () {
    const out = paths.baseDistAssets + "css/";

    // vendor.min.css
    src([
        // Form Advance Plugin
        paths.baseDistAssets + "libs/select2/css/select2.min.css",
        paths.baseDistAssets + "libs/node-waves/waves.min.css",
        paths.baseDistAssets + "libs/tippy.js/tippy.css"
    ])
        .pipe(concat("vendor.css"))
        .pipe(CleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(out));

    src([paths.baseSrcAssets + "scss/config/corporate/*.scss", "!" + paths.baseSrcAssets + "scss/icons.scss", "!" ])
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError)) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"],
            })
        )
        .pipe(dest(out))
        .pipe(CleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./")) // source maps
        .pipe(dest(out));

    // generate rtl
    return src([paths.baseSrcAssets + "scss/config/corporate/*.scss", "!" ])
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError)) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"],
            })
        )
        .pipe(rtlcss())
        .pipe(rename({ suffix: "-rtl" }))
        .pipe(dest(out))
        .pipe(CleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./")) // source maps
        .pipe(dest(out));
};

const icons = function () {
    const out = paths.baseDistAssets + "css/";
    return src([paths.baseSrcAssets + "scss/icons.scss", paths.baseSrcAssets + "scss/icons/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass.sync()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"],
            })
        )
        .pipe(dest(out))
        .pipe(CleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./")) // source maps
        .pipe(dest(out));
};


function watchFiles() {
    watch(paths.baseSrcAssets + "js/**/*", series(javascript));
    watch(paths.baseSrcAssets + "scss/icons.scss", series(icons));
    watch([paths.baseSrcAssets + "scss/**/*.scss", "!" + paths.baseSrcAssets + "scss/icons.scss", "!" + paths.baseSrcAssets + "scss/icons/*.scss"], series(scss));
}

// Production Tasks
exports.default = series(
    vendor,
    parallel(data, fonts, images, javascript, scss, icons),
    parallel(watchFiles)
);

// Build Tasks
exports.build = series(
    vendor,
    parallel(data, fonts, images,javascript, scss, icons)
);
