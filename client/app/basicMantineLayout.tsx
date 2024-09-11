"use client";
import "@mantine/core/styles.css";
import React from "react";
import { AppShell, Group, Burger, Text, Button } from "@mantine/core";
import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./footer";
import { useScrollIntoView } from "@mantine/hooks";

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
            <Group gap={10} visibleFrom="sm">
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
                radius="xl"
                onClick={() => scrollIntoView()}
              >
                Оставить отзыв
              </Button>
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
