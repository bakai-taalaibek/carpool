import {
  Box,
  Button,
  Card,
  darken,
  Group,
  lighten,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
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

const largerVerticalCardSpacing = 16;
const smallerVerticalCardSpacing = 9;
const marginBottomForTextNextToInput = 3;
const cardVerticalPadding = "18 22";

function Filters() {
  return (
    <Stack gap={0}>
      <Stack
        align="start"
        p="16 18 18 12"
        gap={12}
        // bg="gray.0"
        bg={lighten("var(--mantine-color-gray-1)", 0.1)}
      >
        <Card w="100%" radius="lg" py={cardVerticalPadding}>
          <Text mb={largerVerticalCardSpacing} fw="500">
            Чьи объявления показать?
          </Text>
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
        <ShowMyPostsInFilter w="100%" radius="lg" />

        <Card w="100%" radius="lg" py={cardVerticalPadding}>
          <Text mb={largerVerticalCardSpacing} fw="500">
            Маршрут:
          </Text>
          <Group gap={8} wrap="nowrap">
            <Text mb={marginBottomForTextNextToInput}>откуда:</Text>
            <TextInput placeholder="Бишкек" />
            <Text mb={marginBottomForTextNextToInput}>куда:</Text>
            <TextInput placeholder="Ош" />
          </Group>
        </Card>
        <Card w="100%" radius="lg" py={cardVerticalPadding}>
          <Text mb={largerVerticalCardSpacing} fw="500">
            Цена (сомов за место):
          </Text>
          <Group gap={8} wrap="nowrap">
            <Text mb={marginBottomForTextNextToInput}>от:</Text>
            <TextInput placeholder="0" />
            <Text mb={marginBottomForTextNextToInput}>до:</Text>
            <TextInput placeholder="500" />
          </Group>
        </Card>
        <Card w="100%" radius="lg" py={cardVerticalPadding}>
          <Text mb={largerVerticalCardSpacing} fw="500">
            С какого дня показать?
          </Text>
          <Group gap={7} wrap="nowrap">
            <Text mb={marginBottomForTextNextToInput}>день:</Text>
            <DatePickerInput w="100%" valueFormat="DD MMM YYYY" />
            <Text mb={marginBottomForTextNextToInput}>время:</Text>
            <Tooltip label="Нажмите и наберите время">
              <TimeInput
                placeholder="Укажите время"
                miw={90}
                styles={{ input: { paddingRight: "30px" } }}
                rightSection={
                  <IconClock
                    style={{ width: 16, aspectRatio: 1 }}
                    stroke={1.5}
                  />
                }
              />
            </Tooltip>
          </Group>
        </Card>
        <Card w="100%" radius="lg" py={cardVerticalPadding}>
          <Text mb={largerVerticalCardSpacing} fw="500">
            До какого дня?
          </Text>
          <Group gap={7} wrap="nowrap">
            <Text mb={marginBottomForTextNextToInput}>день:</Text>
            <DatePickerInput w="100%" valueFormat="DD MMM YYYY" />
            <Text mb={marginBottomForTextNextToInput}>время:</Text>
            <Tooltip label="Нажмите и наберите время">
              <TimeInput
                placeholder="Укажите время"
                miw={90}
                styles={{ input: { paddingRight: "30px" } }}
                rightSection={
                  <IconClock
                    style={{ width: 16, aspectRatio: 1 }}
                    stroke={1.5}
                  />
                }
              />
            </Tooltip>
          </Group>
        </Card>
        <Card w="100%" radius="lg" py={cardVerticalPadding}>
          <Text mb={largerVerticalCardSpacing} fw="500">
            Отфильтровать по количеству мест:
          </Text>

          <Group gap={8} wrap="nowrap">
            <Text mb={marginBottomForTextNextToInput}>минимум:</Text>
            <Tooltip
              label="Будут скрыты объявления, где число мест меньше этой цифры"
              position="bottom"
            >
              <TextInput placeholder="2" />
            </Tooltip>
            <Text mb={marginBottomForTextNextToInput}>максимум:</Text>
            <Tooltip
              label="Будут скрыты объявления, где число мест больше этой цифры"
              position="bottom"
            >
              <TextInput placeholder="4" />
            </Tooltip>
          </Group>
        </Card>
        <Card w="100%" radius="lg" py={cardVerticalPadding}>
          <Text mb={smallerVerticalCardSpacing} fw="500">
            Имя:
          </Text>
          <TextInput placeholder="Асан Болотов" />
        </Card>
        <Card w="100%" radius="lg" py={cardVerticalPadding}>
          <Text mb={smallerVerticalCardSpacing} fw="500">
            Номер телефона:
          </Text>
          <TextInput placeholder="0 500 600 700" required />
        </Card>
        <Card w="100%" radius="lg" py={cardVerticalPadding}>
          <Text mb={smallerVerticalCardSpacing} fw="500">
            Комментарий:
          </Text>
          <TextInput placeholder="Не курю" />
        </Card>
      </Stack>
      <Group
        style={{
          position: "sticky",
          bottom: 0,
          boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
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

        <Button color="green.7" rightSection={<IconCheck />}>
          <Text fz={14}>Применить</Text>
        </Button>
      </Group>
    </Stack>
  );
}
export default Filters;
