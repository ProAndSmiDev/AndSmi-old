const { dest, parallel, watch, series, src } = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sync = require('browser-sync').create();
const fs = require('fs');
const data = require('gulp-data');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const uglES = require('gulp-uglify-es').default;
const svg = require('gulp-svg-sprite');
const imgMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const pngQuant = require('imagemin-pngquant');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');
const gcmq = require('gulp-group-css-media-queries');
const csso = require('gulp-csso');
const browserify = require('gulp-bro');
const babelify = require('babelify');

const isProd = (process.env.NODE_ENV === 'prod');
const root = {
  dev: './app/',
  prod: './docs/',
};
const dev = {
  js: `${root.dev}assets/js/*.js`,
  libs: `${root.dev}libs/libs.js`,
  pug: `${root.dev}views/**/*.pug`,
  data: `${root.dev}data/data.json`,
  svg: `${root.dev}assets/svg/**/*.svg`,
  scss: `${root.dev}assets/scss/main.scss`,
  fonts: `${root.dev}assets/fonts/**/*.ttf`,
  media: `${root.dev}assets/img/**/*.+(png|jpg|jpeg)`,
};
const prod = {
  css: `${root.prod}css/`,
  media: `${root.prod}img/`,
  js: `${root.prod}js/`,
  fonts: `${root.prod}fonts/`,
};

/* Работа со стилями */
const stylesMin = () => {
  if (!isProd) {
    return src(dev.scss)
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'expanded',
      }).on('error', notify.onError()))
      .pipe(prefix([
        '> 1%',
        'ie 8',
        'ie 7',
        'last 15 versions',
      ]))
      .pipe(rename({
        basename: 'styles',
      }))
      .pipe(gcmq())
      .pipe(sourcemaps.write('.'))
      .pipe(sync.stream())
      .pipe(dest(prod.css));
  } else {
    return src(dev.scss)
      .pipe(sass({
        outputStyle: 'expanded',
      }).on('error', notify.onError()))
      .pipe(prefix([
        '> 1%',
        'ie 8',
        'ie 7',
        'last 15 versions',
      ]))
      .pipe(rename({
        basename: 'styles',
        suffix: '.min',
      }))
      .pipe(gcmq())
      .pipe(csso())
      .pipe(dest(prod.css));
  }
};
/* Работа со стилями */

/* Работа со скриптами */
const jsMin = series(() => {
  return src(dev.js)
    .pipe(concat('app.min.js'))
    .pipe(uglES())
    .pipe(dest(prod.js));
});
/* Работа со скриптами */

/* Работа с библиотеками  */
const getModules = () => {
  return src(dev.libs)
    .pipe(browserify({
      transform: [
        babelify.configure({
          presets: ['@babel/env'],
        }),
      ],
    }))
    .pipe(rename('libs.min.js'))
    .pipe(dest(prod.js));
};
/* Работа с библиотеками  */

/* Работа с шаблонизатором */
const pug2html = () => {
  return src(dev.pug)
    .pipe(data(() => JSON.parse(fs.readFileSync(dev.data, 'utf-8'))))
    .pipe(pug({
      pretty: !isProd,
      locals: dev.data,
    }))
    .pipe(sync.stream())
    .pipe(dest(root.prod));
};
/* Работа с шаблонизатором */

/* Работа с иконками и картинками */
const svg2sprite = () => {
  return src(dev.svg)
    .pipe(svg({
      mode: {
        stack: {
          sprite: '../sprite.svg',
        },
        symbol: false,
        padding: 0,
      },
    }))
    .pipe(sync.stream())
    .pipe(dest(prod.media));
};

const imgOptWebp = () => {
  return src(dev.media)
    .pipe(imgMin({
      interlaced: true,
      progressive: true,
      svgoPlugins: {
        removeViewBox: false,
      },
      use: pngQuant(),
    }))
    .pipe(webp())
    .pipe(sync.stream())
    .pipe(dest(prod.media));
};

const imgOpt = series([imgOptWebp], () => {
  return src(dev.media)
    .pipe(imgMin({
      interlaced: true,
      progressive: true,
      svgoPlugins: {
        removeViewBox: false,
      },
      use: pngQuant(),
    }))
    .pipe(sync.stream())
    .pipe(dest(prod.media));
});
/* Работа с иконками и картинками */

/* Работа со шрифтами */
const fonts = () => {
  src(dev.fonts)
    .pipe(ttf2woff())
    .pipe(sync.stream())
    .pipe(dest(prod.fonts));

  return src(dev.fonts)
    .pipe(ttf2woff2())
    .pipe(sync.stream())
    .pipe(dest(prod.fonts));
};
/* Работа со шрифтами */

/* работа с localhost */
const watchFiles = () => {
  sync.init({
    server: {
      baseDir: root.prod,
    },
    notify: false,
  });

  watch(dev.fonts, fonts);
  watch(dev.media, imgOpt);
  watch(dev.svg, svg2sprite);
  watch(dev.libs, getModules);
  watch([dev.js, dev.libs, dev.jsHelpers], jsMin);
  watch([root.data, `${root.dev}**/*.pug`], pug2html);
  watch([`${root.dev}assets/scss/**/*.scss`, `${root.dev}components/**/*.scss`], stylesMin);
};
/* работа с localhost */

/* Работа с изначальной сборкой проекта */
const buildProd = parallel([
  parallel(fonts, imgOpt),
  series(pug2html, stylesMin),
  series(getModules, jsMin, svg2sprite),
]);
/* Работа с изначальной сборкой проекта */

/* Таски проекта */
exports.build = buildProd;
exports.default = watchFiles;
/* Таски проекта */
