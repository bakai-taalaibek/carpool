"use client";

import {
  Button,
  CheckIcon,
  FocusTrap,
  Group,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconChevronsRight } from "@tabler/icons-react";
import { useState } from "react";
import { useCreateCommentMutation } from "../../services/commentsApi";

function CommentsHeader({ ridePostId }: { ridePostId: number }) {
  const [isCommentFieldOpen, setIsCommentFieldOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [createComment] = useCreateCommentMutation();

  const handleSubmit = async () => {
    try {
      await createComment({
        ridePostId,
        parentId: undefined,
        content: commentContent,
      }).unwrap();
      notifications.show({
        message: "Комментарий успешно добавлен",
        color: "teal",
        title: "Успех!",
        position: "top-right",
        icon: <CheckIcon size={20} />,
      });
      setIsCommentFieldOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Text fz={26} c="gray.5">
          Комментарии
        </Text>
        {isCommentFieldOpen ? (
          <Group>
            <Button
              color="blue.8"
              variant="outline"
              size="xs"
              onClick={() => setIsCommentFieldOpen(false)}
            >
              <Text fz={14}>Отмена</Text>
            </Button>
            <Button
              color="green.7"
              size="xs"
              onClick={() => handleSubmit()}
              rightSection={<IconChevronsRight />}
            >
              <Text fz={14}>Отправить</Text>
            </Button>
          </Group>
        ) : (
          <Button
            radius="xl"
            size="xs"
            onClick={() => setIsCommentFieldOpen(true)}
          >
            <Text fz={14}>+ Добавить</Text>
          </Button>
        )}
      </Group>
      {isCommentFieldOpen && (
        <FocusTrap>
          <Textarea
            placeholder="Введите комментарий"
            value={commentContent}
            onChange={(event) => setCommentContent(event.currentTarget.value)}
          />
        </FocusTrap>
      )}
    </Stack>
  );
}
export default CommentsHeader;
