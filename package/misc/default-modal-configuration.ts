import { IEvmModalConfiguration } from "../types"
import WalletKeys from "./wallet-keys"

const DefaultModalConfiguration: IEvmModalConfiguration = {
  "walletLinks": {
    [WalletKeys.MetaMask]: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
    [WalletKeys.CoinbaseWallet]: "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad"
  },
  walletConnectRPCs: [
    "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    "https://bsc-dataseed.binance.org/",
    "https://rpc.ankr.com/fantom/"
  ]
}

export default DefaultModalConfiguration
