import {
  Blockquote,
  Group,
  Space,
  Stack,
  Text,
  Timeline,
  TimelineItem,
  Title,
} from "@mantine/core";
import { posts } from "../../mock";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  IconEdit,
  IconMailPlus,
  IconMessage2,
  IconPhone,
  IconSquarePlus2,
} from "@tabler/icons-react";

export default function Post({ params }: { params: { post: string } }) {
  const post = posts.find((item) => item.postId === Number(params.post));
  dayjs.extend(relativeTime);

  return post ? (
    <Stack maw={600} mx="auto" gap={33}>
      <Stack gap={5}>
        <Title order={3} mx="auto">
          {dayjs(post.departureDatetime).format("D MMMM YYYY (dddd)")}
        </Title>
        <Title order={3} c="gray.5" mx="auto">
          {dayjs(post.departureDatetime).fromNow()}
        </Title>
      </Stack>
      <Group justify="space-between" gap={0}>
        <Text>
          {post.role}:{" "}
          {post.name ? (
            <Text component="span">{post.name}</Text>
          ) : (
            <Text fs="italic" c="dark.3" component="span">
              Имя не указано
            </Text>
          )}
        </Text>

        {/* <Group gap={5}>
          <IconPhone size={25} color="orange" />

          
        </Group> */}
        <Text>
          Номер телефона:{" "}
          <Text component="span" c="blue">
            {post.phone.phoneCode} {post.phone.phoneNumber}
          </Text>
        </Text>
      </Group>
      <Timeline active={1} bulletSize={24} lineWidth={2} color="green.7">
        <TimelineItem title={post.origin}>
          <Text c="dimmed" size="sm">
            Выезд ориентировочно в{" "}
            {dayjs(post.departureDatetime).format("H:mm")}
          </Text>
        </TimelineItem>

        <TimelineItem title={post.destination}></TimelineItem>
      </Timeline>

      {(post.car || post.seats || post.pricePerSeat || post.pricePerCar) && (
        <Group justify="space-between">
          {post.car && <Text>Авто: {post.car}</Text>}
          {post.seats && <Text>Мест: {post.seats}</Text>}
          {post.pricePerSeat && (
            <Text>Цена/место: {post.pricePerSeat} cом</Text>
          )}
          {post.pricePerCar && <Text>Цена/салон: {post.pricePerCar} сом</Text>}
        </Group>
      )}
      {post.details && (
        <Blockquote
          color="blue.3"
          icon={<IconMessage2 />}
          cite="Комментарий автора"
          mt="xs"
        >
          {post.details}
        </Blockquote>
      )}
      <Group justify="end" c="dark.3" gap={0}>
        <IconMailPlus size={14} />:
        <Text fz="xs" ml={5} mr={20} fs="italic">
          {dayjs(post.postDatetime).fromNow()}
        </Text>
        <IconEdit size={14} />:
        <Text fz="xs" ml={5} fs="italic">
          {dayjs(post.lastEditedDatetime).fromNow()}
        </Text>
      </Group>
    </Stack>
  ) : (
    <>Данное объявление не найдено</>
  );
}
