import { User, UserCollection } from "@components/users/domain/user";
import { database } from "@infra/database/database";
import { UserMap } from "@components/users/users.map";
/* eslint-disable @typescript-eslint/no-explicit-any */

interface IUserRepo {
  exists(emailAddress: string): Promise<boolean>;
  getAllUsers(): Promise<UserCollection>;
  getUserById(uuid: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

class UserRepo implements IUserRepo {
  /* eslint-disable class-methods-use-this */
  async exists(emailAddress: string): Promise<boolean> {
    const user = await database.user.findUnique({ where: { emailAddress } });
    return !!user;
  }

  async getAllUsers(): Promise<UserCollection> {
    const fetchedUsers = await database.user.findMany();
    const users: UserCollection = [];

    let userEntity: User;
    fetchedUsers.forEach((user) => {
      userEntity = UserMap.toDomain(user);
      users.push(userEntity);
    });

    return users;
  }

  async getUserById(uuid: string): Promise<User | null> {
    const fetchedUser = await database.user.findUnique({ where: { uuid } });

    if (!fetchedUser) {
      return null;
    }

    return UserMap.toDomain(fetchedUser);
  }

  async save(user: User): Promise<User> {
    const createdUser = await database.user.create({
      data: UserMap.toPersistence(user),
    });

    return UserMap.toDomain(createdUser);
  }
}

const userRepo = new UserRepo();

export { userRepo, IUserRepo };
