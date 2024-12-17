const webpack = require("webpack");

module.exports = {
	webpack: {
		configure: webpackConfig => {
			// Add polyfill for process
			webpackConfig.resolve.fallback = {
				process: require.resolve("process/browser.js"),
				crypto: require.resolve("crypto-browserify"),
				stream: require.resolve("stream-browserify"),
				util: require.resolve("util/"),
				vm: require.resolve("vm-browserify"),
			};

			// Provide process as a global variable
			webpackConfig.plugins.push(
				new webpack.ProvidePlugin({
					process: "process/browser.js",
				})
			);

			return webpackConfig;
		},
	},
};
