"use client";
import { Anchor, Button, Center, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft, IconExclamationCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "../../../services/accountsApi";

export default function ForgotPassword() {
  const router = useRouter();
  const [forgotPassword, { isSuccess }] = useForgotPasswordMutation();

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (val) => {
        const isEmailValid = /^\S+@\S+\.\S+$/.test(val);

        if (isEmailValid) return null;
        else return "Введите корректную почту";
      },
    },
  });

  const handleRequest = async () => {
    const result = form.validate();
    if (result.hasErrors) return;

    try {
      await forgotPassword({
        email: form.values.email,
      }).unwrap();
      router.push("/auth/check-email");
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

  return (
    <>
      <Text ta="center" fw={900} mb={5} size="xl">
        Забыли пароль?
      </Text>
      <Text c="dimmed" size="sm" ta="center" mb={20}>
        Получите ссылку на сброс пароля
      </Text>
      <TextInput
        value={form.values.email}
        onChange={(event) =>
          form.setFieldValue("email", event.currentTarget.value)
        }
        error={form.errors.email}
        label="Почта"
        placeholder="your.name@email.com"
        required
      />
      <Group justify="space-between" mt="lg">
        <Anchor component="button" onClick={router.back} c="dimmed" size="sm">
          <Center inline>
            <IconArrowLeft style={{ width: 12, height: 12 }} stroke={1.5} />
            <Anchor c="dimmed" size="sm" ml={5}>
              Назад{" "}
            </Anchor>
          </Center>
        </Anchor>
        <Button onClick={handleRequest}>Получить ссылку</Button>
      </Group>
    </>
  );
}
