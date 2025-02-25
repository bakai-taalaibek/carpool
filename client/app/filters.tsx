import {
  Box,
  Button,
  Card,
  Chip,
  darken,
  Group,
  Input,
  lighten,
  SegmentedControl,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconClearAll, IconClock } from "@tabler/icons-react";
import ShowMyPostsInFilter from "./showMyPostsInFilter";
import { DatePickerInput, TimeInput } from "@mantine/dates";

function Filters() {
  return (
    <Box
      bg="indigo.0"
      style={{ borderRadius: "5px" }}
      mb="10px"
      p="10px"
      bd="solid 1.5px var(--mantine-color-indigo-1)"
    >
      <Group justify="space-between" mb={13}>
        <Title
          order={3}
          ml={3}
          c={darken("var(--mantine-color-indigo-9)", 0.1)}
        >
          Фильтры:
        </Title>
        <Button
          rightSection={<IconClearAll size={16} />}
          variant="default"
          radius="xl"
          bd="none"
          fw="500"
        >
          Сбросить
        </Button>
      </Group>
      <Group align="start">
        <Card w="fit-content">
          <Text mb="5px">Чьи объявления показывать?</Text>
          <SegmentedControl
            // value={role}
            // onChange={(role) => setRole(role)}
            data={[
              { label: "Всех", value: "all" },
              { label: "Водителей", value: "drivers" },
              { label: "Пассажиров", value: "passengers" },
            ]}
          />
        </Card>
        <ShowMyPostsInFilter />
        <Card w="fit-content">
          <Text mb="5px">Откуда?</Text>
          <TextInput placeholder="Каракол" />
        </Card>
        <Card w="fit-content">
          <Text mb="5px">Куда?</Text>
          <TextInput placeholder="Ош" />
        </Card>
        <Card w="fit-content">
          <Text mb="5px">Цена (сомов за место):</Text>
          <Group gap={8}>
            <Text mb="5px">от:</Text>
            <TextInput placeholder="0" w={80} />
            <Text mb="5px">до:</Text>
            <TextInput placeholder="500" w={80} />
          </Group>
        </Card>
        <Card w="fit-content">
          <Text mb="5px">С какого времени вести поиск?</Text>
          <Group gap={8}>
            <Text mb="5px">день:</Text>
            <DatePickerInput miw={100} />
            <Text mb="5px">время:</Text>
            <TimeInput
              miw={100}
              placeholder="Укажите время"
              rightSection={
                <IconClock style={{ width: 16, aspectRatio: 1 }} stroke={1.5} />
              }
            />
          </Group>
        </Card>
        <Card w="fit-content">
          <Text mb="5px">До какого времени вести поиск?</Text>
          <Group gap={8}>
            <Text mb="5px">день:</Text>
            <DatePickerInput miw={100} />
            <Text mb="5px">время:</Text>
            <TimeInput
              miw={100}
              placeholder="Укажите время"
              rightSection={
                <IconClock style={{ width: 16, aspectRatio: 1 }} stroke={1.5} />
              }
            />
          </Group>
        </Card>
        <Card w="fit-content">
          <Text mb="5px">Сколько мест?</Text>
          <Group gap={8}>
            <Text mb="5px">от:</Text>
            <TextInput placeholder="0" w={80} />
            <Text mb="5px">до:</Text>
            <TextInput placeholder="3" w={80} />
          </Group>
        </Card>
        <Card w="fit-content">
          <Text mb="5px">Поиск по имени:</Text>
          <TextInput placeholder="Асан Болотов" />
        </Card>
        <Card w="fit-content">
          <Text mb="5px">Поиск по номеру телефона:</Text>
          <TextInput placeholder="0 500 600 700" required />
        </Card>
        <Card w="fit-content">
          <Text mb="5px">Поиск по комментарию:</Text>
          <TextInput placeholder="Не курю" />
        </Card>
      </Group>
    </Box>
  );
}
export default Filters;
