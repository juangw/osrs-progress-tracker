module.exports = function (api) {
    api.cache(true);

    const presets = [
        "@babel/preset-react",
        "@babel/preset-env",
        "@babel/preset-typescript"
    ];

    return {
        presets
    };
}