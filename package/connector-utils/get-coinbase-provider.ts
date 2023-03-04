/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

import { CoinbaseWalletProvider, CoinbaseWalletSDK } from "@coinbase/wallet-sdk"
import { CommonWalletProvider } from "types"

export default async function getCoinbaseProvider (provider: CommonWalletProvider, title?: string) {
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: title ?? "Decentralized application",
    darkMode: true,
    reloadOnDisconnect: false
  })

  return coinbaseWallet
    // @ts-ignore
    .makeWeb3Provider(provider._jsonRpcUrlFromOpts
      ?? "https://mainnet-infura.wallet.coinbase.com", 1) as CoinbaseWalletProvider
}
