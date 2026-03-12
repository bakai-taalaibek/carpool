"use client";
import { Button, Group, PasswordInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "../../../services/accountsApi";

export default function ResetPassword() {
  const params = useSearchParams();
  const token = params.get("token");
  const userEmail = params.get("userEmail");

  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },

    validate: {
      password: (val) => {
        if (val.length >= 6) return null;
        else return "Минимальная длина пароля - 6 символов";
      },
      passwordConfirmation: (val, values) => {
        if (val === values.password) return null;
        else return "Введенные пароли не совпадают";
      },
    },
  });

  const handleRequest = async () => {
    if (!userEmail || !token) return;
    const result = form.validate();
    if (result.hasErrors) return;

    try {
      await resetPassword({
        email: userEmail,
        password: form.values.password,
        token: token,
      }).unwrap();
      notifications.show({
        message: "",
        color: "teal",
        title: "Новый пароль сохранен",
        position: "top-right",
        icon: <IconCheck size={20} />,
      });

      router.push("/auth");
    } catch (error) {
      console.log(error);
      notifications.show({
        message: "",
        color: "red",
        title: "Что-то пошло не так",
        position: "top-right",
        icon: <IconExclamationCircle size={20} />,
      });
    }
  };

  if (!userEmail || !token)
    return (
      <>
        <Text ta="center" fw={500} mb={5} size="xl">
          Кажется что-то не так с ссылкой.
        </Text>
      </>
    );

  return (
    <>
      <Text ta="center" fw={900} mb={5} size="xl">
        Установите новый пароль.
      </Text>
      <Text c="dimmed" size="sm" ta="center" mb={20}>
        Введите новый пароль для {userEmail}
      </Text>
      <Stack>
        <PasswordInput
          required
          label="Новый пароль"
          placeholder="Ваш новый пароль"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          error={form.errors.password}
          radius="md"
        />

        <PasswordInput
          required
          label="Подтвердите пароль"
          placeholder="Введите пароль снова"
          value={form.values.passwordConfirmation}
          onChange={(event) =>
            form.setFieldValue(
              "passwordConfirmation",
              event.currentTarget.value,
            )
          }
          error={form.errors.passwordConfirmation}
          radius="md"
        />
        <Group justify="end" mt="lg">
          <Button onClick={handleRequest}>Сохранить пароль</Button>
        </Group>
      </Stack>
    </>
  );
}
