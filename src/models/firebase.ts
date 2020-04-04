import { firestore } from 'firebase'

export interface IFirebaseUserTeam {
  ref: firestore.DocumentReference<IFirebaseTeam>
  isDefault?: boolean
}

export interface IFirebaseUser {
  email: string
  displayName: string
  teams?: IFirebaseUserTeam[]
}

export interface IFirebaseTeamPlayer {
  ref: firestore.DocumentReference<IFirebaseUser>
}

export interface IFirebaseTeam {
  name: string
  logo?: string
  joinCode?: string
  creatorUuid: string
  players: IFirebaseTeamPlayer[]
  invitedPlayers: string[]
}

export interface IFirebaseCreateTeamInput {
  name: string
  logo?: File
}
