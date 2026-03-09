import { Center, Paper } from "@mantine/core";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Center py="lg">
      <Paper
        radius="md"
        p="xl"
        withBorder
        w={400}
        className="border-transparent shadow-none min-[500px]:border-gray-200 min-[500px]:shadow-md"
      >
        {children}
      </Paper>
    </Center>
  );
}
