"use client";
import {
  Button,
  Fieldset,
  Grid,
  GridCol,
  Group,
  NumberInput,
  SegmentedControl,
  Stack,
  Textarea,
  TextInput,
  Text,
  Title,
  SimpleGrid,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useState } from "react";

export default function NewPage() {
  const [role, setRole] = useState<string>("driver");

  return (
    <Stack maw="600px" mx="auto" gap="33px">
      <Text fz={{ base: "16px", xs: "18px", sm: "20px" }}>
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
        <TextInput label="Имя" placeholder="Асан" />
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
        <TimeInput label="Время" placeholder="Укажите время" required />
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
      <Textarea label="Комментарий" />
      <Button>Разместить объявление</Button>
    </Stack>
  );
}
