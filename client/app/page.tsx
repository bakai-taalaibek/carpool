import { Box, Table } from "@mantine/core";

const posts = [
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
    departureDatetime: "2024-09-16T14:00:00Z",
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
    departureDatetime: "2024-09-17T08:30:00Z",
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
    departureDatetime: "2024-09-18T09:00:00Z",
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

const tableData = {
  head: [
    "Роль автора",
    "Имя",
    "Телефон",
    "Откуда",
    "Куда",
    "Время выезда",
    "Авто",
    "Мест",
    "Цена/место",
    "Цена/салон",
    // "Детали",
    // "Опубликовано",
    // "Отредактировано",
    // "ID пользователя",
    // "ID объявления",
    // "Мой пост?",
  ],

  body: posts.map((item) => {
    if (item.name === null) {
      (item.name as unknown as string) = "Анонимно";
    }

    item.departureDatetime =
      new Date(item.departureDatetime).toLocaleDateString("ru") +
      " " +
      new Date(item.departureDatetime).toLocaleTimeString("ru", {
        hour: "2-digit",
        minute: "2-digit",
      });

    return Object.values(item)
      .splice(0, 10)
      .map((item) =>
        typeof item === "object" && item !== null
          ? item.phoneCode + " " + item.phoneNumber
          : item
      );
  }),
};

export default function HomePage() {
  return (
    <Box>
      <Table data={tableData} />
    </Box>
  );
}
