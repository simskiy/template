const filterShowCode = require('./filterShowCode.js');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const atImport = require("postcss-import");
const inlineSVG = require('postcss-inline-svg');
const objectFitImages = require('postcss-object-fit-images');
const argv = require('yargs').argv;

// let mode = argv.mode

//Настройка pug-компилятора
let pugOption = {
  filters: { 'show-code': filterShowCode, },
};

// Сообщение для компилируемых файлов
let doNotEditMsg = '\n ВНИМАНИЕ! Этот файл генерируется автоматически.\n Любые изменения этого файла будут потеряны при следующей компиляции.\n Любое изменение проекта без возможности компиляции ДОЛЬШЕ И ДОРОЖЕ в 2-5 раз.\n\n';

// Настройки бьютификатора
let prettyOption = {
  indent_size: 2,
  indent_char: ' ',
  unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br', 'script'],
  content_unformatted: [],
};

// Список и настройки плагинов postCSS
let postCssPlugins = [
  autoprefixer({grid: true}),
  mqpacker({
    sort: false
  }),
  atImport(),
  inlineSVG(),
  objectFitImages(),
];

// список импортов стилей
// let scssImportsList = [];

let config = {
  'notGetBlocks': [

  ],
  'ignoredBlocks': [
    'no-js',
  ],
  'alwaysAddBlocks': [
    'sprite-svg',
    // 'sprite-png',
    // 'object-fit-polyfill',
    'picture',
    'svg'
  ],
  'addStyleBefore': [
    'src/scss/variables.scss',
    'src/scss/mixins.scss',
    'src/scss/font.scss',
    'src/scss/normalize.scss',
    'src/scss/global.scss',
    // 'somePackage/dist/somePackage.css', // для 'node_modules/somePackage/dist/somePackage.css',
  ],
  'addStyleAfter': [
    // 'src/scss/print.scss',
  ],
  'addJsBefore': [
    // 'somePackage/dist/somePackage.js', // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  'addJsAfter': [
    './script.js',
  ],
  'addAssets': {
    'src/img/*.{png,svg,jpg,jpeg}': 'img/',
    'src/img/svg/*.svg': 'img/svg/',
    'src/fonts/*{eot,svg,woff,ttf,woff2}': 'fonts/',
    'src/favicon/out/*{png,ico,svg,xml,webmanifest}': 'img/favicons/',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'img/',
  },
  'dir': {
    'src': 'src/',
    'build': 'build/',
    'blocks': 'src/blocks/',
    'img': 'src/img/',
    'scss': 'src/scss/',
  },
  'msg': {
    'doNotEditMsg': doNotEditMsg,
  },

  'pugOption': pugOption,
  'prettyOption': prettyOption,
  'postCssPlugins': postCssPlugins,
  'mode': argv.mode,
};

// блоки из конфига сразу добавим в список блоков
module.exports = config;
