import {
  Box,
  Card,
  Group,
  Input,
  lighten,
  SegmentedControl,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

function Filters() {
  return (
    <Box
      // bg={lighten("var(--mantine-color-indigo-0)", 0.5)}
      bg="indigo.0"
      // bg="white"
      style={{ borderRadius: "5px" }}
      mb="10px"
      p="10px"
      bd="solid 1.5px var(--mantine-color-indigo-1)"
    >
      <Title order={3} mt={5} mb={10}>
        Фильтры:
      </Title>
      <Group align="start">
        <Card w="fit-content">
          <Text mb="5px">Кого показывать?</Text>
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
        <Card w="fit-content">
          <Text mb="5px">Поиск по имени:</Text>
          <TextInput placeholder="Асан Болотов" />
        </Card>
        <Card w="fit-content">
          <Text mb="5px">Откуда?</Text>
          <TextInput placeholder="Каракол" />
        </Card>
        <Card w="fit-content">
          <Text mb="5px">Куда?</Text>
          <TextInput placeholder="Ош" />
        </Card>
        <Card w="fit-content">
          <Text mb="5px">Максимальная цена (сом/место):</Text>
          <TextInput placeholder="500" />
        </Card>
        <Card w="fit-content">
          <Text mb="5px">Поиск по номеру телефона:</Text>
          <TextInput
            placeholder="0 500 600 700"
            required
          />
        </Card>
      </Group>
    </Box>
  );
}
export default Filters;
