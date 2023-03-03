/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps
 */

import evmWallet from "@knownout/evm-wallet-controller"
import { MetaMaskInpageProvider } from "@metamask/providers"
import { useModalWindowController } from "@opendapps/modal-window"
import React from "react"
import { ModalKeys, WalletKeys } from "../misc"

export default function metaMaskConnector (
  setConnecting: React.Dispatch<React.SetStateAction<WalletKeys | undefined>>,
  wallets?: Map<WalletKeys, MetaMaskInpageProvider>
) {
  const provider = wallets?.get(WalletKeys.MetaMask)
  const modalController = useModalWindowController()
  if (!provider) return

  setConnecting(WalletKeys.MetaMask)
  evmWallet.connectWallet(provider as any, WalletKeys.MetaMask).then(result => {
    setConnecting(undefined)

    if (result) modalController.closeModal(ModalKeys.EvmModal)
  })
}
