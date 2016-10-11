/**
 * Created by SergST on 08.10.2016.
 */

var gulp = require('gulp'),
	babel = require('gulp-babel'), //ES6 -> ES5
	uglify = require('gulp-uglify'),   //minify js
	minifyCSS = require('gulp-clean-css'),  //minify CSS
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),
	clean = require('del'),
	plumber = require('gulp-plumber'),
	rigger = require('gulp-rigger'),
	// sass = require('gulp-sass'),
	browserSync = require('browser-sync');
// sourcemaps = require('gulp-sourcemaps'),
// imagemin = require('gulp-imagemin'),
// spritesmith = require('gulp.spritesmith');

//  объект с данными о путях
var PATH = {
	src: {
		html: 'src/*.html',
		style: 'src/style/css/*.css',
		scripts: 'src/scripts/main.js',
		images: 'src/images/*.*'
	},
	build: {
		html: 'build/',
		style: 'build/style/css/',
		scripts: 'build/scripts/',
		images: 'build/images/'
	},
	watch: {
		html: 'src/**/*.html',
		style: 'src/style/**/*.css',
		scripts: 'src/scripts/**/*.js'
	},
	clean: 'build'
};


gulp.task('browser-sync', function () { // Создаем таск browser-sync
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: 'build' // Директория для сервера
		},
		notify: false // Отключаем уведомления
	});
});

//BUILD

// задача по сборке html
gulp.task('html', function () {
	gulp.src(PATH.src.html) //Выберем файлы по нужному пути
		.pipe(gulp.dest(PATH.build.html)); //Переносим их в папку build
		// .pipe(browserSync.reload({stream: true})); // перезагрузим наш сервер для обновлений
});

// задача по сборке картинок
// gulp.task('images', function () {
// 	return gulp.src(PATH.src.images)
// 		.pipe(imagesMin())
// 		.pipe(gulp.dest(CONFIG.build.images));
// });

// задача по сборке стилей
gulp.task('styles', function () {
	return gulp.src(PATH.src.style)
		.pipe(concat('style.css'))
		.pipe(minifyCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(PATH.build.style));
		// .pipe(browserSync.reload({stream: true})); //И перезагрузим сервер
});

// задача по сборке скриптов
gulp.task('scripts', function () {
	 gulp.src(PATH.src.scripts) //Найдем наш main файл
		 .pipe(babel({        // конвертируем в ES5
			 presets: ['es2015']
		 }))

		.pipe(rigger()) //Прогоним через rigger
		// .pipe(sourcemaps.init()) //Инициализируем sourcemap
		.pipe(uglify()) //Сожмем наш js
		// .pipe(sourcemaps.write()) //Пропишем карты
		.pipe(gulp.dest(PATH.build.scripts)) //Перенесем готовый файл в build
		.pipe(browserSync.reload({stream: true})); //И перезагрузим сервер
});

// задача сборки проекта, до запуска build будут выполнены задачи из массива
gulp.task('build', ['html', 'styles', 'scripts'], function () {
	console.log('builded!')
});


// Наблюдение за  файлами
gulp.task('watch', ['browser-sync'], function () {
	gulp.watch([PATH.watch.html, PATH.watch.style, PATH.watch.scripts], ['build']);
});
