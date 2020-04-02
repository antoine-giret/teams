import { firestore } from 'firebase'

import { IFirebaseTeam, IFirebaseUser, IFirebaseUserTeam, toUser, User } from '../models'

import FirebaseService from './firebase'

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

  getCurrent() {
    return this.currentUser
  }

  async reconnect(): Promise<User | null> {
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

  async addTeam(teamRef: firestore.DocumentReference<IFirebaseTeam>): Promise<boolean> {
    try {
      if (!this.currentUser) throw new Error('no current user')
      const ref = await this.usersRef.doc(this.currentUser.uuid)
      let doc = await ref.get()
      if (!doc.exists) throw new Error('user document missing')

      const prevData = doc.data()

      ref.update({
        teams: (firestore.FieldValue.arrayUnion({
          ref: teamRef,
          isDefault: prevData.teams.length === 0,
        }) as unknown) as IFirebaseUserTeam[],
      })

      doc = await ref.get()

      this.currentUser = await toUser(doc.id, doc.data())

      return true
    } catch (err) {
      console.error(`[UserService][getCurrentUser] failed: ${err}`)
      return false
    }
  }
}

export default UserService
