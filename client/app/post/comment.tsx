import { Avatar, Group, Text } from "@mantine/core";
import dayjs from "dayjs";

type CommentProps = {
  avatar: string;
  name: string;
  dateTime: string;
  commentText: string;
};

export function Comment({ avatar, name, dateTime, commentText }: CommentProps) {
  return (
    <div>
      <Group>
        <Avatar src={avatar} alt={name} radius="xl" />
        <div>
          <Text size="sm">{name}</Text>
          <Text size="xs" c="dimmed">
            {dayjs(dateTime).fromNow()}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {commentText}
      </Text>
    </div>
  );
}
