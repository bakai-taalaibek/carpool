"use client";
import {
  Button,
  NumberInput,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { useState } from "react";
import LocalitySelect from "./localitySelect";

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
        <LocalitySelect placeholder="Бишкек" label="Откуда" />
        <LocalitySelect placeholder="Чолпон-Ата" label="Куда" />
        <DatePickerInput label="День" required valueFormat="D MMM YYYY" />
        <TimePicker
          label="Время выезда"
          required
          withDropdown
          minutesStep={5}
          popoverProps={{
            position: "top-start",
            middlewares: { flip: false, shift: false },
          }}
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
