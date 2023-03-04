import evmWallet from "@knownout/evm-wallet-controller"
import { useModalWindowController } from "@opendapps/modal-window"

import { Buffer } from "buffer"
import { EvmModalKey } from "misc"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { getCoinbaseProvider, getWalletconnectProvider } from "../package/connector-utils"

import EvmModal, { EvmWalletConnector } from "../package/evm-modal"
import CoinbaseWalletIcon from "./icons/CoinbaseWalletIcon"
import MetamaskIcon from "./icons/MetamaskIcon"
import WalletconnectIcon from "./icons/WalletconnectIcon"

import "./index.scss"

(window as any).Buffer = Buffer

class CoinbaseConnector extends EvmWalletConnector {
  constructor () {
    super("CoinbaseWallet", false, CoinbaseWalletIcon)
  }

  public override async connectToWallet (): Promise<boolean> {
    const coinbaseProvider = await getCoinbaseProvider(this.provider)

    return evmWallet.connectWallet(coinbaseProvider as any, "CoinbaseWallet")
  }
}

class MetaMaskConnector extends EvmWalletConnector {
  constructor () {
    super("MetaMask", false, MetamaskIcon)
  }

  public override async connectToWallet (): Promise<boolean> {
    return evmWallet.connectWallet(this.provider as any, "MetaMask")
  }
}

class WalletconnectConnector extends EvmWalletConnector {
  constructor () {
    super("WalletConnect", true, WalletconnectIcon)
  }

  public override async connectToWallet (): Promise<boolean> {
    const walletConnectProvider = await getWalletconnectProvider(this.provider, this.rpcList)

    return evmWallet.connectWallet(walletConnectProvider as any, "WalletConnect")
  }
}

const App = observer(() => {
  const controller = useModalWindowController()

  useEffect(() => {
    controller.connectModalWindow(EvmModalKey)

    return () => {
      controller.disconnectModalWindow(EvmModalKey)
    }
  }, [])

  return <>
    <h1>React evm modal component @opendapps/evm-modal</h1>

    <button onClick={ () => {
      controller.openModal(EvmModalKey)
    } }>
      Open modal window
    </button>

    <EvmModal connectors={ [
      new CoinbaseConnector(),
      new WalletconnectConnector(),
      new MetaMaskConnector()
    ] } connectedWalletKey={ evmWallet.data.connectedWalletKey } />
  </>
})

const root = ReactDOM.createRoot(document.querySelector("#app-root")!)
root.render(<App />)
