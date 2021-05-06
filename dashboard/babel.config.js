module.exports = function (api) {
    api.cache(true);

    const presets = [
        "@babel/preset-react",
        "@babel/preset-env",
        "@babel/preset-typescript"
    ];
    const plugins = ["@babel/transform-runtime"]

    return {
        presets,
        plugins
    };
}