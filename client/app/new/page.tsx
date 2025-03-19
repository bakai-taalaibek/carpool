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
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { useState } from "react";

export default function NewPage() {
  const [role, setRole] = useState<string>("driver");

  return (
    <Stack w="80%" maw={600} mx="auto" mb={50} gap={33}>
      <Text fz={{ base: 16, xs: 18, sm: 20 }}>
        Укажите детали вашей поездки:
      </Text>
      <SegmentedControl
        value={role}
        onChange={(role) => setRole(role)}
        data={[
          { label: "Я водитель", value: "driver" },
          { label: "Я пассажир", value: "passenger" },
        ]}
      />
      <SimpleGrid cols={{ base: 1, xs: 2 }}>
        <TextInput label="Имя" placeholder="Асан Болотов" />
        <TextInput
          label="Номер телефона"
          placeholder="0 500 600 700"
          required
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, xs: 4 }}>
        <TextInput label="Откуда" placeholder="Бишкек" required />
        <TextInput label="Куда" placeholder="Чолпон-Ата" required />
        <DatePickerInput label="День" required />
        <TimeInput
          label="Время"
          placeholder="Укажите время"
          required
          rightSection={
            <IconClock style={{ width: 16, aspectRatio: 1 }} stroke={1.5} />
          }
        />
      </SimpleGrid>
      {role === "driver" && (
        <>
          <SimpleGrid cols={{ base: 1, xs: 4 }}>
            <TextInput label="Авто" placeholder="Тойота Королла" />
            <NumberInput label="Мест" placeholder="3" />
            <NumberInput
              label="Сомов за место"
              placeholder="400"
              hideControls
            />
            <NumberInput
              label="Сомов за салон"
              placeholder="2000"
              hideControls
            />
          </SimpleGrid>
        </>
      )}
      <Textarea autosize minRows={2} label="Комментарий" />
      <Button>Разместить объявление</Button>
    </Stack>
  );
}
