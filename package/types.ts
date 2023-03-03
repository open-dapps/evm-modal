/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps
 */

import WalletKeys from "./misc/wallet-keys"

interface IEvmModalConfiguration {
  walletLinks: { [key in WalletKeys]?: string }
  walletConnectRPCs: string[]
}

interface IEvmModalContext {
  configuration: IEvmModalConfiguration
}

export {
  IEvmModalConfiguration,
  IEvmModalContext
}
