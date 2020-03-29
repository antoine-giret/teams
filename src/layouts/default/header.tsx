import React from 'react'
import { Trans } from 'react-i18next'
import { Appbar } from 'react-native-paper'

function Header() {
  return (
    <Appbar.Header>
      <Appbar.Content title={<Trans i18nKey="app.title" />} />
    </Appbar.Header>
  )
}

export default Header
