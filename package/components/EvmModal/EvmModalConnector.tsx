/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

import { classNames } from "@knownout/lib"
import { useModalWindowController } from "@opendapps/modal-window"
import { EvmModalKey, EvmWalletConnector } from "misc"
import { observer } from "mobx-react-lite"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { CommonWalletProvider } from "types"
import { walletProviders } from "utils"
import { EvmModalContext } from "./EvmModal"

interface EvmModalConnectorProps {
  connector: EvmWalletConnector,

  onProcess? (walletKey: string | null): void
}

function EvmModalConnector (props: EvmModalConnectorProps) {
  const context = useContext(EvmModalContext)
  const [ provider, setProvider ] = useState<CommonWalletProvider | null>(
    walletProviders.get(props.connector.walletKey) ?? null
  )

  const modalController = useModalWindowController()
  walletProviders.updateFromWindow()

  useEffect(() => {
    walletProviders.waitingEthereumPromise().then(() => {
      walletProviders.updateFromWindow()
      setProvider(walletProviders.get(props.connector.walletKey))
    })
  }, [])

  const isConnected = context.connectedWallet === props.connector.walletKey
  const isConnecting = context.connectingWallet === props.connector.walletKey

  useEffect(() => {
    if (!props.connector.rpcList.length) props.connector.rpcList = context.configuration.walletConnectRPCs
  }, [ props.connector, context.configuration.walletConnectRPCs ])

  const handleConnect = useCallback(() => {
    if (props.connector.connectToWallet) {
      if (props.onProcess) props.onProcess(props.connector.walletKey)

      props.connector.connectToWallet().then(result => {
        if (result) modalController.closeModal(EvmModalKey)
      }).finally(() => {
        if (props.onProcess) props.onProcess(null)
      })
    }
  }, [ props.connector ])

  if (!props.connector.showWithoutProvider && !provider) return null

  return (
    <div onClick={ handleConnect } className={
      classNames("od-evm-modal-item", {
        installed: provider !== null,
        disabled: !isConnecting && context.connectingWallet !== null,
        connecting: isConnecting,
        connected: isConnected
      })
    }>
      { props.connector.walletIcon && (
        <div className="od-evm-modal-item-icon">
          { props.connector.walletIcon }
        </div>
      ) }
      <div className="od-evm-modal-item-container">
        <div className="od-evm-modal-item-container-title">
          { props.connector.walletKey }
        </div>
        { ((provider === null && !props.connector.showWithoutProvider) || isConnected || isConnecting) && (
          <div className="od-evm-modal-item-container-state">
            { isConnecting ? "Connecting..." : isConnected ? "Connected" : "Not installed" }
          </div>
        ) }
      </div>
    </div>
  )
}

export default observer(EvmModalConnector)
