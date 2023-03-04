# 🧊 EVM modal

This package is designed to simplify the process of connecting ethereum web3 wallets.

## Installation

Package installation is done in the standard way:

```shell
yarn[npm, pnpm] add -D @opendapps/evm-modal@latest
```

## Integration

You can specify your own configuration for the modal if you wish, but the default configurations are already defined, so
if not use `configuration` prop, there will be default config.

```tsx
function MyCoolApplication () {
  return (
    <EvmModal connectors={ [ new MetaMaskConnector() ] } connectedWalletKey={ null } />
  )
}
```

&nbsp;

List of available props of `EvmModal` component:

| Prop               | Type                        | Description                  |
|--------------------|-----------------------------|------------------------------|
| connectors         | EvmWalletConnector[]        | List of available connectors |
| connectedWalletKey | string                      | Connected wallet key         |
| Configuration      | EvmModalConfiguration       | Configuration object         |

## Creating new connector

To create a new connector, it is enough to create a new class inherited from the EvmWalletConnector class and override
its connectToWallet method. Also, you can use one of the available utilities to get a specific provider:

_Note that in these examples, the `evmWallet` variable is the wallet controller from
`@knownout/evm-wallet-controller` package, however you can use any other controller or logic_

```ts
import { EvmWalletConnector } from "@opendapps/evm-modal"
import { getCoinbaseProvider } from "@opendapps/evm-modal/connector-utils"

class CoinbaseConnector extends EvmWalletConnector {
  constructor () {
    super("CoinbaseWallet", false, CoinbaseWalletIcon)
  }

  public override async connectToWallet (): Promise<boolean> {
    // Use utility function to get Coinbase provider
    const coinbaseProvider = await getCoinbaseProvider(this.provider)

    return evmWallet.connectWallet(coinbaseProvider as any, "CoinbaseWallet")
  }
}
```

About a metamask, no additional functions need to be used:

```tsx
import { EvmWalletConnector } from "@opendapps/evm-modal"

class MetaMaskConnector extends EvmWalletConnector {
  constructor () {
    super("MetaMask", false, MetamaskIcon)
  }

  public override async connectToWallet (): Promise<boolean> {
    return evmWallet.connectWallet(this.provider as any, "MetaMask")
  }
}
```

## Configure

Some modal options can be reconfigured:

```ts
const ModalConfiguration: EvmModalConfiguration = {
  walletLinks: {
    MetaMask: {
      chrome: "Link to chrome extensions market",
      firefox: "Link to firefox extensions market (if exists)",
      android: "...",
      ios: "..."
    },
    CoinbaseWallet: {
      chrome: "Link to chrome extensions market"
    }
  },

  // List of rpc links for wallet-connect
  walletConnectRPCs: [
    "https://bsc-dataseed.binance.org/",
    "https://rpc.ankr.com/fantom/"
  ],

  modalTitle: "Chose the way to connect:"
}
```

## Interaction

This component is based on `@opendapps/modal-window` and has the same interface as `modal-window`, so if you want to
open evm modal, just call modal window controller:

```ts
import { ModalKeys } from "@opendapps/evm-modal/misc"
import { useModalWindowController } from "@opendapps/modal-window"

const controller = useModalWindowController()

controller.openModal(ModalKeys.EvmModal)
```

&nbsp;

_You can find usage example in the `sandbox` folder_
