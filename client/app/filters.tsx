import {
  Card,
  Group,
  lighten,
  NumberInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../lib/filterSlice";
import { RootState } from "../lib/store";
import { useGetRideRolesQuery } from "../services/rideRolesApi";
import { RideRoleName } from "../types/rideRole";
import { mergeDateAndTimeToISO } from "../utils/dateTime";
import LocalitySelect from "./new/localitySelect";
import OnlyOwnPostsFilterComponent from "./onlyOwnPostsFilterComponent";

const largerVerticalCardSpacing = 16;
const smallerVerticalCardSpacing = 9;
const lineHeightForTextNextToInput = 2;
const cardVerticalPadding = "18 22";

enum RidePostAuthors {
  Any = "Any",
}
type RidePostAuthorVariants =
  | RidePostAuthors.Any
  | RideRoleName.Driver
  | RideRoleName.Passenger;

function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);
  const { data: { rideRoleNameToIdMap, rideRoleIdToNameMap } = {} } =
    useGetRideRolesQuery();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  if (!rideRoleNameToIdMap) return null;

  const handleUpdateRideRole = (value: RidePostAuthorVariants) => {
    const newValue =
      value === RidePostAuthors.Any
        ? undefined
        : rideRoleNameToIdMap[value as RideRoleName];

    dispatch(updateFilter({ ridePostAuthorRoleId: newValue }));
  };

  const getRideRoleValue = () => {
    const id = filters.ridePostAuthorRoleId;
    return id ? rideRoleIdToNameMap?.[id] : RidePostAuthors.Any;
  };

  const handleStartDate = (date: string | null) => {
    setStartDate(date);
    dispatch(
      updateFilter({
        departureStartDateTime: mergeDateAndTimeToISO(date, startTime),
      })
    );
  };

  const handleStartTime = (time: string | null) => {
    setStartTime(time);
    dispatch(
      updateFilter({
        departureStartDateTime: mergeDateAndTimeToISO(startDate, time),
      })
    );
  };

  const handleEndDate = (date: string | null) => {
    setEndDate(date);
    dispatch(
      updateFilter({
        departureEndDateTime: mergeDateAndTimeToISO(date, endTime ?? "23:59"),
      })
    );
  };

  const handleEndTime = (time: string | null) => {
    setEndTime(time);
    dispatch(
      updateFilter({
        departureEndDateTime: mergeDateAndTimeToISO(endDate, time),
      })
    );
  };

  return (
    <Stack
      align="start"
      p="16 18 18 12"
      gap={12}
      bg={lighten("var(--mantine-color-gray-1)", 0.1)}
    >
      <Card w="100%" radius="lg" py={cardVerticalPadding}>
        <Text mb={largerVerticalCardSpacing} fw="500">
          Чьи объявления показать?
        </Text>
        <SegmentedControl
          data={[
            { label: "Всех", value: RidePostAuthors.Any },
            { label: "Водителей", value: RideRoleName.Driver },
            { label: "Пассажиров", value: RideRoleName.Passenger },
          ]}
          value={getRideRoleValue()}
          onChange={(value) =>
            handleUpdateRideRole(value as RidePostAuthorVariants)
          }
        />
      </Card>
      <OnlyOwnPostsFilterComponent
        w="100%"
        radius="lg"
        py={cardVerticalPadding}
        value={filters.onlyOwnRidePosts}
        onChange={(value) =>
          dispatch(updateFilter({ onlyOwnRidePosts: value }))
        }
      />

      <Card w="100%" radius="lg" py={cardVerticalPadding}>
        <Text mb={largerVerticalCardSpacing} fw="500">
          Маршрут:
        </Text>
        <Group gap={8} wrap="nowrap" align="start">
          <Text lh={lineHeightForTextNextToInput}>откуда:</Text>
          <LocalitySelect
            placeholder="Бишкек"
            value={filters.sourceId}
            onChange={(value) => dispatch(updateFilter({ sourceId: value }))}
          />
          <Text lh={lineHeightForTextNextToInput}>куда:</Text>
          <LocalitySelect
            placeholder="Ош"
            value={filters.destinationId}
            onChange={(value) =>
              dispatch(updateFilter({ destinationId: value }))
            }
          />
        </Group>
      </Card>
      <Card w="100%" radius="lg" py={cardVerticalPadding}>
        <Text mb={largerVerticalCardSpacing} fw="500">
          Цена (сомов за место):
        </Text>
        <Group gap={8} wrap="nowrap" align="start">
          <Text lh={lineHeightForTextNextToInput}>от:</Text>
          <NumberInput
            placeholder="0"
            value={filters.minPrice}
            onChange={(value) => {
              dispatch(
                updateFilter({
                  minPrice: value === "" ? undefined : Number(value),
                })
              );
            }}
          />
          <Text lh={lineHeightForTextNextToInput}>до:</Text>
          <NumberInput
            placeholder="500"
            value={filters.maxPrice}
            onChange={(value) => {
              dispatch(
                updateFilter({
                  maxPrice: value === "" ? undefined : Number(value),
                })
              );
            }}
          />
        </Group>
      </Card>
      <Card w="100%" radius="lg" py={cardVerticalPadding}>
        <Text mb={largerVerticalCardSpacing} fw="500">
          С какого дня показать?
        </Text>
        <Group gap={7} wrap="nowrap" align="start">
          <Text lh={lineHeightForTextNextToInput}>день:</Text>
          <DatePickerInput
            clearable
            w="100%"
            valueFormat="D MMM YYYY"
            value={startDate}
            onChange={(value) => {
              handleStartDate(value);
            }}
          />
          <Text lh={lineHeightForTextNextToInput}>время:</Text>
          <Tooltip label="Выберите время после даты">
            <TimePicker
              disabled={!startDate}
              clearable
              withDropdown
              minutesStep={5}
              miw={90}
              styles={{ input: { paddingRight: "30px" } }}
              value={startTime ?? undefined}
              onChange={(value) => {
                handleStartTime(value);
              }}
            />
          </Tooltip>
        </Group>
      </Card>
      <Card w="100%" radius="lg" py={cardVerticalPadding}>
        <Text mb={largerVerticalCardSpacing} fw="500">
          До какого дня?
        </Text>
        <Group gap={7} wrap="nowrap" align="start">
          <Text lh={lineHeightForTextNextToInput}>день:</Text>
          <DatePickerInput
            clearable
            w="100%"
            valueFormat="D MMM YYYY"
            value={endDate}
            onChange={(value) => {
              handleEndDate(value);
            }}
          />
          <Text lh={lineHeightForTextNextToInput}>время:</Text>
          <Tooltip label="Выберите время после даты">
            <TimePicker
              disabled={!endDate}
              clearable
              withDropdown
              minutesStep={5}
              miw={90}
              styles={{ input: { paddingRight: "30px" } }}
              value={endTime ?? undefined}
              onChange={(value) => {
                handleEndTime(value);
              }}
            />
          </Tooltip>
        </Group>
      </Card>
      <Card w="100%" radius="lg" py={cardVerticalPadding}>
        <Text mb={largerVerticalCardSpacing} fw="500">
          Отфильтровать по количеству мест:
        </Text>

        <Group gap={8} wrap="nowrap" align="start">
          <Text lh={lineHeightForTextNextToInput}>минимум:</Text>
          <Tooltip
            label="Будут скрыты объявления, где число мест меньше этой цифры"
            position="bottom"
          >
            <NumberInput
              placeholder="2"
              value={filters.minSeats}
              onChange={(value) =>
                dispatch(
                  updateFilter({
                    minSeats: value === "" ? undefined : Number(value),
                  })
                )
              }
            />
          </Tooltip>
          <Text lh={lineHeightForTextNextToInput}>максимум:</Text>
          <Tooltip
            label="Будут скрыты объявления, где число мест больше этой цифры"
            position="bottom"
          >
            <NumberInput
              placeholder="4"
              value={filters.maxSeats}
              onChange={(value) =>
                dispatch(
                  updateFilter({
                    maxSeats: value === "" ? undefined : Number(value),
                  })
                )
              }
            />
          </Tooltip>
        </Group>
      </Card>
      <Card w="100%" radius="lg" py={cardVerticalPadding}>
        <Text mb={smallerVerticalCardSpacing} fw="500">
          Имя:
        </Text>
        <TextInput
          placeholder="Асан Болотов"
          value={filters.authorName}
          onChange={(event) =>
            dispatch(updateFilter({ authorName: event.currentTarget.value }))
          }
        />
      </Card>
      <Card w="100%" radius="lg" py={cardVerticalPadding}>
        <Text mb={smallerVerticalCardSpacing} fw="500">
          Номер телефона:
        </Text>
        <TextInput
          placeholder="0 500 600 700"
          value={filters.authorPhoneNumber}
          onChange={(event) =>
            dispatch(
              updateFilter({ authorPhoneNumber: event.currentTarget.value })
            )
          }
        />
      </Card>
      <Card w="100%" radius="lg" py={cardVerticalPadding}>
        <Text mb={smallerVerticalCardSpacing} fw="500">
          Комментарий:
        </Text>
        <TextInput
          placeholder="Не курю"
          value={filters.authorComment}
          onChange={(event) =>
            dispatch(updateFilter({ authorComment: event.currentTarget.value }))
          }
        />
      </Card>
    </Stack>
  );
}
export default Filters;
