"use client";
import {
  Button,
  Grid,
  GridCol,
  Group,
  NumberInput,
  SegmentedControl,
  Stack,
  TextInput,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useState } from "react";

const NewPage = () => {
  const [role, setRole] = useState<string>("driver");

  return (
    <Stack gap="10px">
      <SegmentedControl
        fullWidth
        value={role}
        onChange={(role) => setRole(role)}
        data={[
          { label: "Я водитель", value: "driver" },
          { label: "Я пассажир", value: "passenger" },
        ]}
      />
      <TextInput label="Имя" placeholder="Асан" />
      <Group grow>
        <TextInput label="Откуда" placeholder="Бишкек" required />
        <TextInput label="Куда" placeholder="Чолпон-Ата" required />
      </Group>
      <Group grow>
        <DatePickerInput label="День" required />
        <TimeInput label="Время" placeholder="Укажите время" required />
      </Group>
      <TextInput label="Номер телефона" placeholder="0 500 600 700" required />
      {role === "driver" && (
        <TextInput label="Авто" placeholder="Тойота Королла" />
      )}
      {role === "driver" && (
        <Grid>
          <GridCol span={2.4}>
            <NumberInput label="Мест" placeholder="3" />
          </GridCol>
          <GridCol span={4.8}>
            <NumberInput
              label="Цена за место, cомов"
              placeholder="400"
              hideControls
            />
          </GridCol>
          <GridCol span={4.8}>
            <NumberInput
              label="Цена за салон, сомов"
              placeholder="2000"
              hideControls
            />
          </GridCol>
        </Grid>
      )}

      {/* <TextInput label="Комментарий" /> */}
      <Button mt="10px">Сохранить</Button>
    </Stack>
  );
};

export default NewPage;
