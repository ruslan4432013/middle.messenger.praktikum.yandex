import { RuleSetRule } from "webpack";

import { IS_DEV } from "../constants";

const imageRegex: RegExp = /\.(png|jpg|jpeg|gif)$/;

export const imageLoader: RuleSetRule = {
  test: imageRegex,
  type: "asset/resource",
  generator: {
    filename: `images/${IS_DEV ? "[name][ext]" : "[name]-[hash][ext]"}`,
  },
};
