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
import { posts, RowData } from "./mock";

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
    value: "origin",
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
      <Table.Td>{row.origin}</Table.Td>
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
