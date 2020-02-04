/*
 * 生成国际化词条
 * --lang：语言，不传时为en-gb
 */
gulp.task("i18n", function (cb) {
    var lang = argv.lang || 'en-us';
    var language = lang.replace(/-/g, "_");
    /*
    * 按照project widget 读取i18n 文件，合并写入auiframework.js
    */
    var i18nEntirty = {};
    var pathName = "./i18n/" + lang;
    var files = fs.readdirSync(pathName);
    files.forEach((item) => {
        var fullPath = path.join(pathName, item);
        const stat = fs.statSync(fullPath);
        if (stat.isFile) {
            let blob = fs.readFileSync(fullPath);
            //去除特殊符号，就是这些符号让数据无法解析
            if (blob[0] === 0xEF && blob[1] === 0xBB && blob[2] === 0xBF) {
                blob = blob.slice(3);
            }
            var data = blob.toString("utf-8");
            Object.assign(i18nEntirty, JSON.parse(data));
            console.log('file', fullPath);
        }
    });
    console.log(`$$._I18NResources.${language}=${JSON.stringify(i18nEntirty)}`);
    fs.writeFileSync(path.resolve('js', `_i18n.js`), `window._I18NResources = window._I18NResources||{};console.log("sss",window._I18NResources)\n window._I18NResources.${language}=${JSON.stringify(i18nEntirty)}`);
    cb();
});
