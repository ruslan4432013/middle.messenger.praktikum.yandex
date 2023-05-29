import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { RuleSetRule } from "webpack";

const scssRegex: RegExp = /\.s?[ac]?ss$/;
const scssModuleRegex: RegExp = /\.module\.s?[ac]?ss$/;

export const scssLoader: RuleSetRule = {
  test: scssRegex,
  oneOf: [
    {
      test: scssModuleRegex,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            emit: true,
          },
        },
        {
          loader: "css-loader",
          options: {
            modules: {
              mode: "local",
              localIdentName: "[folder]__[local]--[hash:base64:5]",
            },
          },
        },
        "sass-loader",
      ],
    },
    {
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            emit: true,
          },
        },
        "css-loader",
        "sass-loader",
      ],
    },
  ],
};
