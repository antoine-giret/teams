import { Platform } from 'react-native'
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from 'react-native-dotenv'
import * as Google from 'expo-google-app-auth'
import { auth as firebaseAuth } from 'firebase'

import { User } from '../models'

import FirebaseService from './firebase'
import UserService from './user'

class AuthService {
  static async signInWithGoogle(): Promise<User | null | undefined> {
    const { auth } = FirebaseService.getInstance()

    try {
      if (Platform.OS === 'web') {
        const provider = new firebaseAuth.GoogleAuthProvider()

        await firebaseAuth().signInWithPopup(provider)
      } else {
        const res = await Google.logInAsync({
          androidClientId: GOOGLE_ANDROID_CLIENT_ID,
          androidStandaloneAppClientId: GOOGLE_ANDROID_CLIENT_ID,
          iosClientId: GOOGLE_IOS_CLIENT_ID,
          iosStandaloneAppClientId: GOOGLE_IOS_CLIENT_ID,
        })

        if (res.type === 'cancel') return undefined

        const { idToken, accessToken } = res

        await auth.setPersistence(firebaseAuth.Auth.Persistence.LOCAL)
        await auth.signInWithCredential(firebaseAuth.GoogleAuthProvider.credential(idToken, accessToken))
      }

      return await UserService.getInstance().getCurrentUser()
    } catch (err) {
      console.error(`[AuthService][signInWithGoogle] failed: ${err}`)

      return null
    }
  }

  static async signOut(): Promise<void> {
    const { auth } = FirebaseService.getInstance()

    try {
      await auth.signOut()
      await UserService.getInstance().getCurrentUser()
    } catch (err) {
      throw new Error(`[AuthService][signOut] failed: ${err}`)
    }
  }
}

export default AuthService
