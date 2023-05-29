import { RuleSetRule } from "webpack";

import { IS_DEV } from "../constants";

const svgRegex: RegExp = /\.svg$/;

export const svgLoader: RuleSetRule = {
  test: svgRegex,
  type: 'asset/resource',
  generator: {
    filename: `images/${IS_DEV ? "[name][ext]" : "[name]-[hash][ext]"}`,
  },
};
