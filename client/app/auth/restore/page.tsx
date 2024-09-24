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

export default function ForgotPassword() {
  return (
    <Stack
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        paddingTop: 80,
        gap: 0,
        alignItems: "center",
      }}
    >
      <Title ta="center" fw={900} mb={5}>
        Забыли пароль?
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb={20}>
        Получите ссылку сброс пароля на почту
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" w={400}>
        <TextInput label="Почта" placeholder="your.name@email.com" required />
        <Group justify="space-between" mt="lg">
          <Anchor href="/auth" c="dimmed" size="sm">
            <Center inline>
              <IconArrowLeft
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
              <Box ml={5}>Назад </Box>
            </Center>
          </Anchor>
          <Button >Получить ссылку</Button>
        </Group>
      </Paper>
    </Stack>
  );
}
