/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

import { Random } from "@knownout/lib"
import { walletProviders } from "utils"

export default class EvmWalletConnector {
  public readonly walletKey: string

  public readonly walletIcon?: JSX.Element

  public readonly key: string

  public readonly showWithoutProvider: boolean

  public rpcList: string[] = []

  protected constructor (walletKey: string, showWithoutProvider: boolean, walletIcon?: JSX.Element) {
    this.walletKey = walletKey as any
    this.showWithoutProvider = showWithoutProvider
    this.walletIcon = walletIcon
    this.key = Random.string(10)
  }

  protected get provider () {
    return walletProviders.get(this.walletKey)
  }

  public async connectToWallet (): Promise<boolean> {
    return true
  }
}
