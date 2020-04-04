import { firestore } from 'firebase'

// eslint-disable-next-line import/no-cycle
import { IFirebaseUser, Team, toTeam } from '.'

export class User {
  public readonly defaultTeam: Team | null

  constructor(
    public readonly uuid: string,
    public readonly email: string,
    public readonly displayName: string,
    public readonly teams: Team[],
    public readonly firebaseRef: firestore.DocumentReference<IFirebaseUser>,
  ) {
    this.defaultTeam = teams.find(({ isDefault }) => isDefault) || teams[0] || null
  }
}

export async function toUser(
  uuid: string,
  { email, displayName, teams: firebaseTeams }: IFirebaseUser,
  firebaseRef: firestore.DocumentReference<IFirebaseUser>,
) {
  const teams = await Promise.all(
    (firebaseTeams || []).map(async ({ ref, isDefault }) => {
      const team = await ref.get()

      return toTeam(ref.id, team.data(), isDefault)
    }),
  )

  return new User(uuid, email, displayName, teams, firebaseRef)
}
