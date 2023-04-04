// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//   entry: ['./src/index.js'],
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'main.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         use: { loader: 'babel-loader' },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           // Creates `style` nodes from JS strings
//           'style-loader',
//           // Translates CSS into CommonJS
//           'css-loader',
//           // Compiles Sass to CSS
//           'sass-loader',
//         ],
//       },
//       /* {
//         test: /\.scss$/,
//         use: ExtractTextPlugin.extract({
//           fallback: "style-loader",
//           use: ["css-loader", "sass-loader"],
//         }),
//       }, */
//       {
//         test: /\.(png|jp(e*)g|svg|gif)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: 'images/[hash]-[name].[ext]',
//             },
//           },
//         ],
//       },
//     ],
//   },
//   devServer: {
//     contentBase: path.resolve(__dirname, 'build'),
//     watchContentBase: false, // false = files in contentBase won't trigger reload
//     clientLogLevel: 'silent',
//     compress: true,
//     hot: true,
//     host: '0.0.0.0',
//     port: 3060,
//     public: `localhost:3060`, // set port in env-file: '.env'
//     proxy: {
//       '/api': {
//         target: `http://localhost:3009`,
//         changeOrigin: true,
//         secure: false,
//         pathRewrite: { '^/api': '' },
//         headers: {
//           apikey: 'dd',
//           origin: null,
//         },
//       },
//     },
//   },
//   devtool: 'source-map',
//   plugins: [
//     new webpack.WatchIgnorePlugin({
//       paths: [path.join(__dirname, 'node_modules')],
//     }),
//   ],
// };
