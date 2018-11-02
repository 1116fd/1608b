var gulp = require("gulp");
var sass = require("gulp-sass");
//scss->css
var auto = require("gulp-autoprefixer");
var clean = require("gulp-clean-css");
var webserver = require("gulp-webserver");
var url = require("url");
var datajson = require("./src/data/data.json")
console.log(datajson)
gulp.task("color", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(auto({
            browsers: ['last 2 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest("./src/css"));
})

gulp.task("timer", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("color"));
})
gulp.task("devweb", function() {
    return gulp.src("src")
        .pipe(webserver({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == "/api/list") { //接口
                    res.end(JSON.stringify({ code: 1, data: datajson }))
                } else { //文件
                    pathname = pathname == "/" ? "index.html" : pathname;
                    res.end(require("fs").readFileSync(require("path").join(__dirname, "src", pathname)))
                }
            }
        }))
})
gulp.task("dev", gulp.parallel("timer", "color"));