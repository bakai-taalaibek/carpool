"use client";
import {
  Anchor,
  AppShell,
  Avatar,
  Box,
  Burger,
  Button,
  Drawer,
  Flex,
  Group,
  Indicator,
  lighten,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import {
  IconFilterSearch,
  IconLogout2,
  IconSettings,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Filters from "./filters";
import Footer from "./footer";
import NotificationCustom from "./notificationCustom";
import { TermsContent } from "./termsContent";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

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

export default function BasicMantineLayout({ children }: { children: any }) {
  const [isSidebarOpened, { toggle: toggleSidebar }] = useDisclosure();
  const [isFilterOpened, { toggle: toggleFilter }] = useDisclosure(false);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 800,
  });
  const pathname = usePathname();
  const [avatarMenuOpened, setAvatarMenuOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  useEffect(() => {
    const lastVisited = localStorage.getItem("lastVisitedPoputka");

    if (!lastVisited || !dayjs(lastVisited).isSame(dayjs(), "day")) {
      localStorage.setItem("lastVisitedPoputka", dayjs().toISOString());
    }

    setTimeout(() => {
      if (dayjs().diff(lastVisited, "days") > 1) {
        setDrawerOpened(true);
      }
    }, 50);
  }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !isSidebarOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={isSidebarOpened}
            onClick={toggleSidebar}
            hiddenFrom="sm"
            size="sm"
          />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Text
              component={Link}
              href="/"
              tt="uppercase"
              c="cyan.8"
              fw={700}
              size="lg"
            >
              POPUTKA.KG
            </Text>
            <Group gap={20}>
              {pathname == "/" && (
                <Button
                  // className="[&_*[data-position='left']]:[margin-inline-end:8px]"
                  variant="subtle"
                  color="cyan"
                  onClick={toggleFilter}
                  radius="xl"
                  leftSection={<IconFilterSearch size={22} />}
                  visibleFrom="sm"
                >
                  Фильтры
                </Button>
              )}
              {pathname !== "/new" && (
                <Button
                  component={Link}
                  href="/new"
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red", deg: 90 }}
                  visibleFrom="sm"
                >
                  + Новая попутка
                </Button>
              )}
              <Button
                variant="subtle"
                color="cyan"
                radius="xl"
                onClick={() => scrollIntoView()}
                visibleFrom="sm"
              >
                Оставить отзыв
              </Button>
              <Button
                component={Link}
                href="/auth"
                variant="subtle"
                color="cyan"
                radius="xl"
                visibleFrom="sm"
              >
                Войти
              </Button>

              <Box mr={10}>
                <Menu
                  shadow="md"
                  width={280}
                  position="bottom-end"
                  opened={avatarMenuOpened}
                  onChange={setAvatarMenuOpened}
                >
                  <MenuTarget>
                    <Indicator
                      position="top-end"
                      color="red"
                      label={2}
                      size={16}
                      offset={4}
                    >
                      <Avatar
                        color="blue"
                        radius="xl"
                        style={{ cursor: "pointer" }}
                      />
                    </Indicator>
                  </MenuTarget>

                  <MenuDropdown px={0}>
                    <MenuLabel>Таалайбек уулу Бакай</MenuLabel>
                    <MenuItem
                      leftSection={
                        <IconSettings style={{ width: 14, height: 14 }} />
                      }
                      component={Link}
                      href="/profile"
                    >
                      Профиль
                    </MenuItem>
                    <MenuItem
                      leftSection={
                        <IconLogout2 style={{ width: 14, height: 14 }} />
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
                        // <Notification
                        //   key={item.id}
                        //   title={item.title}
                        //   styles={{
                        //     root: {
                        //       boxShadow: "none",
                        //     },
                        //     title: {
                        //       fontSize: "12px",
                        //     },
                        //     description: {
                        //       fontSize: "12px",
                        //     },
                        //   }}
                        // >
                        //   {item.description}
                        // </Notification>
                        <NotificationCustom
                          key={item.id}
                          title={item.title}
                          isLast={notifications.length - 1 === index}
                        >
                          {item.description}
                        </NotificationCustom>
                      ))}
                      <Group
                        justify="center"
                        w="full"
                        // style={{
                        //   borderTop: "1px solid var(--mantine-color-gray-2)",
                        // }}
                        py={3}
                      >
                        <Button
                          onClick={() => setAvatarMenuOpened(false)}
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
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="lg" px={4}>
        <Stack align="center">
          {pathname !== "/new" && (
            <Button
              component={Link}
              href="/new"
              radius="xl"
              variant="gradient"
              gradient={{ from: "orange", to: "red", deg: 90 }}
              onClick={() => toggleSidebar()}
            >
              + Новая попутка
            </Button>
          )}
          {pathname == "/" && (
            <Button
              // className="[&_*[data-position='left']]:[margin-inline-end:8px]"
              variant="subtle"
              color="cyan"
              onClick={() => {
                toggleFilter();
                toggleSidebar();
              }}
              radius="xl"
              leftSection={<IconFilterSearch size={22} />}
            >
              Фильтры
            </Button>
          )}

          <Button
            variant="subtle"
            color="cyan"
            radius="xl"
            onClick={() => {
              scrollIntoView();
              toggleSidebar();
            }}
          >
            Оставить отзыв
          </Button>
          <Button
            component={Link}
            href="/auth"
            variant="subtle"
            color="cyan"
            radius="xl"
            onClick={() => toggleSidebar()}
          >
            Войти
          </Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          display: "flex",
          flexDirection: "column",
          paddingInline: 0,
        }}
      >
        <Drawer
          opened={isFilterOpened && pathname == "/"}
          onClose={toggleFilter}
          title={<Text fz={20}>Фильтры</Text>}
          position="right"
          styles={{
            body: { padding: 0 },
            header: {
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              minHeight: "50px",
              maxHeight: "50px",
              // backgroundColor: lighten("var(--mantine-color-indigo-0)", 0.2),
            },
          }}
          size="sm"
        >
          <Filters />
        </Drawer>
        <Flex justify="center" style={{ flexGrow: "1" }}>
          {children}
        </Flex>
      </AppShell.Main>
      <Footer ref={targetRef} />
      <Drawer
        opened={drawerOpened}
        withCloseButton={false}
        size="28%"
        onClose={() => setDrawerOpened(false)}
        position="bottom"
        title={
          <Text fz={24} fw={700} lh={1} c="blue.6">
            Добро пожаловать на платформу POPUTKA.KG
          </Text>
        }
        closeOnClickOutside={false}
        closeOnEscape={false}
        styles={{
          content: {
            display: "flex",
            flexDirection: "column",
          },
          body: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
          },
        }}
      >
        <Text>
          Продолжая использовать наш ресурс Вы выражаете согласие с нашими{" "}
          <Anchor inherit component="button" onClick={openModal}>
            условиями
          </Anchor>
          .
        </Text>
        <Button data-autofocus onClick={() => setDrawerOpened(false)}>
          Понятно
        </Button>
      </Drawer>
      <Modal
        size="xl"
        opened={isModalOpened}
        onClose={closeModal}
        title={
          <Text fw="600" fz="18">
            Условия использования платформы POPUTKA.KG
          </Text>
        }
      >
        <TermsContent />
      </Modal>
    </AppShell>
  );
}
