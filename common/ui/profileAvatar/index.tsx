"use client";
import Link from "next/link";
import { Flex, Text, Avatar } from "@radix-ui/themes";

import styles from "./styles.module.css";

export const ProfileAvatar = ({
  userId,
  email,
  imageUrl,
}: {
  userId: string;
  email: string;
  imageUrl?: string;
}) => {
  return (
    <Link className={styles.Linkstyling} href={`/profile/${userId}`} passHref>
      <Flex gap='2' direction='row-reverse' align='center'>
        <Text size='2'>{email}</Text>
        <Avatar
          radius='full'
          size='2'
          src={imageUrl}
          fallback={email?.charAt(0).toUpperCase() || ""}
        />
      </Flex>
    </Link>
  );
};
