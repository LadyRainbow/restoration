var gulp = require('gulp'),
    sass = require('gulp-sass'), //Подключаем Sass пакет
    htmlhint = require("gulp-htmlhint"),
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления
    cache       = require('gulp-cache'); // Подключаем библиотеку кеширования

gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/build/css')) // Выгружаем результата в папку app/css
});

gulp.task('htmlhint', function () {
    return gulp.src('app/**/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});

gulp.task('watch', ['sass', 'htmlhint'], function(){
    gulp.watch(['app/sass/**/*.scss', 'app/build/**/*.css'], ['sass']);
    gulp.watch('app/**/*.html', ['htmlhint']); // Наблюдение за HTML файлами в корне проекта
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);
