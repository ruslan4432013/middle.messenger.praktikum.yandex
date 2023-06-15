import path from 'path';

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
  Configuration,
  HotModuleReplacementPlugin,
  WebpackPluginInstance,
} from 'webpack';
import 'webpack-dev-server';

import { ALIAS, DEV_SERVER_PORT, DIST_DIR, IS_DEV, SRC_DIR } from './constants';
import * as Loaders from './loaders';

const entry: string[] = [
  path.resolve(SRC_DIR, 'index.ts'),
  ...(IS_DEV
    ? [
      'css-hot-loader/hotModuleReplacement',
    ]
    : []),
];

const filename = (ext: string): string =>
  IS_DEV ? `[name].${ext}` : `[name].[chunkhash].${ext}`;

export const plugins: WebpackPluginInstance[] = [

  new HtmlWebpackPlugin({
    title: 'Ya Chat',
    template: './src/index.html',
  }),

  new ForkTsCheckerWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: IS_DEV ? '[name].css' : '[name].[contenthash].css',
  }),
  ...(IS_DEV
    ? [new HotModuleReplacementPlugin()]
    : [new CssMinimizerPlugin()])
];

export const config: Configuration = {
  name: 'client',
  target: 'web',
  entry,
  plugins,
  output: {
    path: DIST_DIR,
    filename: filename('js'),
    publicPath: '/',
  },
  devtool: IS_DEV ? 'source-map' : false,
  resolve: {
    alias: ALIAS,
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
    fallback: {
      url: false,
      path: false,
    },
  },
  module: {
    rules: Object.values(Loaders),
  },
  devServer: {
    historyApiFallback: true,
    port: DEV_SERVER_PORT,
    open: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
};
