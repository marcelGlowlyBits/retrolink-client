"use client";
import Link from "next/link";
import { Flex, Text, Avatar } from "@radix-ui/themes";

import styles from "./styles.module.css";

export const ProfileAvatar = ({ user }: { user: any }) => {
  return (
    <Link
      className={styles.Linkstyling}
      href={`/profile/${user.userId}`}
      passHref
    >
      <Flex gap='2' direction='row-reverse' align='center'>
        <Text size='2'>{user.username}</Text>
        <Avatar
          radius='full'
          size='2'
          src={user.image_url}
          fallback={user?.username?.charAt(0).toUpperCase() || ""}
        />
      </Flex>
    </Link>
  );
};
