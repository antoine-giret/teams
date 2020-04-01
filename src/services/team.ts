import { IFirebaseTeam, Team } from '../models'

export function toTeam(uuid: string, { name, logo, joinCode }: IFirebaseTeam, isDefault?: boolean) {
  return new Team(uuid, name, logo, joinCode, isDefault)
}

class TeamService {
  //
}

export default TeamService
