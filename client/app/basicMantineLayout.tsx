"use client";
import {
  Anchor,
  AppShell,
  Box,
  Button,
  Drawer,
  Group,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import Footer from "./footer";
import UserMenu from "./userMenu";
import { TermsModal } from "./termsModal";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

export default function BasicMantineLayout({ children }: { children: any }) {
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
    // in mobile viewport on index page I added additional Space to account for sub-header
    // header={{height: 60 }} allocates 60px for Box and substructs 60px from main
    <Provider store={store}>
      <AppShell header={{ height: 60 }}>
        <Box
          h={60}
          w="100%"
          style={{
            position: "absolute",
            top: 0,
            zIndex: 3,
            borderBottom: "1px solid var(--mantine-color-gray-3)",
          }}
          bg="white"
        >
          <Group px="md" h="100%" justify="space-between">
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
              {pathname !== "/new" && (
                <Button
                  component={Link}
                  href="/new"
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red", deg: 90 }}
                  visibleFrom="xs"
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
              <UserMenu />
            </Group>
          </Group>
          {/* only in mobile viewport on index page show sub-header (hiddenFrom="sm") */}
          {pathname === "/" && (
            <Group
              hiddenFrom="xs"
              w="100%"
              bg="gray.0"
              h={45}
              justify="space-evenly"
            >
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
        </Box>

        <AppShell.Main
          style={{
            display: "flex",
            flexDirection: "column",
            paddingInline: 0,
          }}
        >
          <Stack pt={0} style={{ flexGrow: "1" }}>
            {/* in mobile viewport on index page add additional Space to account for sub-header */}
            {pathname === "/" && <Space h={25} hiddenFrom="xs" />}
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
        <TermsModal  
          opened={isTermsModalOpen}
          onClose={closeTermsModal}/>
      </AppShell>
    </Provider>
  );
}
