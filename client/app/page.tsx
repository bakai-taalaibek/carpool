"use client";

import {
  AppShell,
  Box,
  Burger,
  Button,
  Flex,
  FloatingArrow,
  Grid,
  GridCol,
  Group,
  Input,
  Modal,
  NumberInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import {
  DatePicker,
  DatePickerInput,
  DateTimePicker,
  TimeInput,
} from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";

export default function HomePage() {
  const [role, setRole] = useState<string>("driver");
  const [isSidebarOpened, { toggle: toggleSidebar }] = useDisclosure();
  const [isNewRideModalOpened, { toggle: toggleNewRideModal }] =
    useDisclosure(false);

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
                radius="xl"
                variant="gradient"
                gradient={{ from: "orange", to: "red", deg: 90 }}
                onClick={toggleNewRideModal}
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

      <AppShell.Main>
        Navbar is only visible on mobile, links that are rendered in the header
        on desktop are hidden on mobile in header and rendered in navbar
        instead.
      </AppShell.Main>

      <Modal
        opened={isNewRideModalOpened}
        onClose={toggleNewRideModal}
        title="Детали вашей поездки:"
      >
        <Stack gap="10px">
          <SegmentedControl
            fullWidth
            value={role}
            onChange={(role) => setRole(role)}
            data={[
              { label: "Я водитель", value: "driver" },
              { label: "Я пассажир", value: "passenger" },
            ]}
          />
          <TextInput label="Имя" placeholder="Асан" />
          <Group grow>
            <TextInput label="Откуда" placeholder="Бишкек" required />
            <TextInput label="Куда" placeholder="Чолпон-Ата" required />
          </Group>
          <Group grow>
            <DatePickerInput label="День" required />
            <TimeInput label="Время" placeholder="Укажите время" required />
          </Group>
          <TextInput
            label="Номер телефона"
            placeholder="0 500 600 700"
            required
          />
          {role === "driver" && (
            <TextInput label="Авто" placeholder="Тойота Королла" />
          )}
          {role === "driver" && (
            <Grid>
              <GridCol span={2.4}>
                <NumberInput label="Мест" placeholder="3" />
              </GridCol>
              <GridCol span={4.8}>
                <NumberInput
                  label="Цена за место, cомов"
                  placeholder="400"
                  hideControls
                />
              </GridCol>
              <GridCol span={4.8}>
                <NumberInput
                  label="Цена за салон, сомов"
                  placeholder="2000"
                  hideControls
                />
              </GridCol>
            </Grid>
          )}

          {/* <TextInput label="Комментарий" /> */}
          <Button mt="10px">Сохранить</Button>
        </Stack>
      </Modal>
    </AppShell>
  );
}
