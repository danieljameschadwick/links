const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");

const withTM = require("next-transpile-modules")([
  "@links/ui"
]);

const nextConfig = {};

module.exports = withPlugins(
  [withTM, [withExpo, { projectRoot: __dirname }]],
  nextConfig,
);
