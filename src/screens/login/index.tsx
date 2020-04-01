import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Trans } from 'react-i18next'
import { Button, Divider } from 'react-native-paper'

import AppContext from '../../app/context'
import { AuthService } from '../../services'
import Layout from '../../layouts/default'
import joinTeamImage from '../../../assets/image/join-team.svg'

function LoginScreen() {
  const {
    theme: { colors },
    updateCurrentUser,
  } = useContext(AppContext)

  async function handleGoogleLogin() {
    updateCurrentUser(await AuthService.signInWithGoogle())
  }

  return (
    <Layout>
      <View style={styles.wrapper}>
        <Image resizeMode="contain" source={{ uri: joinTeamImage }} style={styles.image} />
        <Text style={[styles.title, { color: colors.primary }]}>
          <Trans components={[<br key={0} />, <b key={1} />]} i18nKey="login.title" />
        </Text>
        <Divider />
        <View style={styles.actions}>
          <Button color="#DB4437" icon="google" mode="contained" onPress={handleGoogleLogin}>
            <Trans i18nKey="login.actions.sign_in_with_google" />
          </Button>
        </View>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    maxWidth: '100%',
    paddingBottom: 24,
    paddingHorizontal: 24,
    paddingTop: 48,
    width: 800,
  },
  image: {
    height: 200,
  },
  title: {
    fontSize: 40,
    fontWeight: '300',
    marginVertical: 48,
    textTransform: 'uppercase',
  },
  actions: {
    alignSelf: 'center',
    marginTop: 48,
    maxWidth: '100%',
    width: 300,
  },
})

export default LoginScreen
