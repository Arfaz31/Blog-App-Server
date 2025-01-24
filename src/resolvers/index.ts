import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface userInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any, info: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: userInfo, context: any, info: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);
      return await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });
    },
  },
};
