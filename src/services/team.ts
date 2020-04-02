import { firestore } from 'firebase'

import { IFirebaseCreateTeamInput, IFirebaseTeam, Team, toTeam } from '../models'

import FirebaseService from './firebase'
import StorageService from './storage'
import UserService from './user'

class TeamService {
  private static instance: TeamService

  private teamsRef: firestore.CollectionReference<IFirebaseTeam>

  constructor() {
    const { db } = FirebaseService.getInstance()

    this.teamsRef = <firestore.CollectionReference<IFirebaseTeam>>db.collection('teams')
  }

  static getInstance() {
    if (!TeamService.instance) {
      TeamService.instance = new TeamService()
    }

    return TeamService.instance
  }

  async create({ logo, ...inputRest }: IFirebaseCreateTeamInput): Promise<Team | null> {
    try {
      const ref = await this.teamsRef.add(inputRest)
      const doc = await ref.get()
      const data = doc.data()

      if (logo) {
        const logoUrl = await StorageService.getInstance().uploadFile(
          `teams/${doc.id}.${logo.name.substr(logo.name.lastIndexOf('.') + 1)}`,
          logo,
        )

        await ref.update({ logo: logoUrl })
        data.logo = logoUrl
      }

      await UserService.getInstance().addTeam(ref)

      return toTeam(doc.id, data)
    } catch (err) {
      console.error(`[TeamService][create] failed: ${err}`)
      return null
    }
  }
}

export default TeamService
