import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  Stack,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <Center
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        paddingTop: 40,
      }}
    >
      <Paper withBorder shadow="md" p={30} radius="md" w={400}>
        <Text ta="center" fw={900} mb={5} size="xl">
          Забыли пароль?
        </Text>
        <Text c="dimmed" size="sm" ta="center" mb={20}>
          Получите ссылку сброс пароля на почту
        </Text>
        <TextInput label="Почта" placeholder="your.name@email.com" required />
        <Group justify="space-between" mt="lg">
          <Anchor component={Link} href="/auth" c="dimmed" size="sm">
            <Center inline>
              <IconArrowLeft
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
              <Box ml={5}>Назад </Box>
            </Center>
          </Anchor>
          <Button>Получить ссылку</Button>
        </Group>
      </Paper>
    </Center>
  );
}
