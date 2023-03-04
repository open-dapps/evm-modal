/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

import { CommonWalletProvider, WindowObject } from "types"

class WalletProviders {
  private providersList: Map<string, CommonWalletProvider> = new Map()

  constructor () {
    this.updateFromWindow()

    this.waitingEthereumPromise().finally(() => this.updateFromWindow())

    this.updateFromWindow = this.updateFromWindow.bind(this)
    this.get = this.get.bind(this)
    this.has = this.has.bind(this)
  }

  public updateFromWindow (): void {
    if ((window as WindowObject).ethereum) this.updateProvidersList((window as WindowObject).ethereum)
  }

  public get<T = CommonWalletProvider> (key: string): T | undefined {
    this.updateFromWindow()

    if (this.providersList.has(key)) return this.providersList.get(key) as T

    return undefined
  }

  public has (key: string): boolean {
    this.updateFromWindow()

    return this.providersList.has(key)
  }

  public async waitingEthereumPromise () {
    await new Promise<void>(resolve => {
      let attempts = 0

      const interval = setInterval(() => {
        attempts++

        if (attempts > 100) {
          clearInterval(interval)
          resolve()

          return
        }

        if ((window as any).ethereum) {
          resolve()
          clearInterval(interval)

          return
        }
      }, 100)
    })

    await new Promise<void>(r => setTimeout(r, 1000))
  }

  private updateProvidersList (baseProvider: CommonWalletProvider): void {
    this.providersList.clear()

    const recursiveGetProviders = (currentProvider: any) => {
      for (const [ key, nextProvider ] of (currentProvider.providerMap as Map<string, any>).entries()) {
        if ("providerMap" in nextProvider) recursiveGetProviders(nextProvider)
        else this.providersList.set(key, nextProvider)
      }
    }

    try { recursiveGetProviders(baseProvider) } catch {}
  }
}

const walletProviders = new WalletProviders()
export default walletProviders
