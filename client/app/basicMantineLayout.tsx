"use client";
import {
  Anchor,
  AppShell,
  Avatar,
  Box,
  Button,
  Drawer,
  Group,
  Indicator,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Modal,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import {
  IconFilterSearch,
  IconLogout2,
  IconPlus,
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
  const [isFilterDrawerOpen, { toggle: toggleFilterDrawer }] =
    useDisclosure(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isTermsDrawerOpen, setIsTermsDrawerOpen] = useState(false);
  const [isTermsModalOpen, { open: openTermsModal, close: closeTermsModal }] =
    useDisclosure(false);

  const { scrollIntoView: scrollFooterIntoView, targetRef: footerTargetRef } =
    useScrollIntoView<HTMLDivElement>({
      duration: 800,
    });

  const pathname = usePathname();

  useEffect(() => {
    const lastVisited = localStorage.getItem("lastVisitedPoputka");

    if (!lastVisited || !dayjs(lastVisited).isSame(dayjs(), "day")) {
      localStorage.setItem("lastVisitedPoputka", dayjs().toISOString());
    }

    setTimeout(() => {
      if (dayjs().diff(lastVisited, "days") > 1) {
        setIsTermsDrawerOpen(true);
      }
    }, 50);
  }, []);

  return (
    // height: 60 is the height of header,
    // padding="md" is applied to all pages, it is the distance from header to main
    // in mobile viewport on index page, there is additional Space to account to sub-header
    // for some reason when sub-header exists, header border is hidden, which is desired
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group
          h="100%"
          px="md"
          bg="white"
          style={{ zIndex: 2, position: "relative" }}
        >
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
                  onClick={toggleFilterDrawer}
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
                onClick={() => scrollFooterIntoView()}
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
              >
                Войти
              </Button>

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
            </Group>
          </Group>
        </Group>
        {/* only in mobile viewport on index page show sub-header */}
        {pathname === "/" && (
          <Group
            hiddenFrom="sm"
            w="100%"
            bg="gray.0"
            h={45}
            justify="space-evenly"
          >
            <Button
              // className="[&_*[data-position='left']]:[margin-inline-end:8px]"
              variant="subtle"
              color="cyan"
              onClick={() => toggleFilterDrawer()}
              radius="xl"
              leftSection={<IconFilterSearch size={22} />}
            >
              Фильтры
            </Button>
            <Button
              className="[&_*[data-position='left']]:[margin-inline-end:6px]"
              component={Link}
              href="/new"
              radius="xl"
              variant="subtle"
              color="cyan"
              leftSection={<IconPlus />}
            >
              Новая попутка
            </Button>
          </Group>
        )}
      </AppShell.Header>

      <AppShell.Main
        style={{
          display: "flex",
          flexDirection: "column",
          paddingInline: 0,
        }}
      >
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
          size="sm"
        >
          <Filters />
        </Drawer>
        <Stack pt={0} style={{ flexGrow: "1" }}>
          {/* in mobile viewport on index page add additional Space to account for sub-header */}
          {pathname === "/" && <Space h={25} hiddenFrom="sm" />}
          {children}
        </Stack>
      </AppShell.Main>
      <Footer ref={footerTargetRef} />
      <Drawer
        opened={isTermsDrawerOpen}
        withCloseButton={false}
        size="28%"
        onClose={() => setIsTermsDrawerOpen(false)}
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
          <Anchor inherit component="button" onClick={openTermsModal}>
            условиями
          </Anchor>
          .
        </Text>
        <Button data-autofocus onClick={() => setIsTermsDrawerOpen(false)}>
          Понятно
        </Button>
      </Drawer>
      <Modal
        size="xl"
        opened={isTermsModalOpen}
        onClose={closeTermsModal}
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
