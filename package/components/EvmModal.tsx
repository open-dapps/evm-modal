/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps
 */

import waitingEthereumPromise from "@knownout/evm-wallet-controller/dist/utils/waiting-ethereum-promise"
import { MetaMaskInpageProvider } from "@metamask/providers"
import { ModalWindow, ModalWindowBody, ModalWindowHeader, useModalWindowController } from "@opendapps/modal-window"
import { observer } from "mobx-react-lite"
import React, { createContext, useEffect, useState } from "react"
import "./EvmModal.scss"
import { coinbaseWalletConnector, metaMaskConnector, walletConnectConnector } from "../connectors"
import DefaultModalConfiguration from "../misc/default-modal-configuration"
import ModalKeys from "../misc/modal-keys"
import WalletKeys from "../misc/wallet-keys"
import { IEvmModalConfiguration, IEvmModalContext } from "../types"
import getInstalledWallets from "../utils/get-installed-wallets"
import EvmModalItem from "./EvmModalItem/EvmModalItem"
import { CoinbaseIcon, MetamaskIcon, WalletConnectIcon } from "./Icons"

export const EvmModalContext = createContext<IEvmModalContext>({
  configuration: DefaultModalConfiguration
})

export interface IEvmModalProps {
  configuration?: IEvmModalConfiguration
  title?: string
}

function EvmModal(props: IEvmModalProps) {
  const [wallets, setWallets] = useState<Map<WalletKeys, MetaMaskInpageProvider>>()
  const [ connecting, setConnecting ] = useState<WalletKeys>()

  const modalController = useModalWindowController()

  useEffect(() => {
    waitingEthereumPromise().then(provider => {
      setWallets(getInstalledWallets(provider) as any)
    })
  }, [ modalController.getModalState(ModalKeys.EvmModal) ])

  const isMobileDevice = ("ontouchstart" in document.documentElement) && !(window as any).ethereum

  return (
    <ModalWindow modalKey={ModalKeys.EvmModal}>
      <ModalWindowHeader>
        { props.title ?? "Choose the way to connect:" }
      </ModalWindowHeader>
      <EvmModalContext.Provider value={{ configuration: props.configuration ?? DefaultModalConfiguration }}>
        <ModalWindowBody>
          {
            !isMobileDevice && (
              <EvmModalItem
                installed={ wallets?.has(WalletKeys.MetaMask) }
                walletKey={ WalletKeys.MetaMask }
                onWalletConnect={ () => metaMaskConnector(setConnecting, wallets) }
                connecting={ connecting }
              >
                <MetamaskIcon />
              </EvmModalItem>
            )
          }

          <EvmModalItem
            installed
            walletKey={ WalletKeys.WalletConnect }
            connecting={ connecting }
            onWalletConnect={ () => walletConnectConnector(setConnecting, props.configuration.walletConnectRPCs) }
          >
            <WalletConnectIcon />
          </EvmModalItem>

          {
            !isMobileDevice && (
              <EvmModalItem
                installed={ wallets?.has(WalletKeys.CoinbaseWallet) }
                walletKey={ WalletKeys.CoinbaseWallet }
                onWalletConnect={ () => coinbaseWalletConnector(setConnecting, wallets) }
                connecting={ connecting }
              >
                <CoinbaseIcon />
              </EvmModalItem>
            )
          }
        </ModalWindowBody>
      </EvmModalContext.Provider>
    </ModalWindow>
  )
}

export default observer(EvmModal)
