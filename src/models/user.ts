import { firestore } from 'firebase'

import Team, { toTeam } from './team'
import { IFirebaseTeam, IFirebaseUser } from './firebase'

class User {
  public readonly defaultTeam: Team | null

  constructor(
    public readonly uuid: string,
    public readonly email: string,
    public readonly displayName: string,
    public readonly teams: Team[],
  ) {
    this.defaultTeam = teams.find(({ isDefault }) => isDefault) || teams[0] || null
  }
}

export async function toUser(uuid: string, { email, displayName, teams: firebaseTeams }: IFirebaseUser) {
  const teams = await Promise.all(
    (firebaseTeams || []).map(async ({ ref, isDefault }) => {
      const team = <firestore.DocumentSnapshot<IFirebaseTeam>>await ref.get()

      return toTeam(ref.id, team.data(), isDefault)
    }),
  )

  return new User(uuid, email, displayName, teams)
}

export default User
