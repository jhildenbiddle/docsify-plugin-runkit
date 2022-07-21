// Dependencies
// =============================================================================
const browserSync = require('browser-sync').create();
const compression = require('compression');

browserSync.init({
    files: [
        './dist/**/*.*',
        './docs/**/*.*'
    ],
    ghostMode: {
        clicks: false,
        forms : false,
        scroll: false
    },
    open: false,
    notify: false,
    cors: true,
    reloadDebounce: 1000,
    reloadOnRestart: true,
    server: {
        baseDir: [
            './docs/'
        ],
        middleware: [
            compression()
        ],
        routes: {
            '/CHANGELOG.md': './CHANGELOG.md'
        }
    },
    serveStatic: [
        './dist/'
    ],
    rewriteRules: [
        // Replace CDN URLs with local paths
        {
            match  : /https?.*\/CHANGELOG.md/g,
            replace: '/CHANGELOG.md'
        },
        {
            // CDN versioned default
            // Ex1: //cdn.com/package-name
            // Ex2: http://cdn.com/package-name@1.0.0
            // Ex3: https://cdn.com/package-name@latest
            match  : /(?:https?:)*\/\/.*docsify-plugin-runkit[@\d.latest]*(?=["'])/g,
            replace: '/docsify-plugin-runkit.min.js'
        },
        {
            // CDN paths to local paths
            // Ex1: //cdn.com/package-name/path/file.js => /path/file.js
            // Ex2: http://cdn.com/package-name@1.0.0/path/file.js => /path/file.js
            // Ex3: https://cdn.com/package-name@latest/path/file.js => /path/file.js
            match  : /(?:https?:)*\/\/.*docsify-plugin-runkit[@\d.latest]*(?=\/)/g,
            replace: ''
        }
    ]
});
