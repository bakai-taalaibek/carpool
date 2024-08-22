"use client";
import { useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Box,
  Flex,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const posts: RowData[] = [
  {
    role: "Водитель",
    name: "John Doe",
    phone: {
      phoneCode: 1,
      phoneNumber: 1234567890,
    },
    source: "New York, NY",
    destination: "Washington, D.C.",
    departureDatetime: "2024-09-15T10:00:00Z",
    car: "Toyota Prius",
    seats: 3,
    pricePerSeat: 50,
    pricePerCar: null,
    details: "Non-smoking, luggage space available.",
    postDatetime: "2024-08-20T08:00:00Z",
    lastEditedDatetime: "2024-08-21T12:00:00Z",
    userId: 1001,
    postId: 20230915001,
    isOwnPost: true,
  },
  {
    role: "Пассажир",
    name: null,
    phone: {
      phoneCode: 44,
      phoneNumber: 9876543210,
    },
    source: "London, UK",
    destination: "Manchester, UK",
    departureDatetime: "2024-09-15T14:00:00Z",
    car: null,
    seats: null,
    pricePerSeat: null,
    pricePerCar: null,
    details: null,
    postDatetime: "2024-08-20T09:00:00Z",
    lastEditedDatetime: "2024-08-21T13:00:00Z",
    userId: null,
    postId: 20230916002,
    isOwnPost: false,
  },
  {
    role: "Водитель",
    name: "Alice Johnson",
    phone: {
      phoneCode: 33,
      phoneNumber: 2233445566,
    },
    source: "Paris, France",
    destination: "Marseille, France",
    departureDatetime: "2023-09-17T08:30:00Z",
    car: "Peugeot 208",
    seats: 4,
    pricePerSeat: 25,
    pricePerCar: null,
    details: "No pets, air-conditioned.",
    postDatetime: "2024-08-20T10:00:00Z",
    lastEditedDatetime: "2024-08-21T14:00:00Z",
    userId: 1002,
    postId: 20230917003,
    isOwnPost: false,
  },
  {
    role: "Пассажир",
    name: "Carlos Mendez",
    phone: {
      phoneCode: 34,
      phoneNumber: 7788990011,
    },
    source: "Madrid, Spain",
    destination: "Barcelona, Spain",
    departureDatetime: "2025-09-18T09:00:00Z",
    car: null,
    seats: null,
    pricePerSeat: null,
    pricePerCar: null,
    details: null,
    postDatetime: "2024-08-20T11:00:00Z",
    lastEditedDatetime: "2024-08-21T15:00:00Z",
    userId: null,
    postId: 20230918004,
    isOwnPost: true,
  },
  {
    role: "Водитель",
    name: "Liam Smith",
    phone: {
      phoneCode: 49,
      phoneNumber: 5566778899,
    },
    source: "Berlin, Germany",
    destination: "Hamburg, Germany",
    departureDatetime: "2024-09-19T13:00:00Z",
    car: "Volkswagen Golf",
    seats: 2,
    pricePerSeat: 40,
    pricePerCar: null,
    details: "Comfortable ride, free Wi-Fi.",
    postDatetime: "2024-08-20T12:00:00Z",
    lastEditedDatetime: "2024-08-21T16:00:00Z",
    userId: 1003,
    postId: 20230919005,
    isOwnPost: true,
  },
  {
    role: "Пассажир",
    name: null,
    phone: {
      phoneCode: 61,
      phoneNumber: 6677889900,
    },
    source: "Sydney, Australia",
    destination: "Melbourne, Australia",
    departureDatetime: "2024-09-20T07:30:00Z",
    car: null,
    seats: null,
    pricePerSeat: null,
    pricePerCar: null,
    details: null,
    postDatetime: "2024-08-20T13:00:00Z",
    lastEditedDatetime: "2024-08-21T17:00:00Z",
    userId: null,
    postId: 20230920006,
    isOwnPost: false,
  },
  {
    role: "Водитель",
    name: "Sophia Lee",
    phone: {
      phoneCode: 82,
      phoneNumber: 9988776655,
    },
    source: "Seoul, South Korea",
    destination: "Busan, South Korea",
    departureDatetime: "2024-09-21T06:00:00Z",
    car: "Hyundai Sonata",
    seats: 3,
    pricePerSeat: 35,
    pricePerCar: null,
    details: "Fast trip, limited stops.",
    postDatetime: "2024-08-20T14:00:00Z",
    lastEditedDatetime: "2024-08-21T18:00:00Z",
    userId: 1004,
    postId: 20230921007,
    isOwnPost: true,
  },
  {
    role: "Пассажир",
    name: "Mia Wong",
    phone: {
      phoneCode: 86,
      phoneNumber: 4455667788,
    },
    source: "Beijing, China",
    destination: "Shanghai, China",
    departureDatetime: "2024-09-22T08:00:00Z",
    car: null,
    seats: null,
    pricePerSeat: null,
    pricePerCar: null,
    details: null,
    postDatetime: "2024-08-20T15:00:00Z",
    lastEditedDatetime: "2024-08-21T19:00:00Z",
    userId: null,
    postId: 20230922008,
    isOwnPost: false,
  },
];

interface RowData {
  role: string;
  name: string | null;
  phone: {
    phoneCode: number;
    phoneNumber: number;
  };
  source: string;
  destination: string;
  departureDatetime: string;
  car: string | null;
  seats: number | null;
  pricePerSeat: number | null;
  pricePerCar: number | null;
  details: string | null;
  postDatetime: string;
  lastEditedDatetime: string;
  userId: number | null;
  postId: number;
  isOwnPost: boolean;
}

const headers: { name: string; value: keyof RowData }[] = [
  {
    name: "Кто",
    value: "role",
  },
  {
    name: "Имя",
    value: "name",
  },
  {
    name: "Телефон",
    value: "phone",
  },
  {
    name: "Откуда",
    value: "source",
  },
  {
    name: "Куда",
    value: "destination",
  },
  {
    name: "Когда",
    value: "departureDatetime",
  },
  {
    name: "Цена/место",
    value: "pricePerSeat",
  },
];

interface ThProps {
  children: React.ReactNode;
  isReversed: boolean;
  isCurrentSortingKey: boolean;
  onSort(): void;
}

function Th({ children, isReversed, isCurrentSortingKey, onSort }: ThProps) {
  const Icon = isCurrentSortingKey
    ? isReversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th p={0}>
      <Flex
        w="full"
        p="var(--mantine-spacing-xs) var(--mantine-spacing-md)"
        style={{ cursor: "pointer" }}
        onClick={onSort}
        justify="space-between"
        wrap="wrap"
      >
        <Text fw={500} fz="sm">
          {children}
        </Text>
        <Center>
          <Icon style={{ width: 16, height: 16 }} stroke={1.5} />
        </Center>
      </Flex>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value !== null && value.toString().toLowerCase().includes(query)
    )
  );
}

function sortData({
  data,
  newSortKey,
  isReversed,
  searchString,
}: {
  data: RowData[];
  newSortKey: keyof RowData | null;
  isReversed: boolean;
  searchString: string;
}) {
  if (!newSortKey) {
    return filterData(data, searchString);
  }
  return filterData(
    [...data].sort((a, b) => {
      if (a[newSortKey] === null) {
        return isReversed ? 0 : 1;
      }

      if (b[newSortKey] === null) {
        return isReversed ? 1 : 0;
      }

      const result = a[newSortKey]
        .toString()
        .localeCompare(b[newSortKey].toString());

      return isReversed ? -result : result;
    }),
    searchString
  );
}

export default function HomePage() {
  const [searchString, setSearchString] = useState("");
  const [sortedData, setSortedData] = useState(posts);
  const [sortKey, setSortKey] = useState<keyof RowData | null>(null);
  const [isSortingReversed, setIsSortingReversed] = useState(false);
  const router = useRouter();

  const setSorting = (field: keyof RowData) => {
    const isReversed = field === sortKey ? !isSortingReversed : false;
    setIsSortingReversed(isReversed);
    setSortKey(field);
    setSortedData(
      sortData({
        data: posts,
        newSortKey: field,
        isReversed,
        searchString,
      })
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchString(value);
    setSortedData(
      sortData({
        data: posts,
        newSortKey: sortKey,
        isReversed: isSortingReversed,
        searchString: value,
      })
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr
      key={row.postId}
      style={{ cursor: "pointer" }}
      onClick={() => router.push(`/post/${row.postId}`)}
    >
      <Table.Td>{row.role}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.phone.phoneCode + " " + row.phone.phoneNumber}</Table.Td>
      <Table.Td>{row.source}</Table.Td>
      <Table.Td>{row.destination}</Table.Td>
      <Table.Td>
        {new Date(row.departureDatetime).toLocaleDateString("ru") +
          ", " +
          new Date(row.departureDatetime).toLocaleTimeString("ru", {
            hour: "2-digit",
            minute: "2-digit",
          })}
      </Table.Td>
      <Table.Td style={{ textAlign: "center" }}>
        {row.pricePerSeat && row.pricePerSeat + " сом"}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <ScrollArea>
        <TextInput
          placeholder="Поиск по всем объявлениям"
          mb="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={searchString}
          onChange={handleSearchChange}
        />
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
          highlightOnHover
        >
          <Table.Thead>
            <Table.Tr>
              {headers.map((item) => (
                <Th
                  key={item.value}
                  isCurrentSortingKey={sortKey === item.value}
                  isReversed={isSortingReversed}
                  onSort={() => setSorting(item.value)}
                >
                  {item.name}
                </Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={7}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
}
