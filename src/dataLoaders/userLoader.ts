import { User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "..";

const batchUsers = async (ids: number[]): Promise<User[]> => {
  // ids: [10, 11, 12, 13]
  console.log(ids);
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids, //in: ids: Ensures we only retrieve users matching the IDs in the input.
      },
    },
  }); //Queries the database to fetch all users whose IDs are in the ids array.

  /*
    {
        1: {id: 1, name: fahim}
        2: {id: 2, name: fahim}
        4: {id: 4, name: fahim}
        10: {id: 10, name: fahim}
        3: {id: 3, name: fahim}
    }
    */
  const userData: { [key: string]: User } = {};

  users.forEach((user) => {
    userData[user.id] = user;
  });

  return ids.map((id) => userData[id]); //ids.map: Iterates through the original ids array and retrieves the corresponding user from userData.
};

//@ts-ignore
export const userLoader = new DataLoader<number, User>(batchUsers);
