import { RuleSetRule } from 'webpack';

const hbsRegex: RegExp = /\.hbs$/;

export const hbsLoader: RuleSetRule = {
  test: hbsRegex,
  loader: 'handlebars-loader'
};
