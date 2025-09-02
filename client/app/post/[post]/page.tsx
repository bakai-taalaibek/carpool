"use client";
import {
  Alert,
  Avatar,
  Blockquote,
  Button,
  Center,
  CheckIcon,
  Divider,
  Flex,
  Group,
  lighten,
  Modal,
  Space,
  Stack,
  Text,
  Timeline,
  TimelineItem,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconCar,
  IconFileSpark,
  IconMessage2,
  IconPencil,
  IconPhoneCall,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";
import { useLazyGetCommentsByRidePostIdQuery } from "../../../services/commentsApi";
import { useGetLocalitiesQuery } from "../../../services/localitiesApi";
import {
  useDeleteRidePostMutation,
  useGetRidePostByIdQuery,
} from "../../../services/ridePostsApi";
import { useGetRideRolesQuery } from "../../../services/rideRolesApi";
import { RideRoleName, rideRoleNameToRuNameMap } from "../../../types/rideRole";
import { Comment } from "../comment";
import CommentsHeader from "../commentsHeader";

export default function Post({ params }: { params: { post: string } }) {
  const { data: ridePost } = useGetRidePostByIdQuery(Number(params.post));
  const { data: localities } = useGetLocalitiesQuery();
  const { data: { rideRoleIdToNameMap, rideRoleNameToIdMap } = {} } =
    useGetRideRolesQuery();
  const [getComments, { data: comments }] =
    useLazyGetCommentsByRidePostIdQuery();

  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const guestId = useSelector((state: RootState) => state.auth.guestId);

  const router = useRouter();

  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [deleteRidePost] = useDeleteRidePostMutation();

  dayjs.extend(relativeTime);
  dayjs.locale("ru");

  useEffect(() => {
    if (ridePost) {
      getComments(ridePost.id);
    }
  }, [ridePost]);

  if (
    !ridePost ||
    !rideRoleNameToIdMap ||
    !ridePost?.rideRoleId ||
    !rideRoleIdToNameMap ||
    !localities
  )
    return null;

  const handleDelete = async () => {
    try {
      await deleteRidePost(ridePost.id).unwrap();
      notifications.show({
        message: "Объявление успешно удалено",
        color: "teal",
        title: "Успех!",
        position: "top-right",
        icon: <CheckIcon size={20} />,
      });
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  return ridePost ? (
    <Stack w="90%" maw={600} mx="auto" gap={24} pt="xl">
      <Stack gap={3}>
        <Title order={3} ta="center">
          {dayjs(ridePost.departureDateTime).format("D MMMM YYYY (dddd)")}
        </Title>
        <Title order={4} c="gray.5" mx="auto">
          {dayjs(ridePost.departureDateTime).fromNow()}
        </Title>
      </Stack>

      <Divider />
      <Group wrap="nowrap" justify="center">
        <Avatar
          src={
            ridePost.rideRoleId === rideRoleNameToIdMap[RideRoleName.Driver]
              ? "/driver8.jpg"
              : "/passenger2.jpg"
          }
          size={90}
          radius="lg"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {rideRoleNameToRuNameMap[rideRoleIdToNameMap[ridePost.rideRoleId]]}
          </Text>

          {ridePost.anonName ? (
            <Text fz="lg" fw={500}>
              {ridePost.anonName}
            </Text>
          ) : (
            <Text fz="lg" fs="italic" c="dark.2">
              Имя не указано
            </Text>
          )}

          <Group wrap="nowrap" gap={10} mt={2}>
            <IconPhoneCall stroke={1.5} size={16} />
            <Text fz="sm" c="blue">
              {ridePost.anonPhone}
            </Text>
          </Group>

          {ridePost.anonCar && (
            <Group wrap="nowrap" gap={10} mt={2}>
              <IconCar stroke={1.5} size={16} />
              <Text fz="xs" c="dimmed">
                {ridePost.anonCar}
              </Text>
            </Group>
          )}
        </div>
      </Group>
      <Divider />

      <Group justify="space-between" align="start" px="md" py="sm" gap={40}>
        <Timeline active={1} bulletSize={24} lineWidth={2} color="green.7">
          <TimelineItem
            title={localities.find((i) => i.id === ridePost.sourceId)?.name}
          >
            <Text c="dimmed" size="sm">
              Выезд ориентировочно в{" "}
              {dayjs(ridePost.departureDateTime).format("H:mm")}
            </Text>
          </TimelineItem>

          <TimelineItem
            title={
              localities.find((i) => i.id === ridePost.destinationId)?.name
            }
          ></TimelineItem>
        </Timeline>
        {(ridePost.seats || ridePost.pricePerSeat || ridePost.pricePerCar) && (
          <Stack align="end" gap={8} ml="auto">
            <Text fz={24} fw={900} lh={1} c="orange.7">
              {ridePost.pricePerSeat}
              <Text ml={6} c="dark" lh={1} component="span" fz={16} fw={400}>
                сом / место
              </Text>
            </Text>
            {ridePost.pricePerCar && (
              <Text fz={24} fw={900} lh={1} c="blue.4">
                {ridePost.pricePerCar}
                <Text ml={6} c="dark" lh={1} component="span" fz={16} fw={400}>
                  сом / салон
                </Text>
              </Text>
            )}

            {ridePost.seats && (
              <Text c="gray.6" fz="xs" fw={500} mt={2}>
                Свободно {ridePost.seats} места
              </Text>
            )}
          </Stack>
        )}
      </Group>

      {ridePost.comment ? (
        <Blockquote
          styles={{ root: { padding: 26 } }}
          color="blue.3"
          icon={<IconMessage2 />}
          cite="— Комментарий автора"
          mt="xs"
        >
          {ridePost.comment}
        </Blockquote>
      ) : (
        <Divider />
      )}
      <Group justify="start" c="dark.3" gap={0}>
        <Flex gap={6} mr="auto">
          {ridePost.userId === userId || ridePost.guestId === guestId ? (
            <>
              <Button
                onClick={() => router.push(`/post/${ridePost.id}/edit`)}
                leftSection={<IconPencil radius="xl" size={17} />}
                size="xs"
                radius="lg"
                variant="light"
              >
                Редактировать
              </Button>
              <Button
                onClick={() => {
                  openModal();
                }}
                size="xs"
                radius="lg"
                variant="light"
                color="red.5"
                leftSection={
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
                }
              >
                Удалить
              </Button>
            </>
          ) : (
            ""
          )}
        </Flex>

        <IconFileSpark size={14} />
        {/* <IconFilePlus size={14} /> */}

        <Text fz="xs" fs="italic">
          : {dayjs(ridePost.dateCreated).fromNow()}
        </Text>
        {ridePost.dateModified && (
          <>
            <Space w="lg" />
            <IconPencil size={14} />
            <Text fz="xs" fs="italic">
              : {dayjs(ridePost.dateModified).fromNow()}
            </Text>
          </>
        )}
      </Group>
      <Stack my={20}>
        <CommentsHeader ridePostId={ridePost.id} />
        <Divider />
        {comments && comments.length > 0 ? (
          <Stack my={20} gap={15} style={{ flexDirection: "column-reverse" }}>
            {comments.map((comment) => (
              <Comment
                writtenByRidePostAuthor={
                  (!!comment.userId && comment.userId === ridePost.userId) ||
                  (!!comment.guestId &&
                    comment.guestId === ridePost.guestId)
                }
                key={comment.id}
                comment={comment}
              />
            ))}
          </Stack>
        ) : (
          <Text
            fz={17}
            ta="center"
            fw={500}
            c={lighten("var(--mantine-color-gray-7)", 0.4)}
            mt={5}
            mb={20}
          >
            Комментариев пока нет
          </Text>
        )}
      </Stack>
      <Modal
        opened={isModalOpened}
        onClose={closeModal}
        title="Подтвердить удаление объявления"
      >
        <Stack>
          <Alert variant="light" color="orange" title="Внимание">
            После удаления объявления, он будет недоступен без возможности
            восстановления
          </Alert>
          <Button
            onClick={handleDelete}
            w="max-content"
            variant="filled"
            color="red"
          >
            Подтвердить удаление объявления
          </Button>
        </Stack>
      </Modal>
    </Stack>
  ) : (
    <Center>Данное объявление не найдено</Center>
  );
}
