"use client";
import { Text } from "@mantine/core";

export default function CheckEmail() {
  return (
    <>
      <Text ta="center" fw={900} mb={5} size="xl">
        Проверьте почту.
      </Text>
      <Text c="dimmed" size="sm" ta="center" mb={10}>
        Мы отправили сообщение c ссылкой на почтовый адрес, который вы указали.
      </Text>
      <Text c="dimmed" size="sm" ta="center">
        Возможно сообщение попало в спам.
      </Text>
    </>
  );
}
