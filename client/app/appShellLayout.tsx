"use client";
import "@mantine/core/styles.css";
import React from "react";
import { AppShell, Group, Burger, Text, Button } from "@mantine/core";
import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

export default function AppShellLayout({ children }: { children: any }) {
  const [isSidebarOpened, { toggle: toggleSidebar }] = useDisclosure();

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
            <Text>Poputka.kg</Text>
            <Group gap="10px" visibleFrom="sm">
              <Button
                component={Link}
                href="/new"
                radius="xl"
                variant="gradient"
                gradient={{ from: "orange", to: "red", deg: 90 }}
              >
                + Новая попутка
              </Button>
              <Button variant="subtle" radius="xl">
                Blog
              </Button>
              <Button variant="subtle" radius="xl">
                Contacts
              </Button>
              <Button variant="subtle" radius="xl">
                Support
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
    </AppShell>
  );
}
