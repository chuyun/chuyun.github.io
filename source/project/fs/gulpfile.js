/**
 * Created by jun on 2017/7/11.
 */

/**
 * @author  i@juncao.cc
 * @description 自动化流程工具
 *              @开发环境：使用 gulp dev  ==> 搭建本地服务器[监测文件变化,自动编译Less,刷新页面,搭建本地服务器]
 *              @生产环境：(1) 使用 gulp less ==> 编译Less文件
 *                        (2) 使用 gulp minify-css ==> 压缩css文件到 dist 目录下
 * @param [...]
 * @return [...]
 */


var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    cleanCSS = require('gulp-clean-css'),
    spriter = require('gulp-css-spriter'),
    spriter_param = require('gulp-css-spriter-param');


//容错处理
function errHandler( e ){
    gutil.log(e.toString());
}


//browserSync 实时刷新
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './'
        }
    })
});

//文件监控
gulp.task('watch', function () {
    gulp.watch('**/*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
    gulp.watch('less/**/*.less', less);
    gulp.watch('css/*.css', browserSync.reload);
});

//less编译
gulp.task('less', function () {
    return gulp.src('./less/main.less')
        .pipe(plumber({
            errorHandler:function (error) {
                this.emit('end')
            }
        }))

        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            browsers: ['>1%'],
            cascade: true, //是否美化属性值 默认：true
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('./css'))
});


// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 less 任务
    gulp.watch('./less/**.less', ['less'])
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 less 任务和 auto 任务
gulp.task('default', ['less', 'auto']);


// 压缩css
gulp.task('minify-css', function () {
    return gulp.src('./css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}, function (details) {
            gutil.log(details.name + ': 压缩前大小 ==> ' + details.stats.originalSize);
            gutil.log(details.name + ': 压缩后大小 ==> ' + details.stats.minifiedSize);
            gutil.log(details.name + ': 压缩效率 ==> ' + details.stats.efficiency)
        }))
        .pipe(gulp.dest('dist'))
        .pipe(notify("压缩完成"))
});

//sprite工具-按需生成
gulp.task('spriter_param',function () {
    var timestamp = +new Date();
    return gulp.src('./css/main.css')//比如main.css这个样式里面什么都不用改，是你想要合并的图就要引用这个样式。
        //spriter_param 按需生成 增加特定参数(?__sprite)才去处理雪碧图
        .pipe(spriter_param({
            // 生成的sprite图片存放地址
            'spriteSheet': './dist/sprite_'+timestamp+'.png',
            // Because we don't know where you will end up saving the CSS file at this point in the pipe,
            // we need a litle help identifying where it will be.
            'pathToSpriteSheetFromCSS': './sprite_'+timestamp+'.png' //这是在css引用的图片路径，很重要
        }))
        .pipe(gulp.dest('./dist')); //最后生成出来
});

//sprite工具
gulp.task('spriter',function () {
    var timestamp = +new Date();
    return gulp.src('./css/main.css')//比如main.css这个样式里面什么都不用改，是你想要合并的图就要引用这个样式。
        .pipe(spriter({
            // 生成的sprite图片存放地址
            'spriteSheet': './dist/sprite_'+timestamp+'.png',
            // Because we don't know where you will end up saving the CSS file at this point in the pipe,
            // we need a litle help identifying where it will be.
            'pathToSpriteSheetFromCSS': './sprite_'+timestamp+'.png' //这是在css引用的图片路径，很重要
        }))
        .pipe(gulp.dest('./dist')); //最后生成出来
});

//开发
gulp.task('dev', function (callback) {
    runSequence(['browserSync', 'watch', 'default'], callback)
});

//生产
gulp.task('product',function (callback) {
    runSequence(['less', 'minify-css'], callback)
})