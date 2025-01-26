export const Query = {
  users: async (parent: any, args: any, { prisma }: any, info: any) => {
    return await prisma.user.findMany();
  },
};
