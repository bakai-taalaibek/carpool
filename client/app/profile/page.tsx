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
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { useState } from "react";

export default function NewPage() {
  const [hasCar, setHasCar] = useState(false);

  return (
    <Stack maw={600} mx="auto" gap={33} pt={30}>
      <Avatar color="blue" radius={100} size={150} />

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

      <Button>Выйти из аккаунта</Button>
      <Button>Сменить пароль</Button>
      <Button>Удалить аккаунт</Button>
    </Stack>
  );
}
