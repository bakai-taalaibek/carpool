import { Avatar, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";

type CommentProps = {
  avatar: string;
  name: string;
  dateTime: string;
  commentText: string;
  isMyPost: boolean;
};

export function Comment({
  avatar,
  name,
  dateTime,
  commentText,
  isMyPost,
}: CommentProps) {
  return (
    <Group
      p={8}
      style={{ flexWrap: "nowrap", borderRadius: "5px" }}
      align="start"
      bg={isMyPost ? "var(--mantine-color-yellow-0)" : "transparent"}
    >
      <Avatar src={avatar} alt={name} radius="xl" />
      <Stack gap={6}>
        <Group>
          <Text size="sm">{name}</Text>
          <Text size="xs" c="dimmed">
            {dayjs(dateTime).fromNow()}
          </Text>
        </Group>
        <Text size="sm">{commentText}</Text>
      </Stack>
    </Group>
  );
}
