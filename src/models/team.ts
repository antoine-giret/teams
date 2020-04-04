import { IFirebaseTeam } from './firebase'

class Team {
  constructor(
    public readonly uuid: string,
    public readonly name: string,
    public readonly logo: string | null,
    public readonly joinCode: string | null,
    public readonly creatorUuid: string,
    public readonly isDefault: boolean,
  ) {}
}

export function toTeam(uuid: string, { name, logo, joinCode, creatorUuid }: IFirebaseTeam, isDefault?: boolean) {
  return new Team(uuid, name, logo || null, joinCode || null, creatorUuid, isDefault)
}

export default Team
