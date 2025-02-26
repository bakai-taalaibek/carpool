export interface RowData {
  role: string;
  name: string | null;
  phone: {
    phoneCode: number;
    phoneNumber: number;
  };
  origin: string;
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

export const posts: RowData[] = [
  {
    role: "Водитель",
    name: "John Doe",
    phone: {
      phoneCode: 1,
      phoneNumber: 1234567890,
    },
    origin: "New York, NY",
    destination: "Washington, D.C.",
    departureDatetime: "2024-09-15T10:00:00Z",
    car: "Toyota Prius",
    seats: 3,
    pricePerSeat: 50,
    pricePerCar: 500,
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
    origin: "London, UK",
    destination: "Manchester, UK",
    departureDatetime: "2024-08-23T07:00:00Z",
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
    origin: "Paris, France",
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
    origin: "Madrid, Spain",
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
    origin: "Berlin, Germany",
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
    origin: "Sydney, Australia",
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
    origin: "Seoul, South Korea",
    destination: "Busan, South Korea",
    departureDatetime: "2024-09-21T06:00:00Z",
    car: "Hyundai Sonata",
    seats: 3,
    pricePerSeat: 35,
    pricePerCar: 350,
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
    origin: "Beijing, China",
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

export interface Comment {
  avatar: string;
  name: string;
  dateTime: string;
  commentText: string;
  id: number;
}

export const comments: Comment[] = [
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    name: "Jacob Warnhalter",
    dateTime: "2024-08-20T15:00:00Z",
    commentText: `This Pokémon likes to lick its palms that are sweetened by being soaked
        in honey. Teddiursa concocts its own honey by blending fruits and pollen
        collected by Beedrill. Blastoise has water spouts that protrude from its
        shell. The water spouts are very accurate.`,
    id: 1,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    name: "Sophia Carter",
    dateTime: "2024-08-21T10:30:00Z",
    commentText: `I love how the game keeps evolving with each new generation! The new Pokémon designs are so creative, and the battle mechanics feel smoother than ever.`,
    id: 2,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
    name: "Liam Thompson",
    dateTime: "2024-08-22T08:45:00Z",
    commentText: `Blastoise is my all-time favorite! I still remember training my first Squirtle back in the day and finally evolving it into this tank of a Pokémon.`,
    id: 3,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
    name: "Emma Johnson",
    dateTime: "2024-08-22T18:20:00Z",
    commentText: `The strategy behind type advantages is what makes Pokémon battles so fun! Fire-types might seem strong, but a well-placed Water attack can turn the tide in an instant.`,
    id: 4,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
    name: "Daniel Evans",
    dateTime: "2024-08-23T12:10:00Z",
    commentText: `I recently replayed Pokémon Gold, and the nostalgia hit so hard. The day-night cycle was such a groundbreaking feature at the time!`,
    id: 5,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
    name: "Olivia Martinez",
    dateTime: "2024-08-24T16:40:00Z",
    commentText: `Teddiursa’s honey-making lore is so cute! The way Pokémon lore builds small ecosystems around them makes the world feel so alive.`,
    id: 6,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    name: "Michael Anderson",
    dateTime: "2024-08-25T14:05:00Z",
    commentText: `The Pokémon anime was my childhood. Seeing Ash finally become a champion was such a full-circle moment after all these years!`,
    id: 7,
  },
];
