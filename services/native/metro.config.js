const path = require('path');
const { applyConfigForLinkedDependencies } = require("@carimus/metro-symlinked-deps");

const extraNodeModules = {
    'modules': path.resolve(path.join(__dirname, '../../packages'))
};

const watchFolders = [
    path.resolve(path.join(__dirname, '../../packages'))
];

const nodeModulesPaths = [path.resolve(path.join(__dirname, './node_modules'))];

module.exports = applyConfigForLinkedDependencies(
    {
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: false,
                },
            }),
        },
        resolver: {
            extraNodeModules,
            nodeModulesPaths
        },
        watchFolders,
    },
    {
        projectRoot: __dirname,
        blacklistLinkedModules: ['react-native'],
    },
);
