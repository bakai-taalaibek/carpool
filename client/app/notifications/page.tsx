"use client";
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "../basicMantineLayout";
import { IconMailOpened } from "@tabler/icons-react";

export default function Notifications() {
  return (
    <Stack maw={600} mx="auto" gap={0}>
      <Title order={3} mb={12}>
        Уведомления
      </Title>
      {notifications.map((item, index) => (
        <Flex w="full" gap={0} align="stretch">
          <Box
            w={3}
            bg={item.isOpened ? "white" : "blue"}
            // style={{
            //   borderTop: "1px solid var(--mantine-color-blue-6)",
            // }}
          ></Box>
          <Flex
            w="100%"
            key={item.id}
            justify="space-between"
            gap={2}
            fz={12}
            // pl={5}
            p={12}
            // py={12}
            bg={item.isOpened ? "white" : "gray.0"}
            style={{
              cursor: "pointer",
              // borderLeft: "3px solid var(--mantine-color-blue-5)",
              // borderTop: "1px solid var(--mantine-color-gray-2)",
              // borderBottom: `${
              //   notifications.length - 1 === index
              //     ? "1px solid var(--mantine-color-gray-2)"
              //     : "none"
              // }`,
              // borderBottom: "1px solid var(--mantine-color-gray-2)",
            }}
          >
            <Stack gap={0}>
              <Box fw={500}>{item.title}</Box>
              <Box c="gray.7">{item.description}</Box>
            </Stack>
            {item.isOpened || (
              <ActionIcon variant="light" size="lg" aria-label="Gallery">
                <IconMailOpened style={{ width: 20 }} stroke={1.5} />
              </ActionIcon>
            )}
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
}
