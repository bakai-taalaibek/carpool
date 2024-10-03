import { Box, BoxProps, CloseButton, Flex, Group, Stack } from "@mantine/core";

type TProps = {
  children: React.ReactNode;
  title: string;
  isLast: boolean;
};

export default function NotificationCustom({
  children,
  title,
  isLast,
}: TProps) {
  return (
    <Flex
      gap={2}
      fz={12}
      mx={10}
      px={5}
      py={12}
      // bg="gray.0"
      style={{
        cursor: "pointer",
        borderTop: "1px solid var(--mantine-color-gray-2)",
        borderBottom: `${
          isLast ? "1px solid var(--mantine-color-gray-2)" : "none"
        }`,
        // borderBottom: "1px solid var(--mantine-color-gray-2)",
      }}
    >
      <Stack gap={0}>
        <Box fw={500}>{title}</Box>
        <Box c="gray.7">{children}</Box>
      </Stack>
      <CloseButton size="sm" my="auto" />
    </Flex>
  );
}
