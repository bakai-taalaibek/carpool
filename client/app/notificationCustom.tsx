import { Box, BoxProps, CloseButton, Flex, Group, Stack } from "@mantine/core";

type TProps = {
  children: React.ReactNode;
  title: string;
};

export default function NotificationCustom({ children, title }: TProps) {
  return (
    <Flex fz={13} bg="gray.0" py={5} px={10} style={{ cursor: "pointer" }}>
      <Stack gap={0}>
        <Box fw={500}>{title}</Box>
        <Box c="gray">{children}</Box>
      </Stack>
      <CloseButton size="sm" my="auto" />
    </Flex>
  );
}
