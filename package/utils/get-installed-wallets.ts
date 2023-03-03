/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps
 */

import { MetaMaskInpageProvider } from "@metamask/providers";
import { WalletKeys } from "../misc"
import getProvidersList from "./get-providers-list"
import updateInjectedProvider from "./update-injected-provider"

/**
 * Function for getting a list of ethereum wallets available for connection.
 *
 * @param {any} provider global ethereum provider.
 * @return {Map<string, MetaMaskInpageProvider>} list of available wallet providers.
 */
export default function getInstalledWallets<T = any> (
  provider?: T
): Map<WalletKeys, MetaMaskInpageProvider> {
  const wallets: Map<WalletKeys, MetaMaskInpageProvider> = new Map();

  if (!provider) return wallets;

  const injected = getProvidersList(provider)
  const updateProvider = updateInjectedProvider.bind({}, wallets, injected)

  updateProvider("MetaMask", null, "isMetaMask")
  updateProvider("CoinbaseWallet", "coinbaseWalletExtension", "isCoinbaseWallet", "isCoinbaseBrowser")
  updateProvider("TrustWallet", "trustwallet", "isTrustWallet", "isTrust")

  return wallets;
}
