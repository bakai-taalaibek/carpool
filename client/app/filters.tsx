import { Box, Card, lighten, SegmentedControl, Text, Title } from "@mantine/core";

function Filters() {
  return (
    <Box
      bg="indigo.0"
      style={{ borderRadius: "5px" }}
      mb="10px"
      p="10px"
      bd="solid 1px var(--mantine-color-indigo-1)"
    >
      <Title order={3}  mt={5} mb={10}>Фильтры:</Title>
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
    </Box>
  );
}
export default Filters;
