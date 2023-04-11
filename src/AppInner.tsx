import React, { useEffect, useState } from 'react'
import { Router } from './Router'
import {
  AccountsProvider,
  DarkModeProvider,
  SettingsProvider,
  TokenRegistryProvider,
  WalletProvider,
  RewardToggleProvider,
  CryptoProvider
} from './context'
import ThemeProvider from './theme'
import './App.less'
import { USER_CONFIG_CACHE } from './types/app_params'

export default function AppInner(): JSX.Element {
  const existingUserCache: USER_CONFIG_CACHE | null = JSON.parse(window.localStorage.getItem('gfx-user-cache'))
  const [init, setInit] = useState<boolean | null>(null)

  useEffect(() => {
    if (existingUserCache === null) {
      setInit(true)
      window.localStorage.setItem(
        'gfx-user-cache',
        JSON.stringify({
          hasDexOnboarded: false,
          hasAggOnboarded: false,
          hasSignedTC: false,
          endpointName: null,
          endpoint: null
        })
      )
    }
  }, [])

  useEffect(() => console.log('** GFX Application Init **'), [init])

  return (
    existingUserCache !== null && (
      <DarkModeProvider>
        <ThemeProvider>
          <SettingsProvider>
            <WalletProvider>
              <TokenRegistryProvider>
                <AccountsProvider>
                  <RewardToggleProvider>
                    <CryptoProvider>
                      <Router />
                    </CryptoProvider>
                  </RewardToggleProvider>
                </AccountsProvider>
              </TokenRegistryProvider>
            </WalletProvider>
          </SettingsProvider>
        </ThemeProvider>
      </DarkModeProvider>
    )
  )
}
