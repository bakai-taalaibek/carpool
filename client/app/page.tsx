"use client";

import {
  AppShell,
  Burger,
  Button,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function HomePage() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Text>Poputka.kg</Text>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <Button variant="subtle">Home</Button>
              <Button variant="subtle">+ Новая попутка</Button>
              <Button variant="subtle">Blog</Button>
              <Button variant="subtle">Contacts</Button>
              <Button variant="subtle">Support</Button>
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

      <AppShell.Main>
        Navbar is only visible on mobile, links that are rendered in the header
        on desktop are hidden on mobile in header and rendered in navbar
        instead.
      </AppShell.Main>
    </AppShell>
  );
}
