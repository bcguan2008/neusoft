var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: {},
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.css$/,  loader: 'style!css' },
      // IMAGE
      {
        test: /.(gif|jpg|png)$/,
        loader: 'file?name=img-[hash].[ext]'
      },
      // FONT
      // {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=[name].[ext]" },
      // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=[name].[ext]" },
      // {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=[name].[ext]" },
      // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=[name].[ext]" }
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : require.resolve('file-loader')
      }
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),
    
    new webpack.ProvidePlugin({
		  $: "jquery",
		  jQuery: "jquery"
	  }),
    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
