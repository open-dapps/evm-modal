/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

import { ModalWindow, ModalWindowBody, ModalWindowHeader } from "@opendapps/modal-window"
import { DefaultModalConfiguration, EvmModalKey, EvmWalletConnector } from "misc"
import { observer } from "mobx-react-lite"
import React, { createContext, useState } from "react"
import { EvmModalConfiguration, EvmModalContextProps } from "types/evm-modal"
import EvmModalConnector from "./EvmModalConnector"

export const EvmModalContext = createContext<EvmModalContextProps>({
  connectingWallet: null,
  connectedWallet: null,
  configuration: DefaultModalConfiguration
})

interface EvmModalProps {
  configuration?: EvmModalConfiguration

  connectors: EvmWalletConnector[]

  connectedWalletKey: string | null
}

function EvmModal (props: EvmModalProps) {
  const [ connecting, setConnecting ] = useState<string | null>(null)

  const configuration = props.configuration ?? DefaultModalConfiguration

  return (
    <ModalWindow modalKey={ EvmModalKey }>
      <EvmModalContext.Provider value={ {
        connectingWallet: connecting,
        connectedWallet: props.connectedWalletKey,
        configuration
      } }>
        { configuration.modalTitle && (
          <ModalWindowHeader>
            { configuration.modalTitle }
          </ModalWindowHeader>
        ) }

        <ModalWindowBody>
          { props.connectors.map(connector => (
            <EvmModalConnector connector={ connector } key={ connector.key } onProcess={ setConnecting } />
          )) }
        </ModalWindowBody>
      </EvmModalContext.Provider>
    </ModalWindow>
  )
}

export default observer(EvmModal)
