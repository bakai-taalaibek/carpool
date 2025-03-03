"use client";

import { Text, Button, FocusTrap, Group, Stack, Textarea } from "@mantine/core";
import { IconChevronsRight } from "@tabler/icons-react";
import { useState } from "react";

function CommentsHeader() {
  const [isCommentFieldOpen, setIsCommentFieldOpen] = useState(false);

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
              onClick={() => setIsCommentFieldOpen(false)}
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
            <Text fz={14}>+ Добавить комментарий</Text>
          </Button>
        )}
      </Group>
      {isCommentFieldOpen && (
        <FocusTrap>
          <Textarea placeholder="Введите комментарий" />
        </FocusTrap>
      )}
    </Stack>
  );
}
export default CommentsHeader;
