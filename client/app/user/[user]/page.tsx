"use client";
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Alert,
  Anchor,
  Avatar,
  Button,
  Divider,
  FileButton,
  Flex,
  Group,
  Modal,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertTriangle, IconLogout2 } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useLogout } from "../../../lib/useLogout";

const data = {
  name: "Асан Болотов",
  phone: "0 500 500500",
  email: " bakai_taalaibekuulu@epam.com",
  auto: "Toyota Corolla",
  about: "Я опытный водитель",
};

export default function NewPage() {
  const logoutUser = useLogout();
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    },

    validate: {
      currentPassword: (val) =>
        val.length <= 6 ? "Минимальная длина пароля - 6 символов" : null,
      newPassword: (val) =>
        val.length <= 6 ? "Минимальная длина пароля - 6 символов" : null,
      passwordConfirmation: (val, values) =>
        val === values.newPassword ? null : "Введенные пароли не совпадают",
    },
  });

  return (
    <Stack w="90%" maw={600} mx="auto" gap={0} pt="xl">
      <Flex
        align={{ base: "center", xs: "start" }}
        gap={50}
        justify="stretch"
        direction={{ base: "column", xs: "row" }}
      >
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
        <Stack w="100%">
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
              Телефон:
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
              <TextInput required placeholder="Водитель категории В" />
            ) : (
              <Text h="36px" lh="36px" c="gray.7">
                {data.about}
              </Text>
            )}
          </div>
          {isBeingEdited ? (
            <Group ml="auto">
              <Button
                w="fit-content"
                color="blue"
                variant="outline"
                onClick={() => setIsBeingEdited(false)}
              >
                Отмена
              </Button>
              <Button
                w="fit-content"
                ml="auto"
                variant="filled"
                color="green.7"
                onClick={() => setIsBeingEdited(false)}
              >
                Сохранить
              </Button>
            </Group>
          ) : (
            <Button
              w="fit-content"
              ml="auto"
              variant="filled"
              onClick={() => setIsBeingEdited(true)}
            >
              Редактировать
            </Button>
          )}
        </Stack>
      </Flex>

      <Divider mt={20} mb={0} />

      <Accordion>
        <AccordionItem value="change-password">
          <AccordionControl>
            <Text fz={18}>Изменить пароль</Text>
          </AccordionControl>
          <AccordionPanel>
            <form onSubmit={form.onSubmit(() => {})}>
              <Stack pt={5} gap={12}>
                <PasswordInput
                  required
                  label="Текущий пароль"
                  placeholder="Введите текущий снова"
                  value={form.values.currentPassword}
                  onChange={(event) =>
                    form.setFieldValue(
                      "currentPassword",
                      event.currentTarget.value,
                    )
                  }
                  error={form.errors.currentPassword}
                />

                <PasswordInput
                  required
                  label="Новый пароль"
                  placeholder="Ваш новый пароль"
                  value={form.values.newPassword}
                  onChange={(event) =>
                    form.setFieldValue("newPassword", event.currentTarget.value)
                  }
                  error={form.errors.newPassword}
                />

                <PasswordInput
                  required
                  label="Подтвердите пароль"
                  placeholder="Введите новый пароль снова"
                  value={form.values.passwordConfirmation}
                  onChange={(event) =>
                    form.setFieldValue(
                      "passwordConfirmation",
                      event.currentTarget.value,
                    )
                  }
                  error={form.errors.passwordConfirmation}
                />
              </Stack>

              <Group pb={7} justify="space-between" mt="lg">
                <Anchor
                  component={Link}
                  href="/auth/restore"
                  c="dimmed"
                  size="sm"
                  ta="start"
                >
                  Забыли пароль?
                </Anchor>

                <Button type="submit" w="max-content" variant="filled">
                  Изменить пароль
                </Button>
              </Group>
            </form>
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
              onClick={logoutUser}
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
            <Button
              w="max-content"
              variant="filled"
              color="red"
              onClick={openModal}
            >
              Удалить аккаунт
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Modal
        opened={isModalOpened}
        onClose={closeModal}
        title="Подтвердить удаление аккаунта"
      >
        <Stack>
          <Alert
            variant="light"
            color="red"
            title="Внимание"
            icon={<IconAlertTriangle />}
          >
            После удаления аккаунта, он будет недоступен без возможности
            восстановления
          </Alert>
          <PasswordInput
            required
            label="Ваш пароль"
            placeholder="Введите ваш пароль"
            value={form.values.currentPassword}
            onChange={(event) =>
              form.setFieldValue("currentPassword", event.currentTarget.value)
            }
            error={form.errors.currentPassword}
          />
          <Button w="max-content" variant="filled" color="red">
            Подтвердить удаление аккаунта
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
