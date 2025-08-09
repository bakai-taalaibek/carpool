"use client";
import {
  Avatar,
  Box,
  Button,
  Center,
  CheckIcon,
  Drawer,
  Flex,
  Group,
  HoverCard,
  Pagination,
  Select,
  Space,
  Stack,
  Switch,
  Text,
  TextProps,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconAdjustments,
  IconArrowNarrowRight,
  IconArrowsSort,
  IconCar,
  IconClearAll,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, HTMLAttributes, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, updateFilter } from "../lib/filterSlice";
import { RootState } from "../lib/store";
import { useGetLocalitiesQuery } from "../services/localitiesApi";
import {
  useDeleteRidePostMutation,
  useGetRidePostsQuery,
} from "../services/ridePostsApi";
import { useGetRideRolesQuery } from "../services/rideRolesApi";
import { useGetSortingOptionsQuery } from "../services/sortingOptionsApi";
import { RideRoleName } from "../types/rideRole";
import { normalizeRuWords } from "../utils/normalizeRuWords";
import { useDebounce } from "../utils/useDebounce";
import Filters from "./filters";

const tableRowBorderRadius = "8px";

export default function HomePage() {
  const { data: sortingOptions } = useGetSortingOptionsQuery();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);
  const debouncedFilters = useDebounce(filters, 500);
  const { data: ridePosts } = useGetRidePostsQuery(debouncedFilters);
  const router = useRouter();
  const { data: localities } = useGetLocalitiesQuery();
  const isLg = useMediaQuery(`(min-width: 1200px)`);
  const [isFilterDrawerOpen, { toggle: toggleFilterDrawer }] =
    useDisclosure(false);
  const pathname = usePathname();

  const { data: { rideRoleNameToIdMap } = {} } = useGetRideRolesQuery();

  dayjs.locale("ru");
  dayjs.extend(relativeTime);

  if (!rideRoleNameToIdMap) return null;

  const isDriver = (id?: number) => {
    return id === rideRoleNameToIdMap[RideRoleName.Driver];
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const LocationInfo = ({
    ridePostId,
    leftLeaning,
    ...props
  }: { ridePostId?: number; leftLeaning?: boolean } & TextProps) => {
    const locality = localities?.find((l) => l.id === ridePostId);

    if (!locality) return null;

    return (
      <HoverCard shadow="md">
        <HoverCard.Target>
          <Group
            gap={4}
            style={{ flexDirection: leftLeaning ? "row" : "row-reverse" }}
            ml={leftLeaning ? "" : "auto"}
          >
            <Box fz={15} style={{ textWrap: "nowrap" }} {...props}>
              {locality.name}
            </Box>
            <Box
              fz={14}
              ml="auto"
              className="text-slate-400 rounded-md"
              bg="violet.0"
              p="0 4"
              ta="center"
            >
              {locality.regionName?.slice(0, 2)}
            </Box>
          </Group>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack gap={0}>
            <Text c="gray.6" fz={13}>
              {locality.regionName
                ? locality.regionName + " область"
                : "город республиканского значения"}
            </Text>
            <Text c="gray.5" fz={13}>
              {locality.districtName && locality.districtName + " район"}
            </Text>
            <Text c="gray.5" fs="italic" fz={13}>
              {locality.aimakName && locality.aimakName + " аймак"}
            </Text>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    );
  };

  const ClickableItem = ({
    ridePostId,
    children,
    ...props
  }: {
    ridePostId: number;
    children: React.ReactNode;
  } & HTMLAttributes<HTMLDivElement>) => (
    <Flex
      align="center"
      bg="white"
      style={{
        cursor: "pointer",
      }}
      onClick={() => router.push(`/post/${ridePostId}`)}
      {...props}
    >
      {children}
    </Flex>
  );

  return (
    <Stack className="bg-blue-50" py="md" gap={25} style={{ flexGrow: "1" }}>
      <Group mx={20}>
        <Select
          w={140}
          radius="lg"
          styles={{
            input: {
              fontSize: 13,
              height: 37,
              border: "transparent",
            },
          }}
          rightSection={<IconArrowsSort size={20} />}
          data={sortingOptions?.map((i) => ({
            value: i.value,
            label: i.label,
          }))}
          checkIconPosition="right"
          value={filters.sort?.toString()}
          onChange={(sort) =>
            dispatch(updateFilter({ sort: sort ?? undefined }))
          }
        />
        <Button
          h={37}
          fz={13}
          px={11}
          radius="lg"
          fw={400}
          c="black"
          bg="white"
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch(
              updateFilter({ onlyOwnRidePosts: !filters.onlyOwnRidePosts })
            )
          }
        >
          <Switch
            mr={7}
            size="xs"
            checked={filters.onlyOwnRidePosts}
            style={{ pointerEvents: "none" }}
          />
          Только мои
        </Button>

        <Button
          h={37}
          fz={13}
          px={11}
          ml="auto"
          radius="lg"
          fw={400}
          c="black"
          bg="white"
          rightSection={<IconAdjustments color="gray" size={20} />}
          onClick={() => toggleFilterDrawer()}
        >
          Все фильтры
        </Button>
        <Button
          h={37}
          fz={13}
          px={11}
          radius="lg"
          fw={400}
          c="black"
          bg="white"
          rightSection={<IconClearAll color="gray" size={20} />}
          onClick={() => handleReset()}
        >
          Сбросить всё
        </Button>
      </Group>

      <Box
        style={{
          display: "grid",
          rowGap: 12,
          gridTemplateColumns: `${
            isLg
              ? ` max-content 
              minmax(18px, 3fr) 
              auto 
              minmax(18px, 1fr) 
              max-content 
              minmax(18px, 3fr) 
              max-content 
              max-content 
              minmax(18px, 4fr) 
              auto 
              minmax(18px, 4fr) 
              max-content`
              : ` max-content 
              minmax(18px, 3fr) 
              auto 
              minmax(18px, 2fr) 
              max-content 
              minmax(18px, 3fr) 
              max-content 
              max-content 
              minmax(18px, 3fr) 
              auto 
              minmax(18px, 3fr) 
              max-content`
          }`,
        }}
        mx={20}
      >
        {ridePosts?.ridePosts.map((i) => (
          <Fragment key={i.id}>
            {/* had to use Flex because using ClickableItem caused flickering
             of pictures on filters updates, memoisation didn't solve the problem */}
            <Flex
              align="center"
              bg="white"
              style={{
                cursor: "pointer",
                borderRadius: `${tableRowBorderRadius} 0 0 ${tableRowBorderRadius}`,
              }}
              onClick={() => router.push(`/post/${i.id}`)}
            >
              <Avatar
                pl={14}
                src={
                  isDriver(i.rideRoleId) ? "/driver8.jpg" : "/passenger2.jpg"
                }
                w={`${isLg ? 40 : 45}`}
                h={`${isLg ? 25 : 30}`}
                radius="sm"
              />
            </Flex>
            <ClickableItem ridePostId={i.id}>
              <Space />
            </ClickableItem>
            <ClickableItem ridePostId={i.id}>
              <Flex
                m="auto"
                rowGap={0}
                justify="end"
                align="center"
                direction={{ base: "column", lg: "row" }}
                columnGap={7}
              >
                <Box
                  fz={15}
                  style={{ fontWeight: 400, whiteSpace: "nowrap" }}
                  className={"text-sky-700"}
                >
                  {dayjs(i.departureDateTime).format("D MMMM YYYY")}
                </Box>
                <Box
                  ta={{ base: "center", lg: "center" }}
                  c="gray.6"
                  fz={14}
                  style={{ width: "fit-content" }}
                  miw={80}
                  lh={1.3}
                >
                  {dayjs(i.departureDateTime).format("dddd")}
                </Box>
              </Flex>
            </ClickableItem>
            <ClickableItem ridePostId={i.id}>
              <Space />
            </ClickableItem>
            <ClickableItem ridePostId={i.id}>
              <Group
                mx="auto"
                gap={7}
                justify="center"
                align="center"
                wrap="nowrap"
                my={{ base: 16, lg: 8 }}
              >
                <Box fz={18} className="text-sky-700">
                  {dayjs(i.departureDateTime).format("H:mm")}
                </Box>
                <Text fz={12} mt={2}>
                  🕓
                </Text>
              </Group>
            </ClickableItem>
            <ClickableItem ridePostId={i.id}>
              <Space />
            </ClickableItem>
            <ClickableItem ridePostId={i.id}>
              <LocationInfo
                ml="auto"
                ridePostId={i.sourceId}
                className="text-slate-700 rounded-md"
                bg="yellow.0"
                p="0 8"
                fz={15}
                ta="center"
              />
            </ClickableItem>
            <ClickableItem ridePostId={i.id}>
              <Group gap={4} pl={4} wrap="nowrap" w="100%">
                <IconArrowNarrowRight
                  size={24}
                  color="var(--mantine-color-indigo-2)"
                />
                <LocationInfo
                  ridePostId={i.destinationId}
                  className="text-zinc-600 rounded-md"
                  bg="blue.0"
                  p="0 8"
                  fz={15}
                  ta="center"
                  leftLeaning
                />
              </Group>
            </ClickableItem>
            <ClickableItem ridePostId={i.id}>
              <Space />
            </ClickableItem>
            <ClickableItem ridePostId={i.id}>
              {i.pricePerSeat ? (
                <Flex
                  ml="auto"
                  direction={{ base: "column", lg: "row" }}
                  justify="end"
                  align={{ base: "center", lg: "center" }}
                  columnGap={7}
                  rowGap={0}
                >
                  <Group gap={5} wrap="nowrap">
                    <Text lh={1.4} fz={17} c="yellow.8" fw={500}>
                      {i.pricePerSeat}
                    </Text>
                    <Text fz={14} c="gray.7" style={{ textWrap: "nowrap" }}>
                      сом / место
                    </Text>
                  </Group>
                  <Text
                    fz={14}
                    c="gray.5"
                    fw={500}
                    miw={63}
                    ta={{ base: "end", lg: "center" }}
                    lh={1.4}
                  >
                    {normalizeRuWords(i.seats, "место")}
                  </Text>
                </Flex>
              ) : (
                <Center fs="italic" c="gray.4" fz={14} mx="auto">
                  не указано
                </Center>
              )}
            </ClickableItem>
            <ClickableItem ridePostId={i.id}>
              <Space />
            </ClickableItem>
            <ClickableItem
              ridePostId={i.id}
              style={{
                borderRadius: `0 ${tableRowBorderRadius} ${tableRowBorderRadius} 0`,
              }}
            >
              <Flex
                justify="center"
                columnGap={7}
                rowGap={4}
                align="center"
                m="auto"
                pr={14}
                direction={{ base: "column", lg: "row" }}
              >
                {i.anonCar ? (
                  <Group wrap="nowrap" gap={5}>
                    <IconCar
                      color="var(--mantine-color-gray-6)"
                      stroke={1.5}
                      size={14}
                    />
                    <Text c="gray.7" fz={14}>
                      {i.anonCar}
                    </Text>
                  </Group>
                ) : (
                  <Center fs="italic" c="gray.4" fz={14} mx="auto">
                    не указано
                  </Center>
                )}
              </Flex>
            </ClickableItem>
          </Fragment>
        ))}
      </Box>
      {/* <Table
        withRowBorders={false}
        style={{ borderSpacing: "0 12px", borderCollapse: "separate" }}
        px={12}
        // horizontalSpacing="sm"
      >
        <Table.Tbody>
          {ridePosts?.ridePosts.map((i) => (
            <Table.Tr
              bg="white"
              style={{
                boxShadow: "0 1px 8px rgba(236, 236, 236, 1)",
                borderRadius: "12px",
              }}
            >
              <Table.Td
                style={{
                  width: "3%",
                  whiteSpace: "nowrap",
                  borderRadius: `${tableRowBorderRadius} 0 0 ${tableRowBorderRadius}`,
                }}
              >
                <Stack
                  ml={8}
                  align="center"
                  w="fit-content"
                  gap={isDriver(i.rideRoleId) ? 0 : 5}
                >
                  <Avatar
                    src={
                      isDriver(i.rideRoleId)
                        ? "/driver8.jpg"
                        : "/passenger2.jpg"
                    }
                    size={40}
                    radius="sm"
                  />
                  <Text fz={12} className={"text-gray-600"}>
                    {isDriver(i.rideRoleId)
                      ? RideRoleNameRu.Driver
                      : RideRoleNameRu.Passenger}
                  </Text>
                </Stack>
              </Table.Td>

              <Table.Td
                pr={0}
                style={{
                  width: "3%",
                  whiteSpace: "nowrap",
                }}
              >
                {getLocalityInfo(i.sourceId, true)}
              </Table.Td>
              <Table.Td pl={8} w="1%">
                <Group gap={8} align="start" justify="start" wrap="nowrap">
                  <IconArrowNarrowRight
                    style={{ transform: "translateY(-1px)" }}
                    color="var(--mantine-color-indigo-3)"
                  />
                  {getLocalityInfo(i.destinationId)}
                </Group>
              </Table.Td>

              <Table.Td
                style={{
                  width: "3%",
                  whiteSpace: "nowrap",
                }}
              >
                <Center>
                  <Group gap={7} justify="end" wrap="nowrap">
                    <Box fz={18} fw={400} className="text-sky-600">
                      {dayjs(i.departureDateTime).format("H:mm")}
                    </Box>
                    <Text fz={12} mt={2}>
                      🕓
                    </Text>
                    
                  </Group>
                </Center>
              </Table.Td>

              <Table.Td
                style={{
                  width: "3%",
                  whiteSpace: "nowrap",
                }}
              >
                <Stack gap={2}>
                  <Group gap={4}>
                    <Text
                      fz={14}
                      style={{ fontWeight: 500, textWrap: "nowrap" }}
                      c="gray.7"
                    >
                      {dayjs(i.departureDateTime).format("D MMMM YYYY")}
                    </Text>
                    <Text fz={14} style={{ fontWeight: 400 }} c="gray.7">
                      {dayjs(i.departureDateTime).format(" (dddd)")}
                    </Text>
                  </Group>
                  <Text c="gray.6" fz={14} w="fit-content">
                    {dayjs(i.departureDateTime).fromNow()}
                  </Text>
                </Stack>
              </Table.Td>

              <Table.Td
                style={{
                  width: "3%",
                  whiteSpace: "nowrap",
                }}
              >
                {i.pricePerSeat && (
                  <Group gap={5} wrap="nowrap">
                    <Text>{i.pricePerSeat}</Text>
                    <Text style={{ textWrap: "nowrap" }}>сом / место</Text>
                  </Group>
                )}
              </Table.Td>

              <Table.Td
                style={{
                  width: "1%",
                  whiteSpace: "nowrap",
                  borderRadius: `0 ${tableRowBorderRadius} ${tableRowBorderRadius} 0`,
                }}
              >
                <Stack gap={3} mr={8}>
                  <Text c="gray.7" fz={15}>
                    {i.anonName}
                  </Text>
                  <Group wrap="nowrap" gap={9}>
                    <IconPhoneCall stroke={1.5} size={16} />
                    <Text fz="sm" c="blue">
                      {i.anonPhone}
                    </Text>
                  </Group>
                </Stack>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table> */}
      <Group mx={20} mb={10}>
        <Pagination
          mr="auto"
          size="sm"
          value={ridePosts?.currentPage}
          onChange={(page) => dispatch(updateFilter({ page }))}
          total={ridePosts?.totalPages || 1}
        />
        <Text fz={14} c="gray.7">
          Объявлений на странице:
        </Text>
        <Select
          size="xs"
          w={60}
          data={["6", "20", "40"]}
          value={filters.pageSize?.toString()}
          onChange={(pageSize) =>
            dispatch(
              updateFilter({ pageSize: Number.parseInt(pageSize || "") })
            )
          }
        />
      </Group>
      <Drawer
        opened={isFilterDrawerOpen && pathname == "/"}
        onClose={toggleFilterDrawer}
        title={<Text fz={20}>Фильтры</Text>}
        position="right"
        styles={{
          body: { padding: 0 },
          header: {
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            minHeight: "50px",
            maxHeight: "50px",
          },
        }}
        size="md"
      >
        <Filters />
      </Drawer>
    </Stack>
  );
}
