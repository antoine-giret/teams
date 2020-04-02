import { IFirebaseTeam } from './firebase'

class Team {
  constructor(
    public readonly uuid: string,
    public readonly name: string,
    public readonly logo: string | null,
    public readonly joinCode: string | null,
    public readonly isDefault: boolean,
  ) {}
}

export function toTeam(uuid: string, { name, logo, joinCode }: IFirebaseTeam, isDefault?: boolean) {
  return new Team(uuid, name, logo || null, joinCode || null, isDefault)
}

export default Team
