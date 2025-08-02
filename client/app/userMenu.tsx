import {
  Avatar,
  Box,
  Button,
  Group,
  Indicator,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Stack,
} from "@mantine/core";
import { IconLogout2, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, setGuest } from "../lib/authSlice";
import { useLogout } from "../lib/useLogout";
import NotificationCustom from "./notificationCustom";

export const notifications = [
  {
    id: 1,
    title: "Ответ на комментарий",
    description: "Привет, меня зовут Паша, сколько мест еще есть?",
    isOpened: false,
  },
  {
    id: 2,
    title: "Комментарий к объявлению",
    description: "Привет, меня зовут Паша, сколько мест еще есть?",
    isOpened: false,
  },
  {
    id: 3,
    title: "Комментарий к объявлению",
    description: "Привет, меня зовут Паша, сколько мест еще есть?",
    isOpened: true,
  },
];

const UserMenu = forwardRef<HTMLDivElement | null>(function Footer(_, ref) {
  const logoutUser = useLogout();
  const dispatch = useDispatch();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const expiresAt = localStorage.getItem("expiresAt");
    const guestId = localStorage.getItem("guestId");

    if (token) {
      dispatch(
        setCredentials({
          token,
          user: user ? JSON.parse(user) : undefined,
          expiresAt: expiresAt || undefined,
        })
      );
    } else if (guestId) {
      dispatch(setGuest(guestId));
    } else {
      const newGuestId = crypto.randomUUID();
      localStorage.setItem("guestId", newGuestId);
      dispatch(setGuest(newGuestId));
    }
  }, [dispatch]);

  return (
    <Box mr={10}>
      <Menu
        shadow="md"
        width={280}
        position="bottom-end"
        opened={isUserMenuOpen}
        onChange={setIsUserMenuOpen}
      >
        <MenuTarget>
          <Indicator
            position="top-end"
            color="red"
            label={2}
            size={16}
            offset={4}
          >
            <Avatar color="blue" radius="xl" style={{ cursor: "pointer" }} />
          </Indicator>
        </MenuTarget>

        <MenuDropdown px={0}>
          <MenuLabel>Таалайбек уулу Бакай</MenuLabel>
          <MenuItem
            leftSection={<IconSettings style={{ width: 14, height: 14 }} />}
            component={Link}
            href="/profile"
          >
            Профиль
          </MenuItem>
          <MenuItem
            leftSection={
              <IconLogout2
                style={{ width: 14, height: 14 }}
                onClick={logoutUser}
              />
            }
          >
            Выйти
          </MenuItem>
          <MenuDivider />
          <MenuLabel pb={0}>Уведомления</MenuLabel>
          <Stack gap={0}>
            <Group w="full">
              <Button
                variant="transparent"
                size="xs"
                color="blue"
                ml="auto"
                h={20}
                mb={5}
              >
                Очистить все
              </Button>
            </Group>
            {notifications.map((item, index) => (
              <NotificationCustom
                key={item.id}
                title={item.title}
                isLast={notifications.length - 1 === index}
              >
                {item.description}
              </NotificationCustom>
            ))}
            <Group justify="center" w="full" py={3}>
              <Button
                onClick={() => setIsUserMenuOpen(false)}
                component={Link}
                href="/notifications"
                variant="light"
                radius="xl"
                color="gray"
                size="xs"
                mt={5}
              >
                Просмотреть все
              </Button>
            </Group>
          </Stack>
        </MenuDropdown>
      </Menu>
    </Box>
  );
});

export default UserMenu;
