// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    "@api": path.resolve(__dirname, "src/api"),
    "@config": path.resolve(__dirname, "src/config"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@lib": path.resolve(__dirname, "src/lib"),
    "@mocks": path.resolve(__dirname, "src/mocks"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@styles": path.resolve(__dirname, "src/styles"),
    "@type": path.resolve(__dirname, "src/types"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@constant": path.resolve(__dirname, "src/constant"),
    "@components": path.resolve(__dirname, "src/components"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@hoc": path.resolve(__dirname, "src/hoc"),
    "@store": path.resolve(__dirname, "src/store"),
  })
);
