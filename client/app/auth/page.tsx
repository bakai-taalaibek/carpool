"use client";
import { useToggle, upperFirst } from "@mantine/hooks";
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
  Title,
} from "@mantine/core";
import GoogleIcon from "../../public/icons/GoogleIcon";
import Link from "next/link";

export default function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <Center
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        paddingTop: 40,
      }}
    >
      <Paper radius="md" p="xl" withBorder w={400} shadow="md" {...props}>
        <Text ta="center" fw={900} mb={5} size="xl">
          {type === "register"
            ? "Зарегистрируйтесь с помощью..."
            : "Войдите с помощью..."}
        </Text>
        <Text c="dimmed" size="sm" ta="center" mb={20}>
          {type === "register" ? "Уже есть аккаунт? " : "Нет аккаунта? "}
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
            {type === "register" && (
              <TextInput
                label="Имя"
                placeholder="Ваше имя"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Почта"
              placeholder="your.name@email.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Недействительная почта"}
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
              error={
                form.errors.password && "Минимальная длина пароля — 6 символов"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="Я принимаю условия"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component={Link}
              href="/auth/restore"
              c="dimmed"
              size="sm"
              ta="start"
            >
              Забыли пароль?
            </Anchor>
            <Button type="submit">
              {type === "login" ? "Войти" : "Далее"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
