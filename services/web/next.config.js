const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
    "react-native-web",
    "@links/ui"
]);

const nextConfig = {
    webpack5: true,
};

module.exports = withPlugins(
    [
        withTM,
        [withExpo, { projectRoot: __dirname }]
    ],
    nextConfig,
);
