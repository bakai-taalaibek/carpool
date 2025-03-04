import {
  Avatar,
  Blockquote,
  Center,
  Divider,
  Group,
  lighten,
  Space,
  Stack,
  Text,
  Timeline,
  TimelineItem,
  Title,
} from "@mantine/core";
import { comments, posts } from "../../mock";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  IconAlignBoxLeftTop,
  IconCar,
  IconMessage2,
  IconPencil,
  IconPhoneCall,
} from "@tabler/icons-react";
import { Comment } from "../comment";
import CommentsHeader from "../commentsHeader";

export default function Post({ params }: { params: { post: string } }) {
  const post = posts.find((item) => item.postId === Number(params.post));
  dayjs.extend(relativeTime);

  return post ? (
    <Stack w={600} mx="auto" gap={24} pt={20}>
      <Stack gap={3}>
        <Title order={3} mx="auto">
          {dayjs(post.departureDatetime).format("D MMMM YYYY (dddd)")}
        </Title>
        <Title order={4} c="gray.5" mx="auto">
          {dayjs(post.departureDatetime).fromNow()}
        </Title>
      </Stack>

      <Divider />
      <Group wrap="nowrap" justify="center">
        <Avatar
          // style={{
          //   boxShadow: "0 0 3px var(--mantine-color-dark-1)",
          // }}
          src={post.role === "Водитель" ? "/driver8.jpg" : "/passenger2.jpg"}
          size={90}
          radius="lg"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {post.role}
          </Text>

          {post.name ? (
            <Text fz="lg" fw={500}>
              {post.name}
            </Text>
          ) : (
            <Text fz="lg" fs="italic" c="dark.2">
              Имя не указано
            </Text>
          )}

          <Group wrap="nowrap" gap={10} mt={2}>
            <IconPhoneCall stroke={1.5} size={16} />
            <Text fz="sm" c="blue">
              {post.phone.phoneCode} {post.phone.phoneNumber}
            </Text>
          </Group>

          {post.car && (
            <Group wrap="nowrap" gap={10} mt={2}>
              <IconCar stroke={1.5} size={16} />
              <Text fz="xs" c="dimmed">
                {post.car}
              </Text>
            </Group>
          )}
        </div>
      </Group>
      <Divider />

      <Group justify="space-between" align="start" px="md" py="sm">
        <Timeline active={1} bulletSize={24} lineWidth={2} color="green.7">
          <TimelineItem title={post.origin}>
            <Text c="dimmed" size="sm">
              Выезд ориентировочно в{" "}
              {dayjs(post.departureDatetime).format("H:mm")}
            </Text>
          </TimelineItem>

          <TimelineItem title={post.destination}></TimelineItem>
        </Timeline>
        {(post.seats || post.pricePerSeat || post.pricePerCar) && (
          <Stack align="end" gap={8}>
            <Text fz={24} fw={900} lh={1} c="orange.7">
              {post.pricePerSeat}
              <Text ml={6} c="dark" lh={1} component="span" fz={16} fw={400}>
                сом / место
              </Text>
            </Text>
            {post.pricePerCar && (
              <Text fz={24} fw={900} lh={1} c="blue.4">
                {post.pricePerCar}
                <Text ml={6} c="dark" lh={1} component="span" fz={16} fw={400}>
                  сом / салон
                </Text>
              </Text>
            )}

            {post.seats && (
              <Text c="gray.6" fz="xs" fw={500} mt={2}>
                Свободно {post.seats} места
              </Text>
            )}
          </Stack>
        )}
      </Group>

      {post.details ? (
        <Blockquote
          styles={{ root: { padding: 26 } }}
          color="blue.3"
          icon={<IconMessage2 />}
          cite="— Комментарий автора"
          mt="xs"
        >
          {post.details}
        </Blockquote>
      ) : (
        <Divider />
      )}
      <Group justify="end" c="dark.3" gap={0}>
        <IconAlignBoxLeftTop size={14} />
        <Text fz="xs" fs="italic">
          : {dayjs(post.postDatetime).fromNow()}
        </Text>
        {post.lastEditedDatetime && (
          <>
            <Space w="lg" />
            <IconPencil size={14} />
            <Text fz="xs" fs="italic">
              : {dayjs(post.lastEditedDatetime).fromNow()}
            </Text>
          </>
        )}
      </Group>
      <Stack my={20}>
        <CommentsHeader />
        <Divider />
        {comments ? (
          <Stack my={20} gap={10}>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                avatar={comment.avatar}
                name={comment.name}
                dateTime={comment.dateTime}
                commentText={comment.commentText}
                isMyPost={comment.isMyPost}
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
          >
            Тут пока пусто
          </Text>
        )}
      </Stack>
    </Stack>
  ) : (
    <Center>Данное объявление не найдено</Center>
  );
}
