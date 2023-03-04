/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License
 * https://github.com/open-dapps
 */

import { ModalWindowKey } from "@opendapps/modal-window"
import DefaultModalConfiguration from "./default-modal-configuration"
import EvmWalletConnector from "./evm-wallet-connector"

const EvmModalKey = new ModalWindowKey("od-evm-modal")

export {
  DefaultModalConfiguration,
  EvmModalKey,
  EvmWalletConnector
}
