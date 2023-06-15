import { RuleSetRule } from 'webpack';

const mochaRegex: RegExp = /\.spec.ts$/;

export const mochaLoader: RuleSetRule = {
  test: mochaRegex,
  exclude: /(node_modules)/,
  use: 'mocha-loader',
};
