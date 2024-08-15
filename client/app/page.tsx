import { Box } from "@mantine/core";

export default function HomePage() {
  return (
    <Box>
      Navbar is only visible on mobile, links that are rendered in the header on
      desktop are hidden on mobile in header and rendered in navbar instead.
    </Box>
  );
}
