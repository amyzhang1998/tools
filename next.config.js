const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');

const sassConfig = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  }
});

const lessConfig = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: {} // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      });
    }
    return config;
  }
});

module.exports = {
  webpack(config, options) {
    const temp = lessConfig.webpack(config, options);
    return sassConfig.webpack(temp, options);
  }
};
