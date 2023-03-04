/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

import { CommonWalletProvider } from "types"
import { walletconnectDoubleConnection } from "utils"

export default async function getWalletconnectProvider (provider: CommonWalletProvider, rpcList: string[]) {
  return await walletconnectDoubleConnection(rpcList)
}
