import serverAuth from "@/libs/serverauth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismaDb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);

    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      throw new Error("Missing Fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).end();
  }
};

export default handler;
