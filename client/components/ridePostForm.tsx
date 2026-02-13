"use client";
import {
  Button,
  Card,
  NumberInput,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock } from "@tabler/icons-react";
import { useState } from "react";
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
  const [isFullCar, setIsFullCar] = useState(false);

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
              <Card
                onClick={() => {
                  setIsFullCar(!isFullCar);
                }}
                style={{ cursor: "pointer" }}
                p={0}
              >
                <Text fz={14} mb={9} fw="500">
                  Только салон
                </Text>
                <Switch
                  checked={isFullCar}
                  style={{ pointerEvents: "none" }}
                  size="md"
                />
              </Card>
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
              {isFullCar ? (
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
              ) : (
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
              )}

              <TextInput
                label="Авто"
                placeholder="Тойота Королла"
                value={form.values.anonCar}
                onChange={(event) =>
                  form.setFieldValue("anonCar", event.currentTarget.value)
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
function useEffect(arg0: () => any, arg1: any[]) {
  throw new Error("Function not implemented.");
}
