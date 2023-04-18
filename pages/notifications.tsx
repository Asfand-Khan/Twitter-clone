import NotificationsFeed from "@/components/NotificationsFeed";
import Header from "@/components/layouts/Header";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

const notifications = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default notifications;
