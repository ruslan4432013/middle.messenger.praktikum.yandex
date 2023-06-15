import { RuleSetRule } from 'webpack';

const tsRegex: RegExp = /\.ts$/;

export const tsLoader: RuleSetRule = {
  test: tsRegex,
  exclude: /(node_modules)/,
  use: [
    {
      loader: 'swc-loader',
    }
  ],
};
