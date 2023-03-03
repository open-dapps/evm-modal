/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps
 */

import WalletConnectProvider from "@walletconnect/ethereum-provider"

export default async function walletconnectDoubleConnection (rpcList: string[]) {
  const rawEthereumProvider = new WalletConnectProvider()
  await rawEthereumProvider.enable()

  const provider = new WalletConnectProvider({ rpc: rpcList })
  await provider.connect()

  return provider
}
