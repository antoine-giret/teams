import React, { useContext, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Trans, useTranslation } from 'react-i18next'
import { ActivityIndicator, Button, TextInput, TouchableRipple } from 'react-native-paper'
import * as DocumentPicker from 'expo-document-picker'
import { MaterialIcons } from 'react-native-vector-icons'

import AppContext from '../../app/context'
import Screens from '../../app/screens'
import { TeamService, UserService } from '../../services'
import Layout from '../../layouts/default'
import createTeamImage from '../../../assets/image/create-team.svg'

enum TeamFormErrors {
  Name,
  NotCreated,
}

function TeamFormScreen() {
  const [name, setName] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})
  const [logoUri, setLogoUri] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { updateCurrentUser, updateCurrentTeam } = useContext(AppContext)
  const { navigate } = useNavigation()
  const { t } = useTranslation()

  async function handleFilePick() {
    const res = await DocumentPicker.getDocumentAsync({ type: 'image/*' })
    if (res.type === 'success') {
      setLogo(res.file)
      setLogoUri(res.uri)
    }
  }

  async function handleSubmit() {
    const newErrors: { [key: string]: boolean } = {}

    if (!name) newErrors[TeamFormErrors.Name] = true

    setErrors(newErrors)

    if (Object.values(newErrors).find(hasError => hasError)) return

    setSubmitting(true)

    const team = await TeamService.getInstance().create({ name, logo })
    if (team) {
      updateCurrentUser(UserService.getInstance().getCurrent())
      updateCurrentTeam(team)
      navigate(Screens.TEAM)
    } else {
      setErrors({ [TeamFormErrors.NotCreated]: true })
    }

    setSubmitting(false)
  }

  return (
    <Layout>
      <View style={styles.wrapper}>
        {submitting ? (
          <>
            <Image resizeMode="contain" source={{ uri: createTeamImage }} style={styles.loadingImage} />
            <Text style={styles.loadingText}>
              <Trans i18nKey="team.form.loading" />
            </Text>
            <ActivityIndicator />
          </>
        ) : (
          <>
            <TouchableRipple onPress={handleFilePick} style={styles.logoWrapper}>
              {logoUri ? (
                <Image resizeMode="cover" source={{ uri: logoUri }} style={styles.logo} />
              ) : (
                <MaterialIcons color="#545454" name="people" size={48} />
              )}
            </TouchableRipple>
            <TextInput
              dense
              error={errors[TeamFormErrors.Name]}
              label={t('team.form.name')}
              mode="outlined"
              onChangeText={setName}
              value={name}
            />
            <View style={styles.actions}>
              <Button mode="contained" onPress={handleSubmit}>
                <Trans i18nKey="team.form.actions.create" />
              </Button>
            </View>
          </>
        )}
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    maxWidth: '100%',
    padding: 24,
    width: 400,
  },
  logoWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
    height: 96,
    width: 96,
  },
  logo: {
    borderRadius: 4,
    height: '100%',
    width: '100%',
  },
  actions: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 48,
  },
  loadingImage: {
    height: 200,
    marginBottom: 48,
  },
  loadingText: {
    fontSize: 30,
    fontWeight: '300',
    marginBottom: 24,
    textAlign: 'center',
  },
})

export default TeamFormScreen
