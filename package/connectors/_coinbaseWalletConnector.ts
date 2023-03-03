/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps
 */

import { MetaMaskInpageProvider } from "@metamask/providers"
import { useModalWindowController } from "@opendapps/modal-window"
import React from "react"
import CoinbaseWalletSDK from "@coinbase/wallet-sdk"
import evmWallet from "@knownout/evm-wallet-controller"
import { ModalKeys, WalletKeys } from "../misc"

export default function coinbaseWalletConnector (
  setConnecting: React.Dispatch<React.SetStateAction<WalletKeys | undefined>>,
  wallets?: Map<WalletKeys, MetaMaskInpageProvider>
) {
  const provider = wallets?.get(WalletKeys.CoinbaseWallet)
  const modalController = useModalWindowController()
  if (!provider) return

  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: "Decentralized application",
    darkMode: true,
    reloadOnDisconnect: false
  })

  const ethereum = coinbaseWallet
    // @ts-ignore
    .makeWeb3Provider(provider._jsonRpcUrlFromOpts ?? "https://mainnet-infura.wallet.coinbase.com", 1)

  setConnecting(WalletKeys.CoinbaseWallet)

  evmWallet.connectWallet(ethereum as any, WalletKeys.CoinbaseWallet).then(result => {
    setConnecting(undefined)

    if (result) modalController.closeModal(ModalKeys.EvmModal)
  })
}
