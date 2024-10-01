"use client";
import "@mantine/core/styles.css";
import React from "react";
import {
  AppShell,
  Group,
  Burger,
  Text,
  Button,
  Avatar,
  Indicator,
  Menu,
  MenuTarget,
  MenuDropdown,
  MenuLabel,
  MenuItem,
  MenuDivider,
  Box,
  Notification,
  Stack,
} from "@mantine/core";
import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./footer";
import { useScrollIntoView } from "@mantine/hooks";
import { IconLogout2, IconSettings } from "@tabler/icons-react";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

export default function BasicMantineLayout({ children }: { children: any }) {
  const [isSidebarOpened, { toggle: toggleSidebar }] = useDisclosure();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 800,
  });
  const pathname = usePathname();

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
              Poputka.pro
            </Text>
            <Group gap={20} visibleFrom="sm">
              {pathname !== "/new" && (
                <Button
                  component={Link}
                  href="/new"
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red", deg: 90 }}
                >
                  + Новая попутка
                </Button>
              )}
              <Button
                variant="subtle"
                color="cyan"
                radius="xl"
                onClick={() => scrollIntoView()}
              >
                Оставить отзыв
              </Button>
              <Button
                component={Link}
                href="/auth"
                variant="subtle"
                color="cyan"
                radius="xl"
              >
                Войти
              </Button>

              <Box mr={10}>
                <Menu shadow="md" width={250} position="bottom-end">
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

                  <MenuDropdown>
                    <MenuLabel>Таалайбек уулу Бакай</MenuLabel>
                    <MenuItem
                      leftSection={
                        <IconSettings style={{ width: 14, height: 14 }} />
                      }
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
                    <Stack gap={8}>
                      <Group w="full">
                        <Button
                          variant="transparent"
                          size="xs"
                          color="blue"
                          ml="auto"
                          h={20}
                        >
                          Очистить все
                        </Button>
                      </Group>
                      <Notification
                        title="We notify you that"
                        styles={{
                          root: {
                            boxShadow: "0px 0px 8px -5px rgba(0, 0, 0, 0.5)",
                          },
                          title: {
                            fontSize: "12px",
                          },
                          description: {
                            fontSize: "12px",
                          },
                        }}
                      >
                        You are now obligated to give a star to Mantine project
                        on GitHub
                      </Notification>
                      <Notification
                        title="We notify you that"
                        styles={{
                          root: {
                            boxShadow: "0px 0px 8px -5px rgba(0, 0, 0, 0.5)",
                          },
                          title: {
                            fontSize: "12px",
                          },
                          description: {
                            fontSize: "12px",
                          },
                        }}
                      >
                        You are now obligated to give a star to Mantine project
                        on GitHub
                      </Notification>
                      <Notification
                        title="We notify you that"
                        styles={{
                          root: {
                            boxShadow: "0px 0px 8px -5px rgba(0, 0, 0, 0.5)",
                          },
                          title: {
                            fontSize: "12px",
                          },
                          description: {
                            fontSize: "12px",
                          },
                        }}
                      >
                        You are now obligated to give a star to Mantine project
                        on GitHub
                      </Notification>
                      <Group justify="center" w="full">
                        <Button
                          variant="light"
                          radius="xl"
                          color="gray"
                          size="xs"
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

      <AppShell.Navbar py="md" px={4}>
        <Button>Home</Button>
        <Button>Blog</Button>
        <Button>Contacts</Button>
        <Button>Support</Button>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
      <Footer ref={targetRef} />
    </AppShell>
  );
}
