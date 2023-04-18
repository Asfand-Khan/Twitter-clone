import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismaDb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user ID");
    }

    const notification = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotified: false,
      },
    });

    return res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
