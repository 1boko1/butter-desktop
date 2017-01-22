(function (App) {
    'use strict';

    var fs = require('fs');

    function get_themes() {
        var theme_files = fs.readdirSync('./src/app/themes/');
        var themes = theme_files.reduce((a, file) => {
            var r = {};
            r[file] = file.slice(0, -10).split('_').join(' ');
            return Object.assign({}, a, r);
        });

        var tp_themes = {};
        try {
            var tp_theme_files = fs.readdirSync('./src/app/themes/third_party');
            tp_themes = tp_theme_files.reduce((a, file) => {
                var r = {};
                r[file] = file.slice(0, -10).split('_').join(' ') + i18n.__('(Third Party)');
                return Object.assign({}, a, r);
            });
        } catch(e) {
            console.warn('Couldn\'t load third party themes');
        }

        return Object.assign({}, themes, tp_themes);
    }

    App.Themes = get_themes();
})(window.App);
