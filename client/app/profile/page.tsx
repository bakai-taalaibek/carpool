"use client";
import {
  Button,
  NumberInput,
  SegmentedControl,
  Stack,
  Textarea,
  TextInput,
  Text,
  SimpleGrid,
  Avatar,
  Chip,
  Checkbox,
  Group,
  Box,
  Fieldset,
  Grid,
  Flex,
  Divider,
  Anchor,
  ActionIcon,
  Accordion,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
  Space,
  FileButton,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import {
  IconClock,
  IconEdit,
  IconLogout2,
  IconPencil,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const data = {
  name: "Асан Болотов",
  phone: "0 500 500500",
  email: "bakai.pochta@gmail.com",
  auto: "Toyota Corolla",
  about: "Я опытный водитель",
};

export default function NewPage() {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <Stack maw={600} mx="auto" gap={0} pt={30}>
      <Flex align="start" gap={50} justify="stretch">
        <Stack align="center" gap={5}>
          <Avatar color="blue" radius={100} size={120} />
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => (
              <Button {...props} size="sm" fw={500} variant="transparent">
                Выбрать аватар
              </Button>
            )}
          </FileButton>
        </Stack>
        <div className="grid grid-cols-[auto_1fr] align-items-center gap-x-4 gap-y-1 w-full">
          <Text ta="end" h="36px" lh="36px">
            Имя:
          </Text>
          {isBeingEdited ? (
            <TextInput placeholder="Асан Болотов" />
          ) : (
            <Text h="36px" lh="36px" c="gray.7">
              {data.name}
            </Text>
          )}

          <Text ta="end" h="36px" lh="36px">
            Номер телефона:
          </Text>
          {isBeingEdited ? (
            <TextInput placeholder="0 500 600 700" required />
          ) : (
            <Text h="36px" lh="36px" c="gray.7">
              {data.phone}
            </Text>
          )}
          <Text ta="end" h="36px" lh="36px">
            Почта:
          </Text>
          {isBeingEdited ? (
            <TextInput required placeholder="your.name@email.com" />
          ) : (
            <Text h="36px" lh="36px" c="gray.7">
              {data.email}
            </Text>
          )}
          <Text ta="end" h="36px" lh="36px">
            Авто:
          </Text>

          {isBeingEdited ? (
            <TextInput required placeholder="Тойота Королла" />
          ) : (
            <Text h="36px" lh="36px" c="gray.7">
              {data.auto}
            </Text>
          )}
          <Text ta="end" h="36px" lh="36px">
            О себе:
          </Text>
          {isBeingEdited ? (
            <Textarea required placeholder="Водитель категории В" />
          ) : (
            <Text h="36px" lh="36px" c="gray.7">
              {data.about}
            </Text>
          )}
        </div>

        {isBeingEdited || (
          <ActionIcon
            fw={100}
            color="blue"
            variant="subtle"
            size="md"
            aria-label="Edit"
            onClick={() => setIsBeingEdited(true)}
          >
            <IconPencil />
          </ActionIcon>
        )}
      </Flex>

      <Space h="xs" />

      {isBeingEdited && (
        <Button
          w="fit-content"
          ml="auto"
          variant="filled"
          onClick={() => setIsBeingEdited(false)}
        >
          Сохранить
        </Button>
      )}

      <Divider mt={20} mb={0} />

      <Accordion>
        <AccordionItem value="change-password">
          <AccordionControl>
            <Text fz={18}>Изменить пароль</Text>
          </AccordionControl>
          <AccordionPanel>
            <Button w="max-content" variant="filled" mt={10}>
              Изменить пароль
            </Button>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="exit">
          <AccordionControl>
            <Text fz={18}>Выйти из аккаунта</Text>
          </AccordionControl>
          <AccordionPanel>
            <Button
              leftSection={<IconLogout2 style={{ width: 16, height: 16 }} />}
              w="max-content"
              variant="filled"
              mt={10}
            >
              Выйти из аккаунта
            </Button>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="delete">
          <AccordionControl>
            <Text fz={18}>Удалить аккаунт</Text>
          </AccordionControl>
          <AccordionPanel>
            <Text mb={5} fz={14} mt={5}>
              После удаления аккаунта, его невозможно восстановить
            </Text>
            <Button w="max-content" variant="filled" color="red">
              Удалить аккаунт
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
