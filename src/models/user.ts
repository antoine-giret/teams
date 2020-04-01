import Team from './team'

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

export default User
