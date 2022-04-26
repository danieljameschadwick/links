module.exports = {
  presets: [
    "@expo/next-adapter/babel",
    "@babel/preset-env",
  ],
  plugins: [
    ["@babel/plugin-proposal-private-methods", { loose: false }],
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: false }],
  ],
};
