// eslint-disable-next-line import/no-cycle
import { IFirebaseTeam, toUser, User } from '.'

export class Team {
  constructor(
    public readonly uuid: string,
    public readonly name: string,
    public readonly logo: string | null,
    public readonly joinCode: string | null,
    public readonly creatorUuid: string,
    public readonly players: User[],
    public readonly invitedPlayers: string[],
    public readonly isDefault: boolean,
  ) {}
}

export async function toTeam(
  uuid: string,
  { name, logo, joinCode, creatorUuid, players: firebasePlayers, invitedPlayers }: IFirebaseTeam,
  isDefault?: boolean,
) {
  const players = await Promise.all(
    (firebasePlayers || []).map(async ({ ref }) => {
      const user = await ref.get()
      const { teams, ...dataRest } = user.data()

      return toUser(ref.id, { ...dataRest }, ref)
    }),
  )

  return new Team(uuid, name, logo || null, joinCode || null, creatorUuid, players, invitedPlayers || [], isDefault)
}
