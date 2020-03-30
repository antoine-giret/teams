import { firestore } from 'firebase'

import { IFirebaseUser, User } from '../models'

import FirebaseService from './firebase'

function toUser(uuid: string, { email, displayName }: IFirebaseUser) {
  return new User(uuid, email, displayName)
}

class UserService {
  private static instance: UserService

  currentUser?: User | null

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }

    return UserService.instance
  }

  async getCurrentUser(): Promise<User | null> {
    const {
      auth: { currentUser },
      db,
    } = FirebaseService.getInstance()

    if (!currentUser) {
      this.currentUser = null
    } else {
      const usersRef = <firestore.CollectionReference<IFirebaseUser>>db.collection('users')

      try {
        const doc = await usersRef.doc(currentUser.uid).get()
        if (!doc.exists) throw new Error('user document missing')

        this.currentUser = toUser(currentUser.uid, doc.data())
      } catch (err) {
        console.error(`[UserService][getCurrentUser] failed: ${err}`)
        this.currentUser = null
      }
    }

    return this.currentUser
  }
}

export default UserService
