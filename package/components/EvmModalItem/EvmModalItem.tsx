/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps
 */

import evmWallet from "@knownout/evm-wallet-controller"
import { classNames } from "@knownout/lib"
import { observer } from "mobx-react-lite"
import React, { useCallback, useContext } from "react"
import WalletKeys from "../../misc/wallet-keys"
import { EvmModalContext } from "../EvmModal"
import "./EvmModalItem.scss"

interface IWeb3VenomConnectItemProps {
  installed: any;

  children: JSX.Element;

  walletKey: WalletKeys;

  connecting?: string;

  onWalletConnect? (walletKey: WalletKeys): void;
}

function EvmModalItem (props: IWeb3VenomConnectItemProps) {
  const context = useContext(EvmModalContext)

  const onItemClick = useCallback(() => {
    if (!props.installed) {
      if (props.walletKey in context.configuration.walletLinks) {
        const extensionLink = context.configuration.walletLinks[props.walletKey]

        if (extensionLink) window.open(extensionLink)
      }

      return
    }

    if (props.onWalletConnect) props.onWalletConnect(props.walletKey)
    // eslint-disable-next-line
  }, [ props.walletKey, props.installed ])

  const isConnecting = props.connecting === props.walletKey

  const isConnected = evmWallet.data.connectedWalletKey === props.walletKey

  return (
    <div
      className={ classNames("od-evm-modal-item", {
        installed: props.installed,
        disabled: !isConnecting && props.connecting,
        connecting: isConnecting || isConnected
      }) }
      onClick={ onItemClick }
    >
      { props.children }
      <div className="od-evm-modal-item-text">
        <div className="od-evm-modal-item-text-title">{ props.walletKey }</div>
        { (!props.installed || isConnecting || isConnected) && (
          <div className="od-evm-modal-item-text-hint">
            { isConnecting ? "Connecting..." : isConnected ? "Connected" : "Not installed" }
          </div>
        ) }
      </div>

    </div>
  )
}

export default observer(EvmModalItem)
