import { firestore } from 'firebase'

export interface IFirebaseUserTeam {
  ref: firestore.DocumentReference
  isDefault?: boolean
}

export interface IFirebaseUser {
  email: string
  displayName: string
  teams?: IFirebaseUserTeam[]
}

export interface IFirebaseTeam {
  name: string
  logo?: string
  joinCode?: string
}

export interface IFirebaseCreateTeamInput {
  name: string
  logo?: File
}
