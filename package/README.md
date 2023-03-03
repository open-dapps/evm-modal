# 🧊 EVM modal

This package is designed to simplify the process of connecting ethereum web3 wallets.

## Installation

Package installation is done in the standard way:
```shell
yarn[npm, pnpm] add -D @opendapps/evm-modal@latest
```

## Integration

You can specify your own configuration for the modal if you wish, but the default configurations are already defined,
so if not use `configuration` prop, there will be default config.

```tsx
function MyCoolApplication () {
  return (
    <EvmModal
      configuration={{
        walletConnectRPCs: [], // array of RPC links for the wallet connect
        walletLinks: {}, // link to extensions market
      }}
    />
  )
}
```
&nbsp;

This component is based on `@opendapps/modal-window` and has the same interface as `modal-window`, so if you
want to open evm modal, just call modal window controller:

```ts
import { ModalKeys } from "@opendapps/evm-modal/misc"
import { useModalWindowController } from "@opendapps/modal-window"

const controller = useModalWindowController()

controller.openModal(ModalKeys.EvmModal)
```
