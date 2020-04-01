import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Trans, useTranslation } from 'react-i18next'
import { Button, TextInput } from 'react-native-paper'

import noTeamImage from '../../../../assets/image/no-team.svg'

function EmptyState() {
  const [code, setCode] = useState()
  const { t } = useTranslation()

  function handleCreate() {
    //
  }

  function handleJoin() {
    //
  }

  return (
    <View style={styles.wrapper}>
      <Image resizeMode="contain" source={{ uri: noTeamImage }} style={styles.image} />
      <Text style={styles.text}>
        <Trans i18nKey="team.empty_state.text" />
      </Text>
      <View style={styles.actions}>
        <Button mode="contained" onPress={handleCreate}>
          <Trans i18nKey="team.empty_state.actions.create" />
        </Button>
        <Text style={styles.divider}>
          <Trans i18nKey="team.empty_state.join" />
        </Text>
        <View style={styles.joinForm}>
          <TextInput
            dense
            label={t('team.join_form.code')}
            mode="outlined"
            onChangeText={setCode}
            style={styles.joinInput}
            value={code}
          />
          <Button mode="outlined" onPress={handleJoin}>
            <Trans i18nKey="team.empty_state.actions.join" />
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    height: 200,
    marginBottom: 48,
  },
  text: {
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
  },
  actions: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 48,
  },
  divider: {
    color: '#333',
    fontSize: 15,
    marginVertical: 16,
    textTransform: 'lowercase',
  },
  joinForm: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  joinInput: {
    marginBottom: 6,
    marginRight: 8,
  },
})

export default EmptyState
