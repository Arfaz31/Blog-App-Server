import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "crypto";
import jwt from "jsonwebtoken";
import { jwtHelper } from "../utils/jwtHelper";
import { config } from "../config";
const prisma = new PrismaClient();

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any, info: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: userInfo, context: any, info: any) => {
      const isExist = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (isExist) {
        return {
          userError: "Already this email is registered",
          token: null,
        };
      }

      const hashedPassword = await bcrypt.hash(args.password, 12);
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      if (args.bio) {
        await prisma.profile.create({
          data: {
            bio: args.bio,
            userId: newUser.id,
          },
        });
      }

      const token = await jwtHelper(
        { userId: newUser.id },
        config.jwt_sign as string
      );
      return {
        userError: null,
        token,
      };
    },

    signin: async (parent: any, args: any, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        return {
          userError: "User not found",
          token: null,
        };
      }
      const isEqual = await bcrypt.compare(args.password, user.password);
      if (!isEqual) {
        return {
          userError: "Password is incorrect",
          token: null,
        };
      }
      const token = await jwtHelper(
        { userId: user.id },
        config.jwt_sign as string
      );
      return {
        userError: null,
        token,
      };
    },
  },
};
