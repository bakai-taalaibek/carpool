import { Box, lighten, SegmentedControl } from "@mantine/core";

function Filters() {
  return (
    <Box
      // bg={lighten("var(--mantine-color-gray-2)", 0)}
      style={{ borderRadius: "5px" }}
      mb="10px"
      p="10px"
      bd="solid 1px blue"
    >
      <SegmentedControl
        // value={role}
        // onChange={(role) => setRole(role)}
        data={[
          { label: "Все", value: "all" },
          { label: "Водители", value: "drivers" },
          { label: "Пассажиры", value: "passengers" },
        ]}
      />
    </Box>
  );
}
export default Filters;
