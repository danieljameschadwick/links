const path = require("path");
const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");

const withTM = require("next-transpile-modules")([
  "@links/http",
  "@links/state",
  "@links/types",
  "@links/ui",
  "react-native-vector-icons",
  "react-native-svg",
]);

const nextConfig = {
  images: {
    disableStaticImages: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    config.module.rules.push(
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        },
      },
      {
        test: /\.ttf$/,
        // loader: "url-loader", // or directly file-loader
        use: ["url-loader?limit=10000", "img-loader"],
        include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
      },
      {
        test: /\.css$/,
        // loader: "style-loader", // or directly file-loader
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        use: "css-loader",
        // include: path.resolve(__dirname, "src/styles"),
      },
    );
    if (options.isServer) {
      config.plugins.push(
        new options.webpack.ProvidePlugin({
          requestAnimationFrame: path.resolve(__dirname, './src/plugins/requestAnimationFrame.ts'),
        }),
      );
    }

    return config;
  },
};

module.exports = withPlugins(
  [
    withTM,
    [
      withExpo, { projectRoot: __dirname }
    ]
  ],
  nextConfig,
);
