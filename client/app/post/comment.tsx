import {
  ActionIcon,
  Alert,
  Avatar,
  Button,
  CheckIcon,
  Group,
  HoverCard,
  lighten,
  Modal,
  Space,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPencil } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../services/commentsApi";
import { CommentWithUserInfoDto } from "../../types/comment";

type CommentProps = {
  comment: CommentWithUserInfoDto;
  writtenByRidePostAuthor: boolean;
};

export function Comment({ comment, writtenByRidePostAuthor }: CommentProps) {
  const [
    isDeleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [isEditModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [newContent, setNewContent] = useState(comment.content);

  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const guestId = useSelector((state: RootState) => state.auth.guestId);

  const isMyPost = comment.userId === userId || comment.guestId === guestId;

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id).unwrap();
      notifications.show({
        message: "Комментарий успешно удалено",
        color: "teal",
        title: "Успех!",
        position: "top-right",
        icon: <CheckIcon size={20} />,
      });
    } catch (error) {
      console.log(error);
    } finally {
      closeDeleteModal();
    }
  };

  const handleSubmitEdit = async () => {
    try {
      await updateComment({ ...comment, content: newContent }).unwrap();
      notifications.show({
        message: "Комментарий успешно редактирован",
        color: "teal",
        title: "Успех!",
        position: "top-right",
        icon: <CheckIcon size={20} />,
      });
    } catch (error) {
      console.log(error);
    } finally {
      closeEditModal();
    }
  };

  return (
    <Group
      p={8}
      pb={10}
      maw={"80%"}
      w="max-content"
      style={{ flexWrap: "nowrap", borderRadius: "5px" }}
      align="start"
      ml={isMyPost ? "auto" : ""}
      bg={
        isMyPost
          ? lighten("#fff6de", 0.3)
          : lighten("var(--mantine-color-gray-1)", 0.2)
      }
    >
      <Avatar
        src={comment.userAvatar}
        alt={comment.userDisplayName}
        radius="xl"
      />
      <Stack gap={8}>
        <Group gap={4}>
          {comment.userDisplayName ? (
            <Text size="sm">{comment.userDisplayName}</Text>
          ) : (
            <Text c="dimmed" fs="italic" size="sm">
              Имя не указано
            </Text>
          )}
          {writtenByRidePostAuthor && (
            <Text size="sm" fw={500}>
              (Автор объявления)
            </Text>
          )}
          <Space w="sm" />
          <HoverCard shadow="md">
            <HoverCard.Target>
              <Text fz="xs" c="gray">
                {comment.isEdited
                  ? "изменено " + dayjs(comment.dateModified).format("H:mm")
                  : dayjs(comment.dateCreated).format("H:mm")}
              </Text>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Stack gap={2}>
                <Text fz="xs" c="gray">
                  создано{" "}
                  {dayjs(comment.dateCreated).format("D MMMM YYYY г. в H:mm")}
                </Text>
                {comment.isEdited && (
                  <Text fz="xs" c="gray">
                    изменено{" "}
                    {dayjs(comment.dateModified).format(
                      "D MMMM YYYY г. в H:mm"
                    )}
                  </Text>
                )}
              </Stack>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        {comment.isDeleted ? (
          <Text size="sm" c="gray.6">
            [{comment.content.toLowerCase()}]
          </Text>
        ) : (
          <Text size="sm">{comment.content}</Text>
        )}
        {isMyPost && !comment.isDeleted && (
          <Group justify="end" mr={8} mb={2} gap={10}>
            <ActionIcon
              onClick={() => openEditModal()}
              size="xs"
              h="max-content"
              color="dark.3"
              fw={400}
              variant="transparent"
            >
              <IconPencil radius="xl" size={17} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                openDeleteModal();
              }}
              size="xs"
              h="max-content"
              variant="transparent"
              color="dark.3"
              fw={400}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 7l16 0"></path>
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
              </svg>
            </ActionIcon>
          </Group>
        )}
      </Stack>
      <Modal
        opened={isDeleteModalOpened}
        onClose={closeDeleteModal}
        title="Подтвердить удаление комментария"
      >
        <Stack>
          <Alert variant="light" color="orange" title="Внимание">
            После удаления комментария, он будет недоступен без возможности
            восстановления
          </Alert>
          <Button
            onClick={handleDelete}
            w="max-content"
            variant="filled"
            color="red"
          >
            Подтвердить удаление комментария
          </Button>
        </Stack>
      </Modal>
      <Modal
        opened={isEditModalOpened}
        onClose={closeEditModal}
        title="Редактирование комментария"
      >
        <Stack>
          <Textarea
            value={newContent}
            onChange={(event) => setNewContent(event.currentTarget.value)}
          />
          <Button
            ml="auto"
            onClick={handleSubmitEdit}
            w="max-content"
            variant="filled"
          >
            Сохранить
          </Button>
        </Stack>
      </Modal>
    </Group>
  );
}
