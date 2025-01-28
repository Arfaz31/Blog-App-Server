import { userLoader } from "../dataLoaders/userLoader";
export const Post = {
  author: async (parent: any, args: any, { prisma }: any) => {
    // return await prisma.user.findUnique({ where: { id: parent.authorId } });
    //console.log("user: ", parent.authorId)
    return userLoader.load(parent.authorId);
  },
};
