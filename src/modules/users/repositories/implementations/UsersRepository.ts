import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne(
      { id: user_id },
      { relations: ["games"] }
    );
    return user || new User();
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = await this.repository.query(
      `SELECT * FROM users ORDER BY first_name ASC;`
    );

    return users; // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = await this.repository.query(
      `SELECT * FROM users WHERE UPPER(first_name) LIKE UPPER('%${first_name}%');`
    ); // Complete usando raw query
    return users;
  }
}
