import {
  Box,
  Button,
  Card,
  darken,
  Group,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconAdjustmentsCheck,
  IconCheck,
  IconChecks,
  IconClearAll,
  IconClock,
} from "@tabler/icons-react";
import ShowMyPostsInFilter from "./showMyPostsInFilter";
import { DatePickerInput, TimeInput } from "@mantine/dates";

function Filters() {
  return (
    <Stack>
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
      <Group
        style={{
          position: "sticky",
          bottom: 0,
          boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
        }}
        bg="white"
        p="12 15"
        justify="space-between"
      >
        <Button
          rightSection={<IconClearAll size={16} />}
          variant="light"
          fw="500"
        >
          Сбросить всё
        </Button>

        <Button
          color="green.7"
          rightSection={<IconCheck />}
        >
          <Text fz={14}>Применить</Text>
        </Button>
      </Group>
    </Stack>
  );
}
export default Filters;
