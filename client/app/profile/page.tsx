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
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { useState } from "react";

export default function NewPage() {
  const [hasCar, setHasCar] = useState(false);

  return (
    <Stack maw={600} mx="auto" gap={33} pt={30}>
      <Avatar color="blue" radius={100} size={150} />

      <SimpleGrid cols={{ base: 1, xs: 2 }}>
        <TextInput label="Имя" placeholder="Асан" />
        <TextInput
          label="Номер телефона"
          placeholder="0 500 600 700"
          required
        />
        <TextInput required label="Почта" placeholder="your.name@email.com" />
      </SimpleGrid>

      <Fieldset legend="Авто">
        <Group>
          <Checkbox
            checked={hasCar}
            onChange={(event) => setHasCar(event.currentTarget.checked)}
            label="У меня есть авто"
          />
          <TextInput
            // label="Авто"
            placeholder="Тойота Королла"
            disabled={!hasCar}
          />
        </Group>
      </Fieldset>
      <Textarea autosize minRows={2} label="О себе" />
    </Stack>
  );
}
