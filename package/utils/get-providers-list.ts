/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps
 */

export default function getProvidersList (baseProvider: any) {
  const providersList: Map<string, any> = new Map()

  function recursiveGetProviders(currentProvider: any) {
    for (const [key, nextProvider] of (currentProvider.providerMap as Map<string, any>).entries()) {
      if ("providerMap" in nextProvider) recursiveGetProviders(nextProvider)
      else providersList.set(key, nextProvider)
    }
  }

  try { recursiveGetProviders(baseProvider) }
  catch {}

  return providersList
}
