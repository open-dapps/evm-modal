/*
 * Copyright (c) 2023 Open decentralized applications
 * Licensed under the MIT License (AGPL-3.0)
 * https://github.com/open-dapps
 */

export default function updateInjectedProvider (
  storage: Map<string, any>,
  providers: Map<string, any>,
  key: string,
  windowKey: string | null,
  ...checkOptions: string[]
) {
  const injectedProvider = providers.get(key)
  if (!injectedProvider) {
    if (!windowKey) return

    const provider = (window as any)[windowKey]
    if (checkOptions.map(option => provider[option]).reduce((a, b) => a || b)) storage.set(key, provider)

    return
  }

  if (checkOptions.map(option => injectedProvider[option]).reduce((a, b) => a || b)) storage.set(key, injectedProvider)
}
