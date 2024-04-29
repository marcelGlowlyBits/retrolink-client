"use client";

import { Avatar, DataList, Flex, Heading, Spinner } from '@radix-ui/themes';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

import { useSession } from "@/common/hooks/useSession";

export const UserAccountData = () => {
    const { isAuthenticated, isLoading: isAuthLoading } = useSession();
    const user = useQuery(
      api.users.getMyUser,
      isAuthLoading || !isAuthenticated ? "skip" : undefined
    );

    return (
        <Flex direction="column" gap="6">
            <Spinner size="3" loading={isAuthLoading}>
            <Heading size="5">Profielfoto</Heading>
            <Avatar radius="medium" fallback="t" size="8" src={user?.image_url} />
                <Flex direction="column" gap="4">
                    <Heading size="3">Account details</Heading>
                    <DataList.Root>
                        <DataList.Item>
                            <DataList.Label>Gebruikersnaam</DataList.Label>
                            <DataList.Value>{user?.username}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>Email</DataList.Label>
                            <DataList.Value>{user?.email}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>user Id</DataList.Label>
                            <DataList.Value>{user?.userId}</DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Flex>
                </Spinner>
        </Flex>
    )
}