"use client";
import {
  Button,
  CheckIcon,
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
import { notifications } from "@mantine/notifications";
import { IconClock } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCreateRidePostMutation } from "../../services/ridePostsApi";
import { useGetRideRolesQuery } from "../../services/rideRolesApi";
import { RidePostCreateDto } from "../../types/ridePost";
import { RideRoleName } from "../../types/rideRole";
import LocalitySelect from "./localitySelect";

type RidePostFormValues = Omit<RidePostCreateDto, "departureDateTime"> & {
  departureDate: string;
  departureTime: string;
};

export default function NewPage() {
  const router = useRouter();
  const [createRidePost] = useCreateRidePostMutation();
  const { data: rideRoles } = useGetRideRolesQuery();
  const rideRoleIdToNameMap =
    rideRoles?.reduce<Record<number, RideRoleName>>((acc, i) => {
      acc[i.id] = i.name;
      return acc;
    }, {} as Record<number, RideRoleName>) ??
    ({} as Record<number, RideRoleName>);

  const rideRoleNameToIdMap =
    rideRoles?.reduce<Record<RideRoleName, number>>((acc, i) => {
      acc[i.name] = i.id;
      return acc;
    }, {} as Record<RideRoleName, number>) ??
    ({} as Record<RideRoleName, number>);

  const form = useForm<RidePostFormValues>({
    initialValues: {
      rideRoleId: rideRoleNameToIdMap["Driver"],
      sourceId: undefined,
      destinationId: undefined,
      departureDate: new Date().toString(),
      departureTime: "",
      seats: undefined,
      pricePerSeat: undefined,
      pricePerCar: undefined,
      comment: "",
      anonName: "",
      anonPhone: "",
      anonCar: "",
    },

    validate: {
      seats: (val, values) =>
        values.rideRoleId === rideRoleNameToIdMap["Passenger"] ||
        (val && val > 0)
          ? null
          : "Недействительное количество мест",
    },
  });

  useEffect(() => {
    form.setValues({
      ...form.values,
      rideRoleId: rideRoleNameToIdMap["Driver"],
    });
  }, [rideRoles]);

  const handleSubmit = async (values: typeof form.values) => {
    const date = new Date(values.departureDate);
    const [hours, minutes] = values.departureTime.split(":").map(Number);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const departureDateTime = date.toISOString();

    try {
      await createRidePost({ ...values, departureDateTime }).unwrap();

      notifications.show({
        message: "Объявление успешно создано",
        color: "teal",
        title: "Успех!",
        position: "top-right",
        icon: <CheckIcon size={20} />,
      });
      form.reset();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack w="80%" maw={600} mx="auto" mb={50} gap={33}>
        <Text fz={{ base: 16, xs: 18, sm: 20 }}>
          Укажите детали вашей поездки:
        </Text>
        <SegmentedControl
          value={rideRoleIdToNameMap[form.values.rideRoleId]}
          data={[
            { label: "Я водитель", value: "Driver" },
            { label: "Я пассажир", value: "Passenger" },
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
        {form.values.rideRoleId === rideRoleNameToIdMap["Driver"] && (
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
                value={form.values.seats}
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
                value={form.values.pricePerSeat}
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
                value={form.values.pricePerCar}
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
        <Button type="submit">Разместить объявление</Button>
      </Stack>
    </form>
  );
}
