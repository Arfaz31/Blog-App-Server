export const Query = {
  me: async (parent: any, args: any, { prisma, userInfo }: any, info: any) => {
    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },

  profile: async (parent: any, args: any, { prisma }: any, info: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(args.userId),
      },
    });
  },

  users: async (parent: any, args: any, { prisma }: any, info: any) => {
    return await prisma.user.findMany();
  },

  posts: async (parent: any, args: any, { prisma }: any, info: any) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
