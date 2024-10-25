"use client";
import {
  Button,
  NumberInput,
  SegmentedControl,
  Stack,
  Textarea,
  TextInput,
  Text,
  SimpleGrid,
  Avatar,
  Chip,
  Checkbox,
  Group,
  Box,
  Fieldset,
  Grid,
  Flex,
  Divider,
  Anchor,
  ActionIcon,
  Title,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconClock, IconEdit, IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function NewPage() {
  const [hasCar, setHasCar] = useState(false);

  return (
    <Stack maw={600} mx="auto" gap={10} pt={30}>
      <Avatar color="blue" radius={100} size={120} />

      <Box ml="auto">
        <ActionIcon color="gray" variant="subtle" size="lg" aria-label="Edit">
          <IconPencil />
        </ActionIcon>
      </Box>
      <Divider mb={10} />
      <div className="grid grid-cols-[auto_1fr] align-items-center gap-4">
        <Text ta="end" h="36px" lh="36px">
          Имя
        </Text>
        <TextInput placeholder="Асан Болотов" />
        <Text ta="end" h="36px" lh="36px">
          Номер телефона
        </Text>
        <TextInput placeholder="0 500 600 700" required />
        <Text ta="end" h="36px" lh="36px">
          Почта
        </Text>
        <TextInput required placeholder="your.name@email.com" />
        <Text ta="end" h="36px" lh="36px">
          Авто
        </Text>
        <TextInput required placeholder="Тойота Королла" />
        <Text ta="end" h="36px" lh="36px">
          О себе
        </Text>
        <Textarea required placeholder="Водитель категории В" />
      </div>
      <Title order={4}>Изменить пароль</Title>
      <Divider mb={10} />
      <Button w="max-content" variant="light">
        Сменить пароль
      </Button>

      <Title order={4}>Выйти из аккаунта</Title>
      <Divider mb={10} />
      <Button w="max-content" variant="light">
        Выйти из аккаунта
      </Button>

      <Title order={4}>Удалить аккаунт</Title>
      <Divider mb={10} />
      <Button w="max-content" variant="light" color="red">
        Удалить аккаунт
      </Button>
    </Stack>
  );
}
