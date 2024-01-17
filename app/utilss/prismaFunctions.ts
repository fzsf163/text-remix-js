import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Get_Users_Count = async () => {
  return await prisma.user.count();
};

export const Get_Comment_Count = async () => {
  return await prisma.comments.count();
};
export const Create_User = async (
  emailInput: string,
  userNameInput: string
) => {
  return await prisma.user.create({
    data: {
      email: emailInput as string,
      userName: userNameInput as string,
    },
  });
};

export const Find_User = async (emailInput: string) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      email: emailInput,
    },
    select: {
      userName: true,
      id: true,
    },
  });
  return { foundUser };
};

export const Post_Comment = async (user_ID: string, commentInput: string) => {
  return await prisma.comments.create({
    data: {
      comment: commentInput,
      userId: user_ID,
    },
  });
};
