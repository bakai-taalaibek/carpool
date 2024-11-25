"use client";
import { useToggle, useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
  Modal,
} from "@mantine/core";
import GoogleIcon from "../../public/icons/GoogleIcon";
import Link from "next/link";

export default function AuthenticationForm(props: PaperProps) {
  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },

    validate: {
      email: (val) =>
        /^\S+@\S+$/.test(val) ? null : "Недействительный формат почты",
      password: (val) =>
        val.length <= 6 ? "Минимальная длина пароля - 6 символов" : null,
      passwordConfirmation: (val, values) =>
        val === values.password ? null : "Введенные пароли не совпадают",
      terms: (val) => !val,
    },
  });

  return (
    <Center>
      <Paper radius="md" p="xl" withBorder w={400} shadow="md" {...props}>
        <Text ta="center" fw={900} mb={5} size="xl">
          {type === "register"
            ? "Зарегистрируйтесь с помощью..."
            : "Войдите с помощью..."}
        </Text>
        <Text c="dimmed" size="sm" ta="center" mb={20}>
          {type === "register" ? "Уже есть аккаунт? " : "Еще нет аккаунта? "}
          <Anchor size="sm" component="button" onClick={() => toggle()}>
            {type === "register" ? "Войдите" : "Зарегистрируйтесь"}
          </Anchor>
        </Text>
        <Button
          leftSection={<GoogleIcon />}
          variant="default"
          radius="xl"
          fullWidth
          mb="md"
        >
          Google
        </Button>

        <Divider
          label="Или используйте почту"
          labelPosition="center"
          mt="lg"
          mb="xs"
        />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              required
              label="Почта"
              placeholder="your.name@email.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email}
              radius="md"
            />

            <PasswordInput
              required
              label="Пароль"
              placeholder="Ваш пароль"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password}
              radius="md"
            />

            {type === "register" && (
              <PasswordInput
                required
                label="Подтвердите пароль"
                placeholder="Введите пароль снова"
                value={form.values.passwordConfirmation}
                onChange={(event) =>
                  form.setFieldValue(
                    "passwordConfirmation",
                    event.currentTarget.value
                  )
                }
                error={form.errors.passwordConfirmation}
                radius="md"
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            {type === "register" ? (
              <Checkbox
                label={
                  <>
                    Я принимаю{" "}
                    <Anchor inherit component="button" onClick={openModal}>
                      условия
                    </Anchor>
                  </>
                }
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
                error={form.errors.terms}
              />
            ) : (
              <Anchor
                component={Link}
                href="/auth/restore"
                c="dimmed"
                size="sm"
                ta="start"
              >
                Забыли пароль?
              </Anchor>
            )}

            <Button type="submit">
              {type === "login" ? "Войти" : "Далее"}
            </Button>
          </Group>
        </form>
      </Paper>
      <Modal opened={isModalOpened} onClose={closeModal}>
        zxcvx
      </Modal>
    </Center>
  );
}
