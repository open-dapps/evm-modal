/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

import { MetaMaskInpageProvider } from "@metamask/providers"

export interface TrustWalletProvider {
  autoRefreshOnNetworkChange: false
  enable: () => any
  isConnected: () => boolean
  isMetaMask: false
  isTrust: true
  isTrustWallet: true
  request: () => any
  _broadcast: { listeners: any, port: any, _broadcast: any }
  _chainId: "0x1"
  _events: { _events: any }
  _eventsCount: 0
  _isConnected: true
  _maxListeners: undefined
  _networkVersion: ""
  _selectedAddress: null
}

export interface CommonWalletProvider {
  enable: () => any
  send: () => any
  sendAsync: () => Promise<any>
  _events: object
  _eventsCount: number

  [key: string]: any
}

export interface MultiWalletProvider extends MetaMaskInpageProvider {
  enable: () => any
  overrideIsMetaMask: boolean
  providerMap: Map<string, CommonWalletProvider>
}
