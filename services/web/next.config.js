const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
    '@links/ui',
]);

module.exports = withPlugins([
    withTM({
        experimental: {
            // this will allow nextjs to resolve files (js, ts, css)
            // outside packages/app directory.
            externalDir: true,
        },
    }),
]);
