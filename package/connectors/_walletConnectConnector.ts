/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps
 */

import evmWallet from "@knownout/evm-wallet-controller"
import { useModalWindowController } from "@opendapps/modal-window"
import React from "react"
import { ModalKeys, WalletKeys } from "../misc"
import { walletconnectDoubleConnection } from "../utils"

export default function walletConnectConnector (
  setConnecting: React.Dispatch<React.SetStateAction<WalletKeys | undefined>>,
  rpcList: string[]
) {
  const modalController = useModalWindowController()
  setConnecting(WalletKeys.WalletConnect)

  /*
     * Костыль, баг в WalletConnect, не можем по-человечески исправить с нашей стороны,
     * поэтому меняем статус спустя 3 секунды коннекта.
     */
  setTimeout(() => {
    setConnecting(undefined)
  }, 4000)

  walletconnectDoubleConnection(rpcList).then(provider => {
    evmWallet.connectWallet(provider as any, WalletKeys.WalletConnect).then(result => {
      setConnecting(undefined)

      if (result) modalController.closeModal(ModalKeys.EvmModal)
    })
  }).catch(() => setConnecting(undefined))
}
