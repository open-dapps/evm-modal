const path = require("path");
const defaultConfig = require("./webpack.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const packageConfig = Object.assign(defaultConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "package", "dist"),
        filename: "[name].js",
        library: {
            name: "modal-window",
            type: "umd"
        },
        clean: true
    },

    entry: {
        "emv-modal": path.resolve(__dirname, "package", "evm-modal.ts"),
        "misc/index": path.resolve(__dirname, "package", "misc", "index.ts"),
        "utils/index": path.resolve(__dirname, "package", "utils", "index.ts"),
        "types/index": path.resolve(__dirname, "package", "types", "index.ts"),
        "connector-utils/index": path.resolve(__dirname, "package", "connector-utils", "index.ts"),
        "components/EvmModal/styles/default": path.resolve(__dirname, "package", "components", "EvmModal", "styles/default.scss"),
        "components/EvmModal/styles/venom": path.resolve(__dirname, "package", "components", "EvmModal", "styles/venom.scss")
    },

    externals: {
        "mobx": {
            commonjs: "mobx",
            commonjs2: "mobx",
            amd: "mobx"
        },
        "mobx-react-lite": {
            commonjs: "mobx-react-lite",
            commonjs2: "mobx-react-lite",
            amd: "mobx-react-lite"
        },
        "react": {
            commonjs: "react",
            commonjs2: "react",
            amd: "react"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom"
        },
        "@knownout/lib": {
            commonjs: "@knownout/lib",
            commonjs2: "@knownout/lib",
            amd: "@knownout/lib"
        },
        "@opendapps/modal-window": {
            commonjs: "@opendapps/modal-window",
            commonjs2: "@opendapps/modal-window",
            amd: "@opendapps/modal-window"
        },
        "@coinbase/wallet-sdk": {
            commonjs: "@coinbase/wallet-sdk",
            commonjs2: "@coinbase/wallet-sdk",
            amd: "@coinbase/wallet-sdk"
        },
        "@knownout/evm-wallet-controller": {
            commonjs: "@knownout/evm-wallet-controller",
            commonjs2: "@knownout/evm-wallet-controller",
            amd: "@knownout/evm-wallet-controller"
        },
        "@metamask/providers": {
            commonjs: "@metamask/providers",
            commonjs2: "@metamask/providers",
            amd: "@metamask/providers"
        },
        "@walletconnect/ethereum-provider": {
            commonjs: "@walletconnect/ethereum-provider",
            commonjs2: "@walletconnect/ethereum-provider",
            amd: "@walletconnect/ethereum-provider"
        },
        "web3": {
            commonjs: "web3",
            commonjs2: "web3",
            amd: "web3"
        }
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            process: "process/browser"
        })
    ]
});

packageConfig.module.rules[1].use.options.configFile = "tsconfig.package.json";
module.exports = packageConfig;
