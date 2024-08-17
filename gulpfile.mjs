import gulp from 'gulp';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';

const { create } = browserSync;

// File paths
const paths = {
    css: 'public/theme/**/*.css',
    js: 'public/js/**/*.js',
    images: 'public/images/**/*',
    html: 'public/*.html'
};

// Compile SCSS into CSS & auto-inject into browsers
function style() {
    return gulp.src(paths.css)
        // .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))           // Combine them into a single file
        .on('error', function (err) {
            console.error('Gulp Error:', err.message);
        })
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/resources/css'))
        .pipe(browserSync.stream());
}

// Minify JavaScript & auto-inject into browsers
function scripts() {
    return gulp.src(paths.js)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/resources/js'))
        .pipe(browserSync.stream());
}

// Optimize Images
function images() {
    return gulp.src(paths.images, {
        buffer: true,
        removeBOM: false
        })
        .pipe(imagemin())        
        .pipe(gulp.dest('public/resources/images'));
}

// Static Server + watching SCSS/HTML/JS files
function dev() {
    browserSync.init({
        server: "./public",
        notify: false, // Optional: Disable notification bubbles in the browser
        open: true, // Optional: Automatically open the browser
    });

    gulp.watch(paths.css, style);
    gulp.watch(paths.js, scripts);
    gulp.watch(paths.images, images);
    gulp.watch(paths.html).on('change', browserSync.reload);
    gulp.watch('public/**/*').on('change', browserSync.reload); // Watch the public folder
}

// Build task (SCSS, JS, Images)
function build() {
    style();
    scripts();
    images();
}

// Define complex tasks
const watch = gulp.parallel(dev);
const buildTask = gulp.series(build);

// Export tasks using ES module export syntax
export { style, scripts, images, dev, buildTask as build, watch as default };
