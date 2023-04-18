import serverAuth from "@/libs/serverauth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismaDb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" && req.method !== "PUT") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid user ID and user not found");
    }

    let followingIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      followingIds.push(userId);

      try {
        await prisma.notification.create({
          data: {
            body: "Someone followed you!",
            userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotified: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (req.method === "PUT") {
      followingIds = followingIds.filter((id) => id !== userId);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

export default handler;
