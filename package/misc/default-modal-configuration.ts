/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

import { EvmModalConfiguration } from "types"

const DefaultModalConfiguration: EvmModalConfiguration = {
  walletLinks: {
    MetaMask: {
      chrome: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
    },
    CoinbaseWallet: {
      chrome: "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad"
    }
  },

  walletConnectRPCs: [
    "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    "https://bsc-dataseed.binance.org/",
    "https://rpc.ankr.com/fantom/"
  ],

  modalTitle: "Chose the way to connect:"
}

export default DefaultModalConfiguration
