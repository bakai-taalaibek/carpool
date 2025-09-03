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
import { useForm } from "@mantine/form";
import { IconClock } from "@tabler/icons-react";
import LocalitySelect from "../app/new/localitySelect";
import { useGetRideRolesQuery } from "../services/rideRolesApi";
import { RidePostCreateDto } from "../types/ridePost";
import { RideRoleName } from "../types/rideRole";

export type RidePostFormValues = Omit<
  RidePostCreateDto,
  "departureDateTime"
> & {
  departureDate: string;
  departureTime: string;
};

type TProps = {
  isEdited?: boolean;
  initialData?: RidePostFormValues;
  onSubmit: (values: RidePostFormValues) => void;
};

export default function RidePostForm({
  isEdited,
  onSubmit,
  initialData,
}: TProps) {
  const { data: { rideRoleIdToNameMap, rideRoleNameToIdMap } = {} } =
    useGetRideRolesQuery();

  const form = useForm<RidePostFormValues>({
    initialValues: initialData,

    validate: {
      seats: (val, values) =>
        !rideRoleNameToIdMap ||
        values.rideRoleId === rideRoleNameToIdMap[RideRoleName.Passenger] ||
        (val && val > 0)
          ? undefined
          : "Недействительное количество мест",
    },
  });

  if (!rideRoleIdToNameMap || !rideRoleNameToIdMap || !form.values.rideRoleId)
    return null;

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack w="80%" maw={600} mx="auto" py="md" mb={50} gap={33}>
        <Text fz={{ base: 16, xs: 18, sm: 20 }}>
          {isEdited
            ? "Редактирование деталей вашей поездки:"
            : "Укажите детали вашей поездки:"}
        </Text>
        <SegmentedControl
          value={rideRoleIdToNameMap[form.values.rideRoleId]}
          data={[
            { label: "Я водитель", value: RideRoleName.Driver },
            { label: "Я пассажир", value: RideRoleName.Passenger },
          ]}
          onChange={(val) =>
            form.setFieldValue(
              "rideRoleId",
              rideRoleNameToIdMap[val as RideRoleName]
            )
          }
        />
        <SimpleGrid cols={{ base: 1, xs: 2 }}>
          <TextInput
            label="Имя"
            placeholder="Асан Болотов"
            value={form.values.anonName}
            onChange={(event) =>
              form.setFieldValue("anonName", event.currentTarget.value)
            }
          />
          <TextInput
            label="Номер телефона"
            placeholder="0 500 600 700"
            required
            value={form.values.anonPhone}
            onChange={(event) =>
              form.setFieldValue("anonPhone", event.currentTarget.value)
            }
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, xs: 4 }}>
          <LocalitySelect
            placeholder="Бишкек"
            label="Откуда"
            value={form.values.sourceId}
            onChange={(val) => form.setFieldValue("sourceId", val)}
          />
          <LocalitySelect
            placeholder="Чолпон-Ата"
            label="Куда"
            value={form.values.destinationId}
            onChange={(val) => form.setFieldValue("destinationId", val)}
          />
          <DatePickerInput
            label="День"
            required
            valueFormat="D MMM YYYY"
            value={form.values.departureDate}
            onChange={(val) => form.setFieldValue("departureDate", val ?? "")}
          />
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
            value={form.values.departureTime}
            onChange={(val) => form.setFieldValue("departureTime", val)}
          />
        </SimpleGrid>
        {form.values.rideRoleId ===
          rideRoleNameToIdMap[RideRoleName.Driver] && (
          <>
            <SimpleGrid cols={{ base: 1, xs: 4 }}>
              <TextInput
                label="Авто"
                placeholder="Тойота Королла"
                value={form.values.anonCar}
                onChange={(event) =>
                  form.setFieldValue("anonCar", event.currentTarget.value)
                }
              />
              <NumberInput
                label="Мест"
                placeholder="3"
                allowDecimal={false}
                value={form.values.seats ?? undefined}
                onChange={(val) =>
                  form.setFieldValue(
                    "seats",
                    typeof val === "number" ? val : Number.parseInt(val)
                  )
                }
              />
              <NumberInput
                label="Сомов за место"
                placeholder="400"
                hideControls
                allowDecimal={false}
                value={form.values.pricePerSeat ?? undefined}
                onChange={(val) =>
                  form.setFieldValue(
                    "pricePerSeat",
                    typeof val === "number" ? val : Number.parseInt(val)
                  )
                }
              />
              <NumberInput
                label="Сомов за салон"
                placeholder="2000"
                hideControls
                allowDecimal={false}
                value={form.values.pricePerCar ?? undefined}
                onChange={(val) =>
                  form.setFieldValue(
                    "pricePerCar",
                    typeof val === "number" ? val : Number.parseInt(val)
                  )
                }
              />
            </SimpleGrid>
          </>
        )}
        <Textarea
          autosize
          minRows={2}
          label="Комментарий"
          value={form.values.comment}
          onChange={(event) =>
            form.setFieldValue("comment", event.currentTarget.value)
          }
        />
        <Button type="submit">
          {isEdited ? "Сохранить изменения" : "Разместить объявление"}
        </Button>
      </Stack>
    </form>
  );
}
