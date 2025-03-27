"use client";
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
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

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
      <Paper
        withBorder
        p="xl"
        radius="md"
        w={400}
        className="border-transparent shadow-none min-[500px]:border-gray-200 min-[500px]:shadow-md"
      >
        <Text ta="center" fw={900} mb={5} size="xl">
          Забыли пароль?
        </Text>
        <Text c="dimmed" size="sm" ta="center" mb={20}>
          Получите ссылку на сброс пароля
        </Text>
        <TextInput label="Почта" placeholder="your.name@email.com" required />
        <Group justify="space-between" mt="lg">
          <Anchor component="button" onClick={router.back} c="dimmed" size="sm">
            <Center inline>
              <IconArrowLeft style={{ width: 12, height: 12 }} stroke={1.5} />
              <Anchor c="dimmed" size="sm" ml={5}>
                Назад{" "}
              </Anchor>
            </Center>
          </Anchor>
          <Button>Получить ссылку</Button>
        </Group>
      </Paper>
    </Center>
  );
}
