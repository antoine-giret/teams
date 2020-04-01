class Team {
  constructor(
    public readonly uuid: string,
    public readonly name: string,
    public readonly logo: string,
    public readonly joinCode: string,
    public readonly isDefault: boolean,
  ) {}
}

export default Team
