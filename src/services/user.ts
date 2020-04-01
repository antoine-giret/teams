import { firestore } from 'firebase'

import { IFirebaseTeam, IFirebaseUser, User } from '../models'

import FirebaseService from './firebase'
import { toTeam } from './team'

async function toUser(uuid: string, { email, displayName, teams: firebaseTeams }: IFirebaseUser) {
  const teams = await Promise.all(
    (firebaseTeams || []).map(async ({ ref, isDefault }) => {
      const team = <firestore.DocumentSnapshot<IFirebaseTeam>>await ref.get()

      return toTeam(ref.id, team.data(), isDefault)
    }),
  )

  return new User(uuid, email, displayName, teams)
}

class UserService {
  private static instance: UserService

  private usersRef: firestore.CollectionReference<IFirebaseUser>

  private currentUser?: User | null

  constructor() {
    const { db } = FirebaseService.getInstance()

    this.usersRef = <firestore.CollectionReference<IFirebaseUser>>db.collection('users')
  }

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }

    return UserService.instance
  }

  async getCurrentUser(): Promise<User | null> {
    const {
      auth: { currentUser },
    } = FirebaseService.getInstance()

    if (!currentUser) {
      this.currentUser = null
    } else {
      try {
        const doc = await this.usersRef.doc(currentUser.uid).get()
        if (!doc.exists) throw new Error('user document missing')

        this.currentUser = await toUser(currentUser.uid, doc.data())
      } catch (err) {
        console.error(`[UserService][getCurrentUser] failed: ${err}`)
        this.currentUser = null
      }
    }

    return this.currentUser
  }
}

export default UserService
