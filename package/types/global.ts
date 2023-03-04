/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

import { CoinbaseWalletProvider } from "@coinbase/wallet-sdk"
import { CommonWalletProvider, TrustWalletProvider } from "./providers"

export interface WindowObject {
  ethereum: CommonWalletProvider,
  coinbaseWalletExtension?: CoinbaseWalletProvider
  trustwallet?: TrustWalletProvider
}
