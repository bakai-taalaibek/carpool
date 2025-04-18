"use client";
import { ActionIcon, Box, Flex, Stack, Title, Tooltip } from "@mantine/core";
import { notifications } from "../basicMantineLayout";
import { IconMail, IconMailOpened } from "@tabler/icons-react";

export default function Notifications() {
  return (
    <Stack w="90%" maw={600} mx="auto" gap={0}>
      <Title order={3} mb={12}>
        Уведомления
      </Title>
      {notifications.map((item, index) => (
        <Flex key={item.id} w="full" gap={0} align="stretch">
          <Box
            w={3}
            bg={item.isOpened ? "gray.3" : "blue.3"}
          ></Box>
          <Flex
            w="100%"
            key={item.id}
            justify="space-between"
            gap={2}
            fz={12}
            p={12}
            className={
              item.isOpened
                ? "bg-white hover:bg-gray-100"
                : "bg-gray-50 hover:bg-gray-100"
            }
            style={{
              cursor: "pointer",
            }}
          >
            <Stack gap={0}>
              <Box fw={500}>{item.title}</Box>
              <Box c="gray.7">{item.description}</Box>
            </Stack>
            {item.isOpened ? (
              <Tooltip label="Отметить как непрочитанное" position="bottom">
                <ActionIcon
                  color="gray"
                  variant="subtle"
                  size="lg"
                  aria-label="Gallery"
                >
                  <IconMail style={{ width: 20 }} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            ) : (
              <Tooltip label="Отметить как прочитанное" position="bottom">
                <ActionIcon
                  color="gray"
                  variant="subtle"
                  size="lg"
                  aria-label="Gallery"
                >
                  <IconMailOpened style={{ width: 20 }} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            )}
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
}
