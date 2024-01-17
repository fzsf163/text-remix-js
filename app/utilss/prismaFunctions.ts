import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
