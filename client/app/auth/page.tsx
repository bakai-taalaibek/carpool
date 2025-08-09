"use client";
import {
  Anchor,
  Button,
  Center,
  Checkbox,
  CheckIcon,
  Divider,
  Group,
  Modal,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import router from "next/router";
import { setCredentials } from "../../lib/authSlice";
import GoogleIcon from "../../public/icons/GoogleIcon";
import { TermsContent } from "../termsContent";
import { useDispatch } from "react-redux";
import { useLoginUserMutation, useRegisterUserMutation } from "../../services/accountsApi";

export default function AuthenticationForm(props: PaperProps) {
  const dispatch = useDispatch();

  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const [authActionType, toggleAuthActionType] = useToggle([
    "login",
    "register",
  ]);
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

  const handleAuth = async (values: typeof form.values) => {
    if (authActionType === "login") {
      try {
        const response = await loginUser({
          identifier: values.email,
          password: values.password,
        }).unwrap();
        dispatch(
          setCredentials({
            token: response.token,
            user: response.user,
            expiresAt: response.expiresAt,
          })
        );

        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("expiresAt", response.expiresAt);

        router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      try {
        const response = await registerUser({
          email: values.email,
          password: values.password,
        }).unwrap();

        notifications.show({
          message: response.message,
          color: "teal",
          title: "Успешная регистрация",
          position: "top-right",
          icon: <CheckIcon size={20} />,
        });
        toggleAuthActionType();
        form.reset();
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <Center py="xl">
      <Paper
        radius="md"
        p="xl"
        withBorder
        w={400}
        className="border-transparent shadow-none min-[500px]:border-gray-200 min-[500px]:shadow-md"
      >
        <Text ta="center" fw={900} mb={5} size="xl">
          {authActionType === "register"
            ? "Зарегистрируйтесь с помощью..."
            : "Войдите с помощью..."}
        </Text>
        <Text c="dimmed" size="sm" ta="center" mb={20}>
          {authActionType === "register"
            ? "Уже есть аккаунт? "
            : "Еще нет аккаунта? "}
          <Anchor
            size="sm"
            component="button"
            onClick={() => toggleAuthActionType()}
          >
            {authActionType === "register" ? "Войдите" : "Зарегистрируйтесь"}
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

        <form onSubmit={form.onSubmit((values) => handleAuth(values))}>
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

            {authActionType === "register" && (
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
            {authActionType === "register" ? (
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
              {authActionType === "login" ? "Войти" : "Далее"}
            </Button>
          </Group>
        </form>
      </Paper>
      <Modal
        size="xl"
        opened={isModalOpened}
        onClose={closeModal}
        title={
          <Text fw="600" fz="18">
            Условия использования платформы POPUTKA.KG
          </Text>
        }
      >
        <TermsContent />
      </Modal>
    </Center>
  );
}
