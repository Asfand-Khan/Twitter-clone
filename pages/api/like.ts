import serverAuth from "@/libs/serverauth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismaDb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" && req.method !== "PUT") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid post ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid post ID");
    }

    let likedIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      likedIds.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: "Someone liked your tweet",
              userId: post.userId,
            },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotified: true,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (req.method === "PUT") {
      likedIds = likedIds.filter((id) => id !== currentUser.id);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
