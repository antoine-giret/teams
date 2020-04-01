import { firestore } from 'firebase'

export interface IFirebaseUser {
  email: string
  displayName: string
  teams?: {
    ref: firestore.DocumentReference
    isDefault?: boolean
  }[]
}

export interface IFirebaseTeam {
  name: string
  logo: string
  joinCode: string
}
