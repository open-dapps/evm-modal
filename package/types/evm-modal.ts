/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

export interface EvmModalConfiguration {
  walletLinks: {
    [key: string]: {
      chrome?: string
      firefox?: string
      android?: string
      ios?: string
    }
  }

  walletConnectRPCs: string[]

  modalTitle: string | null
}

export interface EvmModalContextProps {
  connectingWallet: string | null
  connectedWallet: string | null
  configuration: EvmModalConfiguration
}
