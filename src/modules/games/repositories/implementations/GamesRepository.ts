import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder("game")
      .where(`UPPER(game.title) like UPPER(:param)`, { param: `%${param}%` })
      .getMany();

    return games;

    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`SELECT COUNT(*) FROM games`);
    // raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const games = await this.repository
      .createQueryBuilder("games")
      .innerJoinAndSelect("games.users", "users")
      .where("games.id = :id", { id })
      .getMany();

    const users = games[0].users;

    return users;
    // Complete usando query builder
  }
}
